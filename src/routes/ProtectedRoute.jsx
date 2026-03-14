import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const redirectMap = {
  admin:            "/admin/dashboard",
  company_admin:    "/company/offers",
  company_employee: "/employee/redeem",
  client:           "/",
};

export default function ProtectedRoute({ children, allowedRoles, guestOnly = false }) {
  const { session, role, loading } = useAuth();

  if (loading) return null;

  if (guestOnly) {
    if (session) return <Navigate to={redirectMap[role] ?? "/"} replace />;
    return children;
  }

  //Este codigo para la redireccion al login debe volver a ser declarado nuevamente en las funciones donde se necesita redirigir al login nuevamente

  if (!session) return <Navigate to="/login" replace />;
  if (!role) return null; // perfil todavía cargando o falló
  if (!allowedRoles.includes(role)) return <Navigate to="/" replace />;

  return children;
}