import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function Header() {
  const { user, cliente, cerrarSesion } = useAuth()
  const [menuAbierto, setMenuAbierto] = useState(false)

  const handleCerrarSesion = async () => {
    await cerrarSesion()
    setMenuAbierto(false)
  }

  return (
    <header className="bg-oxford-navy text-white shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Solo texto */}
          <div className="flex items-center">
            <span className="text-2xl font-bold">
              Sivar<span className="text-primary">Cuponera</span>
            </span>
          </div>

          {/* Navegación Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <a 
              href="#ofertas" 
              className="hover:text-primary transition-colors font-medium"
            >
              Ofertas
            </a>
            <a 
              href="#categorias" 
              className="hover:text-primary transition-colors font-medium"
            >
              Categorías
            </a>

            {user ? (
              <div className="flex items-center space-x-4">
                <a 
                  href="#mis-cupones" 
                  className="hover:text-primary transition-colors font-medium"
                >
                  Mis Cupones
                </a>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-slate-300">
                    {cliente?.nombres || 'Usuario'}
                  </span>
                  <button
                    onClick={handleCerrarSesion}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <a
                  href="#login"
                  className="px-4 py-2 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-lg font-medium transition-colors"
                >
                  Iniciar Sesión
                </a>
                <a
                  href="#registro"
                  className="px-4 py-2 bg-primary hover:bg-[#005f87] rounded-lg font-medium transition-colors"
                >
                  Registrarse
                </a>
              </div>
            )}
          </div>

          {/* Botón menú móvil */}
          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="md:hidden p-2 hover:bg-[#003366] rounded-lg transition-colors"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {menuAbierto ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              )}
            </svg>
          </button>
        </div>

        {/* Menú móvil */}
        {menuAbierto && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-slate-700 pt-4">
            <a 
              href="#ofertas" 
              className="block py-2 hover:text-primary transition-colors"
              onClick={() => setMenuAbierto(false)}
            >
              Ofertas
            </a>
            <a 
              href="#categorias" 
              className="block py-2 hover:text-primary transition-colors"
              onClick={() => setMenuAbierto(false)}
            >
              Categorías
            </a>

            {user ? (
              <>
                <a 
                  href="#mis-cupones" 
                  className="block py-2 hover:text-primary transition-colors"
                  onClick={() => setMenuAbierto(false)}
                >
                  Mis Cupones
                </a>
                <div className="pt-2 border-t border-slate-700">
                  <p className="text-sm text-slate-300 mb-2">
                    {cliente?.nombres || 'Usuario'}
                  </p>
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
                <a
                  href="#login"
                  className="block w-full text-center px-4 py-2 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-lg font-medium transition-colors"
                  onClick={() => setMenuAbierto(false)}
                >
                  Iniciar Sesión
                </a>
                <a
                  href="#registro"
                  className="block w-full text-center px-4 py-2 bg-primary hover:bg-[#005f87] rounded-lg font-medium transition-colors"
                  onClick={() => setMenuAbierto(false)}
                >
                  Registrarse
                </a>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  )
}