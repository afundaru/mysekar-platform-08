
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
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") as string;
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: authHeader,
        },
      },
    });

    // Dapatkan user id dari token
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Error mendapatkan data user' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401 
        }
      );
    }

    const requestData = await req.json();
    const { email } = requestData;

    // Cari user dengan email yang diberikan
    const { data: userData, error: getUserError } = await supabaseClient
      .from('profiles')
      .select('id')
      .eq('id', user.id)
      .single();

    if (getUserError || !userData) {
      return new Response(
        JSON.stringify({ error: 'User tidak ditemukan' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 404 
        }
      );
    }

    // Periksa apakah sudah ada admin di sistem
    const { data: existingAdmins, error: adminsError } = await supabaseClient
      .from('user_roles')
      .select('id')
      .eq('role', 'admin');

    if (adminsError) {
      return new Response(
        JSON.stringify({ error: 'Error checking existing admins' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      );
    }

    // Jika ini bukan admin pertama, hanya admin yang bisa menambahkan admin baru
    if (existingAdmins && existingAdmins.length > 0) {
      // Verifikasi apakah user saat ini adalah admin
      const { data: isAdmin, error: adminCheckError } = await supabaseClient
        .from('user_roles')
        .select('id')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (adminCheckError || !isAdmin) {
        return new Response(
          JSON.stringify({ error: 'Hanya admin yang dapat menambahkan admin baru' }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 403 
          }
        );
      }
    }

    // Tambahkan user sebagai admin
    const { data: insertData, error: insertError } = await supabaseClient
      .from('user_roles')
      .insert([
        { user_id: user.id, role: 'admin' }
      ])
      .select();

    if (insertError) {
      if (insertError.code === '23505') { // Unique violation code
        return new Response(
          JSON.stringify({ message: 'User sudah memiliki role admin' }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200 
          }
        );
      }
      
      return new Response(
        JSON.stringify({ error: 'Gagal menambahkan admin', details: insertError }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        message: 'Berhasil menambahkan admin',
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
