import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardAdmin from "./pages/Dashboard";
import { PrivateRoute } from "./components/private-router/Private-Router";
import { useUserStore } from "../stores/user";

import {
  getTotalEmails,
  getTotalMessages,
  getTotalReceptors,
  getTotalWarningLogs,
  getTotalWarnings,
} from "./repository";

export default function App() {
  const queryClient = useQueryClient();

  useEffect(() => {
    useUserStore.getState().loadUser();
  }, []);

  useEffect(() => {
    queryClient.ensureQueryData({
      queryKey: ["receptors_registered"],
      queryFn: getTotalReceptors,
    });

    queryClient.ensureQueryData({
      queryKey: ["total_warnings"],
      queryFn: getTotalWarnings,
    });

    queryClient.ensureQueryData({
      queryKey: ["total_warnings_email"],
      queryFn: getTotalEmails,
    });

    queryClient.ensureQueryData({
      queryKey: ["total_warnings_messages"],
      queryFn: getTotalMessages,
    });

    queryClient.ensureQueryData({
      queryKey: ["total_warnings_logs"],
      queryFn: getTotalWarningLogs,
    });
  }, [queryClient]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard-admin"
        element={
          <PrivateRoute>
            <DashboardAdmin />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
