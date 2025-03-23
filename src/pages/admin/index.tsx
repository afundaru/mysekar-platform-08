
import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminApp from "./AdminApp";
import AdminRoute from "@/components/auth/AdminRoute";

const Admin = () => {
  // Add console.log to help debug
  console.log("Admin component rendered");
  
  return (
    <AdminRoute>
      <AdminApp />
    </AdminRoute>
  );
};

export default Admin;
