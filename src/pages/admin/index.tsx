
import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminApp from "./AdminApp";
import AdminRoute from "@/components/auth/AdminRoute";

const Admin = () => {
  return (
    <AdminRoute>
      <Routes>
        <Route path="/*" element={<AdminApp />} />
      </Routes>
    </AdminRoute>
  );
};

export default Admin;
