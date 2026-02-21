export default function Hero({ busqueda, setBusqueda }) {
  return (
    <section className="bg-gradient-to-r from-slate-900 to-blue-900 py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ahorra más en cada compra
        </h1>
        <p className="text-slate-300 mb-8">
          Encuentra tu oferta en miles de tiendas al instante
        </p>
        <div className="flex items-center bg-white rounded-lg p-2 max-w-xl mx-auto shadow-lg">
          <input
            type="text"
            placeholder="Buscar tiendas o marcas..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="flex-1 px-4 py-2 border-none outline-none text-slate-700"
          />
          <button className="px-6 py-2 bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-700 transition-colors">
            Buscar
          </button>
        </div>
        {/* <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-sm text-slate-300">
          <span>Trending:</span>
          <a href="#" className="text-white font-medium hover:underline">Sportline</a>
          <a href="#" className="text-white font-medium hover:underline">RadioShack</a>
          <a href="#" className="text-white font-medium hover:underline">Starbucks</a>
          <a href="#" className="text-white font-medium hover:underline">Siman</a>
          <a href="#" className="text-white font-medium hover:underline">New Era</a>
          <a href="#" className="text-white font-medium hover:underline">Walmart</a>
        </div> */}
      </div>
    </section>
  )
}
