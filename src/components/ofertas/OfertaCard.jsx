export default function OfertaCard({ cupon }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
      {/* Layout vertical en móvil, horizontal en desktop */}
      <div className="flex flex-col sm:flex-row items-start gap-4">
        {/* Imagen más grande en móviles (ancho completo) y mediana en desktop */}
        <div className="w-full sm:w-32 sm:h-32 h-48 bg-slate-100 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
          <img
            src={cupon.imagen}
            alt={cupon.tienda}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 w-full">
          {cupon.etiqueta && (
            <span className={`text-xs font-bold px-2 py-1 rounded ${cupon.etiquetaColor}`}>
              {cupon.etiqueta}
            </span>
          )}
          <h3 className="text-lg sm:text-xl font-bold text-primary mt-2">{cupon.descuento}</h3>
          <p className="font-bold text-oxford-navy text-base sm:text-lg">{cupon.tienda}</p>
          <p className="text-sm sm:text-base text-slate-500 mt-1">{cupon.descripcion}</p>
        </div>
      </div>
      <button className="w-full mt-4 py-3 sm:py-3.5 bg-oxford-navy text-white font-bold rounded-lg hover:bg-[#003366] transition-colors text-sm sm:text-base">
        Obtener Cupón
      </button>
      <p className="text-xs sm:text-sm text-slate-400 text-center mt-2">{cupon.expira}</p>
    </div>
  )
}
