export default function Hero({ busqueda, setBusqueda }) {
  const tiendasTrending = ['Sportline', 'RadioShack', 'Starbucks', 'Siman', 'New Era', 'Walmart']

  return (
    <section className="bg-gradient-to-r from-slate-900 to-blue-900 py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ahorra más en cada compra
        </h1>
        <p className="text-slate-300 mb-8">
          Encuentra tu oferta en miles de tiendas al instante
        </p>

        {/* BARRA DE BÚSQUEDA */}
        <div className="relative max-w-xl mx-auto mb-6">
          <input
            type="text"
            placeholder="Buscar tiendas o marcas..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full px-6 py-4 pl-14 rounded-xl bg-white text-slate-800 text-lg border-2 border-transparent focus:border-primary focus:outline-none shadow-lg"
          />
          <svg
            className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          {busqueda && (
            <button
              onClick={() => setBusqueda('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* TRENDING TAGS */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="text-slate-300 text-sm font-medium">Trending:</span>
          {tiendasTrending.map((tienda) => (
            <button
              key={tienda}
              onClick={() => setBusqueda(tienda)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                busqueda === tienda
                  ? 'bg-primary text-white'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {tienda}
            </button>
          ))}
        </div>

        {busqueda && (
          <p className="text-sm text-slate-300 mt-4">
            Buscando: <span className="font-semibold text-primary">{busqueda}</span>
          </p>
        )}
      </div>
    </section>
  )
}