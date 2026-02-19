import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

/**
 * Componente de ejemplo: Formulario de Login
 * Puedes copiar y adaptar este código para tus propios componentes
 */
export default function LoginForm() {
  const { iniciarSesion, registrar } = useAuth()
  const [esRegistro, setEsRegistro] = useState(false)
  const [loading, setLoading] = useState(false)
  const [mensaje, setMensaje] = useState('')

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nombres: '',
    apellidos: '',
    telefono: '',
    direccion: '',
    dui: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMensaje('')

    let resultado

    if (esRegistro) {
      // Validaciones básicas para registro
      if (!formData.nombres || !formData.apellidos || !formData.dui) {
        setMensaje('Por favor completa todos los campos obligatorios')
        setLoading(false)
        return
      }

      resultado = await registrar(formData)
    } else {
      resultado = await iniciarSesion(formData.email, formData.password)
    }

    setLoading(false)

    if (resultado.success) {
      setMensaje(resultado.message || '¡Bienvenido!')
      // Aquí podrías redirigir al usuario
    } else {
      setMensaje(resultado.message || 'Error al procesar la solicitud')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-[#002147] mb-6">
        {esRegistro ? 'Crear Cuenta' : 'Iniciar Sesión'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#007BA7] focus:border-transparent"
            placeholder="tu@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Contraseña *
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#007BA7] focus:border-transparent"
            placeholder="••••••••"
          />
        </div>

        {esRegistro && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Nombres *
                </label>
                <input
                  type="text"
                  name="nombres"
                  value={formData.nombres}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#007BA7] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Apellidos *
                </label>
                <input
                  type="text"
                  name="apellidos"
                  value={formData.apellidos}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#007BA7] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                DUI * (9 dígitos)
              </label>
              <input
                type="text"
                name="dui"
                value={formData.dui}
                onChange={handleChange}
                required
                pattern="[0-9]{9}"
                maxLength={9}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#007BA7] focus:border-transparent"
                placeholder="012345678"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#007BA7] focus:border-transparent"
                placeholder="2222-3333"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Dirección
              </label>
              <textarea
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#007BA7] focus:border-transparent"
              />
            </div>
          </>
        )}

        {mensaje && (
          <div
            className={`p-3 rounded-lg text-sm ${
              mensaje.includes('Error') || mensaje.includes('completa')
                ? 'bg-red-100 text-red-700'
                : 'bg-green-100 text-green-700'
            }`}
          >
            {mensaje}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#002147] text-white font-bold rounded-lg hover:bg-[#003366] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading
            ? 'Procesando...'
            : esRegistro
            ? 'Crear Cuenta'
            : 'Iniciar Sesión'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={() => {
            setEsRegistro(!esRegistro)
            setMensaje('')
          }}
          className="text-sm text-[#007BA7] hover:underline"
        >
          {esRegistro
            ? '¿Ya tienes cuenta? Inicia sesión'
            : '¿No tienes cuenta? Regístrate'}
        </button>
      </div>
    </div>
  )
}

/**
 * EJEMPLO DE USO DEL HOOK useAuth EN CUALQUIER COMPONENTE:
 * 
 * import { useAuth } from '../context/AuthContext'
 * 
 * function MiComponente() {
 *   const { user, cliente, loading, cerrarSesion } = useAuth()
 * 
 *   if (loading) return <div>Cargando...</div>
 * 
 *   if (!user) return <div>Por favor inicia sesión</div>
 * 
 *   return (
 *     <div>
 *       <h1>Hola, {cliente?.nombres}</h1>
 *       <button onClick={cerrarSesion}>Cerrar Sesión</button>
 *     </div>
 *   )
 * }
 */

/**
 * EJEMPLO DE COMPRA DE CUPÓN:
 * 
 * import { comprarCupon } from '../lib/api'
 * 
 * async function handleComprar(ofertaId) {
 *   const resultado = await comprarCupon(ofertaId, 'tarjeta_credito')
 *   
 *   if (resultado.success) {
 *     alert(`Cupón comprado: ${resultado.data.codigo}`)
 *   } else {
 *     alert(`Error: ${resultado.error}`)
 *   }
 * }
 */

/**
 * EJEMPLO DE OBTENER OFERTAS:
 * 
 * import { obtenerOfertasActivas } from '../lib/api'
 * import { useEffect, useState } from 'react'
 * 
 * function ListaOfertas() {
 *   const [ofertas, setOfertas] = useState([])
 * 
 *   useEffect(() => {
 *     async function cargarOfertas() {
 *       const resultado = await obtenerOfertasActivas()
 *       if (resultado.success) {
 *         setOfertas(resultado.data)
 *       }
 *     }
 *     cargarOfertas()
 *   }, [])
 * 
 *   return (
 *     <div>
 *       {ofertas.map(oferta => (
 *         <div key={oferta.id}>{oferta.titulo}</div>
 *       ))}
 *     </div>
 *   )
 * }
 */
