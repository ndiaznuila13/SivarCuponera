import { supabase } from './supabase'

// =====================================================
// FUNCIONES DE CÁLCULO (solo para mostrar en UI)
// =====================================================

export const calcularDescuento = (precioRegular, precioOferta) => {
  if (!precioRegular || !precioOferta) return 0
  return Math.round(((precioRegular - precioOferta) / precioRegular) * 100)
}

export const calcularDiasRestantes = (fechaFin) => {
  const hoy = new Date()
  const fin = new Date(fechaFin)
  const diferencia = fin - hoy
  return Math.ceil(diferencia / (1000 * 60 * 60 * 24))
}

export const formatearFecha = (fecha) => {
  return new Date(fecha).toLocaleDateString('es-SV', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// =====================================================
// CONSULTAS A SUPABASE (nombres correctos de tablas)
// =====================================================

// Obtener categorías
export const obtenerRubros = async () => {
  try {
    const { data, error } = await supabase
      .from('Categorias')
      .select('*')
      .order('nombre')

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error('Error al obtener categorías:', error)
    return { success: false, error: error.message }
  }
}

// Obtener cupones activos con filtro opcional por categoría
export const obtenerOfertasActivas = async (categoriaId = null) => {
  try {
    const hoy = new Date().toISOString()

    let query = supabase
      .from('Cupones')
      .select(`
        *,
        Categorias:id_categoria (
          id_categoria,
          nombre
        )
      `)
      .lte('fecha_inicio', hoy)
      .gte('fecha_fin', hoy)
      .gt('cantidad_cupon', 0)

    // Filtrar por categoría si se especifica
    if (categoriaId) {
      query = query.eq('id_categoria', categoriaId)
    }

    const { data, error } = await query.order('fecha_inicio', { ascending: false })

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error('Error al obtener cupones:', error)
    return { success: false, error: error.message }
  }
}

// Obtener un cupón específico
export const obtenerOferta = async (cuponId) => {
  try {
    const { data, error } = await supabase
      .from('Cupones')
      .select(`
        *,
        Categorias:id_categoria (
          id_categoria,
          nombre
        )
      `)
      .eq('id_cupones', cuponId)
      .single()

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error('Error al obtener cupón:', error)
    return { success: false, error: error.message }
  }
}

// Comprar cupón (la BD maneja stock con triggers)
export const comprarCupon = async (cuponId) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { success: false, error: 'Debes iniciar sesión para comprar cupones' }
    }

    // Verificar stock
    const { data: cupon, error: errorCupon } = await supabase
      .from('Cupones')
      .select('precio_oferta, cantidad_cupon')
      .eq('id_cupones', cuponId)
      .single()

    if (errorCupon) throw errorCupon

    if (cupon.cantidad_cupon <= 0) {
      return { success: false, error: 'Cupón agotado' }
    }

    // Crear compra (trigger reduce stock automáticamente)
    const { data: compra, error: errorCompra } = await supabase
      .from('CuponesComprados')
      .insert([
        {
          id_cupon: cuponId,
          id_usuario: user.id,
          estado: 'disponible',
        },
      ])
      .select()
      .single()

    if (errorCompra) throw errorCompra

    return { success: true, data: compra }
  } catch (error) {
    console.error('Error al comprar cupón:', error)
    return { success: false, error: error.message }
  }
}

// Obtener cupones comprados del usuario
export const obtenerMisCupones = async (filtro = 'todos') => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { success: false, error: 'No hay sesión activa' }
    }

    let query = supabase
      .from('CuponesComprados')
      .select(`
        *,
        Cupones:id_cupon (
          id_cupones,
          titulo,
          descripcion,
          precio_regular,
          precio_oferta,
          fecha_fin,
          fecha_vencimiento_canje,
          Tienda
        )
      `)
      .eq('id_usuario', user.id)
      .order('fecha_compra', { ascending: false })

    if (filtro !== 'todos') {
      query = query.eq('estado', filtro)
    }

    const { data, error } = await query

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error('Error al obtener cupones:', error)
    return { success: false, error: error.message }
  }
}

// Buscar cupones por texto
export const buscarOfertas = async (busqueda) => {
  try {
    const hoy = new Date().toISOString()

    const { data, error } = await supabase
      .from('Cupones')
      .select(`
        *,
        Categorias:id_categoria (
          id_categoria,
          nombre
        )
      `)
      .lte('fecha_inicio', hoy)
      .gte('fecha_fin', hoy)
      .gt('cantidad_cupon', 0)
      .or(`titulo.ilike.%${busqueda}%,descripcion.ilike.%${busqueda}%,Tienda.ilike.%${busqueda}%`)

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error('Error al buscar cupones:', error)
    return { success: false, error: error.message }
  }
}