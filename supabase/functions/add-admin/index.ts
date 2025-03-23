
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  try {
    // Create a Supabase client with the Auth context of the logged in user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401 
        }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") as string;
    
    // Important: We're using the service role key to bypass RLS
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      global: {
        headers: {
          Authorization: authHeader,
        },
      },
    });

    // Get user from token
    const {
      data: { user },
      error: userError,
    } = await supabaseAdmin.auth.getUser();

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Error getting user data' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401 
        }
      );
    }

    // Check if there are any existing admins
    const { data: existingAdmins, error: adminsError } = await supabaseAdmin
      .from('user_roles')
      .select('id')
      .eq('role', 'admin');

    if (adminsError) {
      return new Response(
        JSON.stringify({ error: 'Error checking existing admins', details: adminsError }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      );
    }

    // If this isn't the first admin, only existing admins can add new admins
    if (existingAdmins && existingAdmins.length > 0) {
      // Verify if current user is admin
      const { data: isAdmin, error: adminCheckError } = await supabaseAdmin
        .from('user_roles')
        .select('id')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (adminCheckError || !isAdmin) {
        return new Response(
          JSON.stringify({ error: 'Only admins can add new admins' }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 403 
          }
        );
      }
    }

    // Add the user as admin - using service_role to bypass RLS
    const { data: insertData, error: insertError } = await supabaseAdmin
      .from('user_roles')
      .insert([
        { user_id: user.id, role: 'admin' }
      ])
      .select();

    if (insertError) {
      if (insertError.code === '23505') { // Unique violation code
        return new Response(
          JSON.stringify({ message: 'User already has admin role' }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200 
          }
        );
      }
      
      return new Response(
        JSON.stringify({ error: 'Failed to add admin', details: insertError }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        message: 'Successfully added admin',
        data: insertData
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Server error', details: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
