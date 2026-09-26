import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/auth-context";

export default function ProtectedRoute() {
  const { user, loadingAuth } = useAuth();

  if (loadingAuth) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}