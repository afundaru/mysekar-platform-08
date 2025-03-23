
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminApp from "./AdminApp";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const Admin = () => {
  return (
    <ProtectedRoute>
      <Routes>
        <Route path="/*" element={<AdminApp />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </ProtectedRoute>
  );
};

export default Admin;
