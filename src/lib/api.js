import { supabase } from './supabase'

export const obtenerOfertasActivas = async (idCategoria = null, busqueda = null) => {
  try {
    let query = supabase
      .from('Cupones')
      .select('*')
      .gt('cantidad_cupon', 0)
      .lte('fecha_inicio', new Date().toISOString())
      .gte('fecha_fin', new Date().toISOString())

    if (idCategoria) {
      query = query.eq('id_categoria', idCategoria)
    }

    if (busqueda) {
      query = query.or(`titulo.ilike.%${busqueda}%,Tienda.ilike.%${busqueda}%`)
    }

    const { data, error } = await query

    if (error) throw error

    return { success: true, data: data || [] }
  } catch (error) {
    console.error('Error al cargar ofertas:', error)
    return { success: false, error: error.message, data: [] }
  }
}

export const obtenerRubros = async () => {
  try {
    const { data, error } = await supabase
      .from('Categorias')
      .select('*')
      .order('nombre', { ascending: true })

    if (error) throw error

    return { success: true, data: data || [] }
  } catch (error) {
    console.error('Error al cargar categorías:', error)
    return { success: false, error: error.message, data: [] }
  }
}

export const obtenerCategorias = obtenerRubros

export const obtenerCuponesPorUsuario = async (userId) => {
  const { data, error } = await supabase
    .from('CuponesComprados')
    .select(`
      *,
      Cupones (
        titulo,
        Tienda,
        descripcion,
        imagen,
        fecha_fin
      )
    `)
    .eq('id', userId)

  if (error) {
    console.error('Error al cargar cupones del usuario:', error)
    return []
  }

  return data || []
}

export const calcularDescuento = (precioRegular, precioOferta) => {
  if (!precioRegular || precioRegular <= 0) return 0
  return Math.round(((precioRegular - precioOferta) / precioRegular) * 100)
}

export const calcularDiasRestantes = (fechaFin) => {
  const hoy = new Date()
  const fin = new Date(fechaFin)
  const diferencia = fin - hoy
  return Math.ceil(diferencia / (1000 * 60 * 60 * 24))
}