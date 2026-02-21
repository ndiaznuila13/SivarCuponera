import { calcularDescuento, calcularDiasRestantes } from '../../lib/api'

export default function OfertaCard({ oferta }) {
  const descuento = calcularDescuento(oferta.precio_regular, oferta.precio_oferta)
  const diasRestantes = calcularDiasRestantes(oferta.fecha_fin)
  const stockBajo = oferta.cantidad_cupon <= 5

  const getEtiquetaColor = () => {
    if (descuento >= 50) return 'bg-red-100 text-red-700'
    if (descuento >= 30) return 'bg-orange-100 text-orange-700'
    if (descuento >= 20) return 'bg-yellow-100 text-yellow-700'
    return 'bg-green-100 text-green-700'
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row items-start gap-4">
        
        <div className="w-full sm:w-32 sm:h-32 h-48 bg-slate-100 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
          {oferta.imagen ? (
            <img
              src={oferta.imagen}
              alt={oferta.titulo}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-slate-400 text-4xl font-bold">
              {oferta.Tienda?.charAt(0) || '?'}
            </span>
          )}
        </div>
        
        <div className="flex-1 w-full">
          {descuento > 0 && (
            <span className={`text-xs font-bold px-2 py-1 rounded ${getEtiquetaColor()}`}>
              Ahorra {descuento}%
            </span>
          )}
          
          <h3 className="text-lg sm:text-xl font-bold text-primary mt-2">
            {oferta.titulo}
          </h3>
          
          <p className="font-bold text-oxford-navy text-base sm:text-lg">
            {oferta.Tienda || 'Tienda'}
          </p>
          
          <p className="text-sm sm:text-base text-slate-500 mt-1">
            {oferta.descripcion}
          </p>

          <div className="flex items-center gap-3 mt-2">
            <span className="text-slate-400 line-through text-sm">
              ${oferta.precio_regular?.toFixed(2)}
            </span>
            <span className="text-primary font-bold text-lg">
              ${oferta.precio_oferta?.toFixed(2)}
            </span>
          </div>

          {stockBajo && (
            <p className="text-red-600 text-xs font-medium mt-2">
              ¡Solo quedan {oferta.cantidad_cupon} cupones!
            </p>
          )}

          {oferta.etiqueta && (
            <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
              {oferta.etiqueta}
            </span>
          )}
        </div>
      </div>

      <button className="w-full mt-4 py-3 sm:py-3.5 bg-oxford-navy text-white font-bold rounded-lg hover:bg-[#003366] transition-colors text-sm sm:text-base">
        Comprar Cupón
      </button>

      <p className="text-xs sm:text-sm text-slate-400 text-center mt-2">
        Válido hasta el {new Date(oferta.fecha_fin).toLocaleDateString('es-ES')} 
        ({diasRestantes} días restantes)
      </p>
    </div>
  )
}