import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

export default function Header() {
  const [user, setUser] = useState(null)
  const [menuAbierto, setMenuAbierto] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleCerrarSesion = async () => {
    await supabase.auth.signOut()
    setMenuAbierto(false)
  }

  return (
    <header className="bg-oxford-navy text-white shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold">
              Sivar<span className="text-cyan-400">Cuponera</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-primary transition-colors font-medium">
              Ofertas
            </Link>

            {user ? (
              <>
                <Link to="/mis-cupones-comprados" className="hover:text-primary transition-colors font-medium">
                  Mis Cupones
                </Link>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-slate-300">
                    {user.email}
                  </span>
                  <button
                    onClick={handleCerrarSesion}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-lg font-medium transition-colors"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-primary hover:bg-[#005f87] rounded-lg font-medium transition-colors"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>

          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="md:hidden p-2 hover:bg-[#003366] rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuAbierto ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {menuAbierto && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-slate-700 pt-4">
            <Link to="/" className="block py-2 hover:text-primary transition-colors" onClick={() => setMenuAbierto(false)}>
              Ofertas
            </Link>

            {user ? (
              <>
                <Link to="/mis-cupones-comprados" className="block py-2 hover:text-primary transition-colors" onClick={() => setMenuAbierto(false)}>
                  Mis Cupones
                </Link>
                <div className="pt-2 border-t border-slate-700">
                  <p className="text-sm text-slate-300 mb-2">{user.email}</p>
                  <button
                    onClick={handleCerrarSesion}
                    className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-2 pt-2">
                <Link
                  to="/login"
                  className="block w-full text-center px-4 py-2 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-lg font-medium transition-colors"
                  onClick={() => setMenuAbierto(false)}
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/signup"
                  className="block w-full text-center px-4 py-2 bg-primary hover:bg-[#005f87] rounded-lg font-medium transition-colors"
                  onClick={() => setMenuAbierto(false)}
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  )
}