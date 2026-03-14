import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";

//Aquí importan las páginas que se van a desplegar
// import {nombre del componente} from {ruta del componente}
// Clasifiquenlas según las siguientes secciones de rol

//Public
//Client
//Admin
//Company
//Employee

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ── Sitio público + cliente autenticado ── */}
        <Route element={<ClientLayout />}>
          <Route path="/"           element={<HomePage />} />
          <Route path="/offers/:id" element={<OfferDetailPage />} />
          <Route
            path="/client/coupons"
            element={
              <ProtectedRoute allowedRoles={["client"]}>
                <MyCouponsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/client/settings"
            element={
              <ProtectedRoute allowedRoles={["client"]}>
                <ClientSettings />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* ── Auth: solo accesibles sin sesión activa ── */}
        <Route
          path="/login"
          element={
            <ProtectedRoute guestOnly>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectedRoute guestOnly>
              <SignupPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRoute guestOnly>
              <ForgotPasswordPage />
            </ProtectedRoute>
          }
        />

        {/* ── Reset password: siempre pública ── */}
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* ── Admin ── */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard"          element={<DashboardPage />} />
          <Route path="companies"          element={<CompaniesPage />} />
          <Route path="companies/new"      element={<CompanyFormPage />} />
          <Route path="companies/:id"      element={<CompanyDetailPage />} />
          <Route path="companies/:id/edit" element={<CompanyFormPage />} />
          <Route path="categories"         element={<CategoriesPage />} />
          <Route path="clients"            element={<ClientsPage />} />
          <Route path="clients/:id"        element={<ClientDetailPage />} />
          <Route path="offers/review"      element={<OffersReviewPage />} />
          <Route path="settings"           element={<AdminSettings />} />
        </Route>

        {/* ── Company Admin ── */}
        <Route
          path="/company"
          element={
            <ProtectedRoute allowedRoles={["company_admin"]}>
              <CompanyLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="offers" replace />} />
          <Route path="offers"          element={<OffersPage />} />
          <Route path="offers/new"      element={<OfferFormPage />} />
          <Route path="offers/:id/edit" element={<OfferFormPage />} />
          <Route path="employees"       element={<EmployeesPage />} />
          <Route path="settings"        element={<CompanySettings />} />
        </Route>

        {/* ── Empleado ── */}
        <Route
          path="/employee"
          element={
            <ProtectedRoute allowedRoles={["company_employee"]}>
              <EmployeeLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="redeem" replace />} />
          <Route path="redeem"   element={<RedeemPage />} />
          <Route path="settings" element={<EmployeeSettings />} />
        </Route>

        {/* ── Fallback ── */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}