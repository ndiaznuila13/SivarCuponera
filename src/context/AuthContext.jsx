import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [cliente, setCliente] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Obtener sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        cargarDatosCliente(session.user.id)
      } else {
        setLoading(false)
      }
    })

    // Escuchar cambios de autenticación
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        cargarDatosCliente(session.user.id)
      } else {
        setCliente(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const cargarDatosCliente = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('clientes')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error
      setCliente(data)
    } catch (error) {
      console.error('Error al cargar datos del cliente:', error.message)
      setCliente(null)
    } finally {
      setLoading(false)
    }
  }

  // Registrar nuevo cliente
  const registrar = async ({ email, password, nombres, apellidos, telefono, direccion, dui }) => {
    try {
      // 1. Crear usuario en auth.users
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nombres,
            apellidos,
          },
        },
      })

      if (authError) throw authError

      // 2. Crear registro en tabla clientes
      const { error: clienteError } = await supabase.from('clientes').insert([
        {
          id: authData.user.id,
          email,
          nombres,
          apellidos,
          telefono,
          direccion,
          dui,
        },
      ])

      if (clienteError) throw clienteError

      return { success: true, message: 'Registro exitoso. Revisa tu correo para verificar tu cuenta.' }
    } catch (error) {
      console.error('Error en registro:', error)
      return { success: false, message: error.message }
    }
  }

  // Iniciar sesión
  const iniciarSesion = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      return { success: true, user: data.user }
    } catch (error) {
      console.error('Error al iniciar sesión:', error)
      return { success: false, message: error.message }
    }
  }

  // Cerrar sesión
  const cerrarSesion = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      return { success: true }
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
      return { success: false, message: error.message }
    }
  }

  // Recuperar contraseña
  const recuperarPassword = async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) throw error

      return { success: true, message: 'Se ha enviado un correo para restablecer tu contraseña.' }
    } catch (error) {
      console.error('Error al recuperar contraseña:', error)
      return { success: false, message: error.message }
    }
  }

  // Actualizar contraseña
  const actualizarPassword = async (newPassword) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      })

      if (error) throw error

      return { success: true, message: 'Contraseña actualizada correctamente.' }
    } catch (error) {
      console.error('Error al actualizar contraseña:', error)
      return { success: false, message: error.message }
    }
  }

  // Actualizar datos del cliente
  const actualizarCliente = async (datos) => {
    try {
      const { error } = await supabase
        .from('clientes')
        .update(datos)
        .eq('id', user.id)

      if (error) throw error

      // Recargar datos
      await cargarDatosCliente(user.id)

      return { success: true, message: 'Datos actualizados correctamente.' }
    } catch (error) {
      console.error('Error al actualizar datos:', error)
      return { success: false, message: error.message }
    }
  }

  const value = {
    user,
    cliente,
    loading,
    registrar,
    iniciarSesion,
    cerrarSesion,
    recuperarPassword,
    actualizarPassword,
    actualizarCliente,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
