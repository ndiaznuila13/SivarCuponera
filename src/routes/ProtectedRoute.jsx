import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const roleRedirect = {
  admin:            "/admin/dashboard",
  company_admin:    "/company/dashboard",
  company_employee: "/empleado/canje",
  client:           "/",
};

/**
 * Props:
 *  - allowedRoles: string[]  → ruta privada por rol
 *  - guestOnly: bool         → solo accesible sin sesión (login, signup)
 *  - requireAuth: bool       → requiere sesión, redirige a /signup si no hay
 */
export default function ProtectedRoute({
  children,
  allowedRoles,
  guestOnly = false,
  requireAuth = false,
}) {
  const { session, role, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  // Rutas solo para invitados (login, signup, forgot-password)
  if (guestOnly) {
    if (session && role) return <Navigate to={roleRedirect[role] ?? "/"} replace />;
    return children;
  }

  // Rutas que requieren sesión pero sin restricción de rol específico
  // Ej: pago-cupon → si no hay sesión, va a /signup
  if (requireAuth) {
    if (!session) return <Navigate to="/login" state={{ from: location }} replace />;
    return children;
  }

  // Rutas protegidas por rol
  if (allowedRoles) {
    if (!session) return <Navigate to="/signup" state={{ from: location }} replace />;
    if (!role) return null;
    if (!allowedRoles.includes(role)) return <Navigate to="/" replace />;
    return children;
  }

  return children;
}