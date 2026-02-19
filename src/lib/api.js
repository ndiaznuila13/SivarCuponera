import { supabase } from './supabase'

/**
 * Obtener todas las ofertas aprobadas y vigentes
 * @param {string} rubroId - Opcional: filtrar por rubro específico
 * @returns {Promise<Array>} Lista de ofertas
 */
export const obtenerOfertasActivas = async (rubroId = null) => {
  try {
    let query = supabase
      .from('ofertas')
      .select(`
        *,
        empresas (
          id,
          nombre,
          codigo,
          rubros (
            id,
            nombre,
            icono
          )
        )
      `)
      .eq('estado', 'aprobada')
      .lte('fecha_inicio', new Date().toISOString())
      .gte('fecha_fin', new Date().toISOString())

    if (rubroId) {
      query = query.eq('empresas.rubro_id', rubroId)
    }

    const { data, error } = await query

    if (error) throw error

    // Filtrar ofertas que no hayan alcanzado el límite
    const ofertasDisponibles = data.filter((oferta) => {
      return !oferta.cantidad_limite || oferta.cantidad_vendida < oferta.cantidad_limite
    })

    return { success: true, data: ofertasDisponibles }
  } catch (error) {
    console.error('Error al obtener ofertas:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Obtener todos los rubros activos
 * @returns {Promise<Array>} Lista de rubros
 */
export const obtenerRubros = async () => {
  try {
    const { data, error } = await supabase
      .from('rubros')
      .select('*')
      .eq('activo', true)
      .order('nombre')

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error('Error al obtener rubros:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Obtener detalles de una oferta específica
 * @param {string} ofertaId - UUID de la oferta
 * @returns {Promise<Object>} Detalles de la oferta
 */
export const obtenerOferta = async (ofertaId) => {
  try {
    const { data, error } = await supabase
      .from('ofertas')
      .select(`
        *,
        empresas (
          id,
          nombre,
          codigo,
          direccion,
          telefono,
          rubros (
            id,
            nombre,
            icono
          )
        )
      `)
      .eq('id', ofertaId)
      .single()

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error('Error al obtener oferta:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Comprar un cupón
 * @param {string} ofertaId - UUID de la oferta
 * @param {string} metodoPago - Método de pago utilizado
 * @returns {Promise<Object>} Datos del cupón creado
 */
export const comprarCupon = async (ofertaId, metodoPago = 'tarjeta_credito') => {
  try {
    // 1. Verificar disponibilidad
    const { data: disponible, error: errorVerif } = await supabase.rpc(
      'verificar_disponibilidad_oferta',
      { oferta_uuid: ofertaId }
    )

    if (errorVerif) throw errorVerif
    if (!disponible) {
      return { success: false, error: 'Esta oferta ya no está disponible' }
    }

    // 2. Obtener datos de la oferta y empresa
    const { data: oferta, error: errorOferta } = await supabase
      .from('ofertas')
      .select('precio_oferta, empresas(codigo)')
      .eq('id', ofertaId)
      .single()

    if (errorOferta) throw errorOferta

    // 3. Generar código del cupón
    const { data: codigoCupon, error: errorCodigo } = await supabase.rpc(
      'generar_codigo_cupon',
      { codigo_empresa: oferta.empresas.codigo }
    )

    if (errorCodigo) throw errorCodigo

    // 4. Obtener usuario autenticado
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { success: false, error: 'Debes iniciar sesión para comprar cupones' }
    }

    // 5. Crear el cupón
    const { data: cupon, error: errorCupon } = await supabase
      .from('cupones')
      .insert([
        {
          codigo: codigoCupon,
          oferta_id: ofertaId,
          cliente_id: user.id,
          metodo_pago: metodoPago,
          monto_pagado: oferta.precio_oferta,
          estado: 'disponible',
        },
      ])
      .select()
      .single()

    if (errorCupon) throw errorCupon

    // TODO: Enviar email de confirmación

    return { success: true, data: cupon }
  } catch (error) {
    console.error('Error al comprar cupón:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Obtener cupones del cliente autenticado
 * @param {string} filtro - 'todos', 'disponible', 'canjeado', 'vencido'
 * @returns {Promise<Array>} Lista de cupones
 */
export const obtenerMisCupones = async (filtro = 'todos') => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { success: false, error: 'No hay sesión activa' }
    }

    let query = supabase
      .from('cupones')
      .select(`
        *,
        ofertas (
          id,
          titulo,
          descripcion,
          precio_regular,
          precio_oferta,
          fecha_limite_canje,
          empresas (
            nombre,
            direccion,
            telefono
          )
        )
      `)
      .eq('cliente_id', user.id)
      .order('created_at', { ascending: false })

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

/**
 * Obtener estadísticas de una oferta
 * @param {string} ofertaId - UUID de la oferta
 * @returns {Promise<Object>} Estadísticas de la oferta
 */
export const obtenerEstadisticasOferta = async (ofertaId) => {
  try {
    const { data, error } = await supabase
      .from('ofertas')
      .select(`
        cantidad_vendida,
        cantidad_limite,
        precio_oferta,
        empresas (
          porcentaje_comision
        )
      `)
      .eq('id', ofertaId)
      .single()

    if (error) throw error

    const disponibles = data.cantidad_limite
      ? data.cantidad_limite - data.cantidad_vendida
      : null

    const ingresosTotales = data.cantidad_vendida * data.precio_oferta
    const comision = ingresosTotales * (data.empresas.porcentaje_comision / 100)

    return {
      success: true,
      data: {
        vendidos: data.cantidad_vendida,
        disponibles,
        ingresosTotales,
        comision,
      },
    }
  } catch (error) {
    console.error('Error al obtener estadísticas:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Buscar ofertas por texto
 * @param {string} busqueda - Texto a buscar en título o descripción
 * @returns {Promise<Array>} Lista de ofertas encontradas
 */
export const buscarOfertas = async (busqueda) => {
  try {
    const { data, error } = await supabase
      .from('ofertas')
      .select(`
        *,
        empresas (
          nombre,
          rubros (
            nombre,
            icono
          )
        )
      `)
      .eq('estado', 'aprobada')
      .or(`titulo.ilike.%${busqueda}%,descripcion.ilike.%${busqueda}%,empresas.nombre.ilike.%${busqueda}%`)
      .lte('fecha_inicio', new Date().toISOString())
      .gte('fecha_fin', new Date().toISOString())

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error('Error al buscar ofertas:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Calcular descuento de una oferta
 * @param {number} precioRegular - Precio regular
 * @param {number} precioOferta - Precio de oferta
 * @returns {number} Porcentaje de descuento
 */
export const calcularDescuento = (precioRegular, precioOferta) => {
  return Math.round(((precioRegular - precioOferta) / precioRegular) * 100)
}

/**
 * Formatear fecha para mostrar
 * @param {string} fecha - Fecha en formato ISO
 * @returns {string} Fecha formateada
 */
export const formatearFecha = (fecha) => {
  return new Date(fecha).toLocaleDateString('es-SV', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Verificar si un cupón está vencido
 * @param {string} fechaLimite - Fecha límite en formato ISO
 * @returns {boolean} True si está vencido
 */
export const estaVencido = (fechaLimite) => {
  return new Date(fechaLimite) < new Date()
}
