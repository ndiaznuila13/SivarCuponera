
function CuponCard({ cupon }) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
                <div className="w-24 h-24 bg-slate-100 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                    <img
                        src={cupon.imagen}
                        alt={cupon.tienda}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex-1">
                    {cupon.etiqueta && (
                        <span className={`text-xs font-bold px-2 py-1 rounded ${cupon.etiquetaColor}`}>
                            {cupon.etiqueta}
                        </span>
                    )}
                    <h3 className="text-xl font-bold text-[#007BA7] mt-2">{cupon.descuento}</h3>
                    <p className="font-bold text-[#002147]">{cupon.tienda}</p>
                    <p className="text-sm text-slate-500 mt-1">{cupon.descripcion}</p>
                </div>
            </div>
            <button className="w-full mt-4 py-3 bg-[#002147] text-white font-bold rounded-lg hover:bg-[#003366] transition-colors">
                Obtener Código
            </button>
            <p className="text-xs text-slate-400 text-center mt-2">{cupon.expira}</p>
        </div>
    )
}

export default CuponCard;
