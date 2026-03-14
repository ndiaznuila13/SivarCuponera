import { useState } from "react";
import { Link } from "react-router-dom";
import { resetPasswordForEmail } from "../../services/authService";

export default function ForgotPasswordPage() {
  const [email, setEmail]     = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError]     = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await resetPasswordForEmail(email);
      setSuccess(true);
    } catch (err) {
      setError("Ocurrió un error al enviar el correo. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background-light)] px-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden md:grid md:grid-cols-2">

        <div className="hidden md:flex flex-col justify-center items-center bg-[var(--color-oxford-navy)] text-white p-12">
          <h2 className="text-4xl font-bold mb-4 text-center">
            ¿Olvidaste tu contraseña?
          </h2>
          <p className="text-lg text-gray-200 text-center">
            Te enviaremos un enlace para que puedas restablecerla.
          </p>
        </div>

        <div className="w-full p-8 md:p-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[var(--color-oxford-navy)]">
              Recuperar contraseña
            </h1>
            <p className="text-gray-500 mt-2">
              Ingresa tu correo y te enviaremos un enlace de recuperación
            </p>
          </div>

          {success ? (
            <div className="space-y-5">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-700 text-sm">
                  Revisa tu correo. Si existe una cuenta asociada, recibirás un enlace para restablecer tu contraseña.
                </p>
              </div>
              <p className="text-sm text-center text-gray-500">
                <Link to="/login" className="text-[var(--color-primary)] font-medium hover:underline">
                  Volver al inicio de sesión
                </Link>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  required
                  placeholder="correo@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--color-primary)] hover:opacity-90 text-white font-semibold py-3 rounded-lg transition duration-200 hover:cursor-pointer disabled:opacity-50"
              >
                {loading ? "Enviando..." : "Enviar enlace de recuperación"}
              </button>

              <p className="text-sm text-center text-gray-500">
                <Link to="/login" className="text-[var(--color-primary)] font-medium hover:underline">
                  Volver al inicio de sesión
                </Link>
              </p>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}