
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminApp from "./AdminApp";
import AdminRoute from "@/components/auth/AdminRoute";

const Admin = () => {
  return (
    <AdminRoute>
      <Routes>
        <Route path="/*" element={<AdminApp />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminRoute>
  );
};

export default Admin;
