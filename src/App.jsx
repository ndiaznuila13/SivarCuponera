import './App.css'

// Datos de ejemplo para los cupones
const cupones = [
  {
    id: 1,
    descuento: "2x1 en zapatos",
    tienda: "Sportline",
    descripcion: "No pierdas la oportunidad de ahorrar en tu próxima compra deportiva.",
    etiqueta: "Tiempo Limitado",
    etiquetaColor: "bg-green-100 text-green-700",
    expira: "Vence en 2 días",
  },
  {
    id: 2,
    descuento: "20% de descuento",
    tienda: "RadioShack",
    descripcion: "Opten 20% de descuento en toda la tienda, válido solo para compras en línea.",
    etiqueta: "En tendencia",
    etiquetaColor: "bg-red-100 text-red-600",
    expira: "valido hasta el 30 de marzo",
  },
  {
    id: 3,
    descuento: "Bebida grande",
    tienda: "Starbucks",
    descripcion: "Agranda tu bebida por el precio de una. Oferta válida solo hoy.",
    etiqueta: "Expira pronto",
    etiquetaColor: "bg-orange-100 text-orange-600",
    expira: "valido hasta las 4 PM",
  },
  {
    id: 4,
    descuento: "15% de descuento",
    tienda: "Siman",
    descripcion: "Ahorra en tus compras de maquillaje y cuidado personal. ",
    etiqueta: null,
    etiquetaColor: "",
    expira: "valido hasta durar existencias",
  },
  {
    id: 5,
    descuento: "Segunda unidad al 50%",
    tienda: "New Era",
    descripcion: "Compre tu gorra de tu equipo favorito y obtén la segunda al 50% de descuento",
    etiqueta: null,
    etiquetaColor: "",
    expira: "valido hasta el 28 de febrero de 2026",
  },
  {
    id: 6,
    descuento: "10% de descuento en mascotas",
    tienda: "Walmart",
    descripcion: "Obten un 10% de descuento en productos para mascotas. ",
    etiqueta: "¡Guau!",
    etiquetaColor: "bg-green-100 text-green-600",
    expira: "valido hasta el 31 de marzo de 2026",
  },
]

const categorias = [
  { nombre: "Comida", icono: "restaurant", activa: true },
  { nombre: "Servicios", icono: "handyman", activa: false },
  { nombre: "Productos", icono: "inventory_2", activa: false },
]

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 text-[#007BA7]">
            <span className="material-symbols-outlined text-3xl font-bold">confirmation_number</span>
            <h2 className="text-[#002147] text-xl font-bold tracking-tight">Sivar Cuponera</h2>
          </div>
        </div>
        <nav className="hidden lg:flex items-center gap-6">
          <a className="text-sm font-bold text-[#002147] hover:text-[#007BA7] transition-colors" href="#">Nuevos</a>
          <a className="text-sm font-bold text-[#002147] hover:text-[#007BA7] transition-colors" href="#">Tiendas</a>
          <a className="text-sm font-bold text-[#002147] hover:text-[#007BA7] transition-colors" href="#">Categorías</a>
        </nav>
        <div className="flex items-center gap-4">
          <a className="text-sm font-medium text-slate-600 hover:text-[#007BA7]" href="#">Registrarse</a>
          <button className="px-5 py-2 bg-[#002147] text-white text-sm font-bold rounded-lg hover:bg-[#003366] transition-colors">
            Iniciar Sesión
          </button>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="bg-gradient-to-r from-[#002147] to-[#004d7a] py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ahorra más en cada compra
        </h1>
        <p className="text-slate-300 mb-8">
          Encuentra tu oferta en miles de tiendas al instante
        </p>
        <div className="flex items-center bg-white rounded-lg p-2 max-w-xl mx-auto shadow-lg">
          <span className="material-symbols-outlined text-slate-400 ml-2">search</span>
          <input
            type="text"
            placeholder="Buscar tiendas o marcas..."
            className="flex-1 px-4 py-2 border-none outline-none text-slate-700"
          />
          <button className="px-6 py-2 bg-[#007BA7] text-white font-bold rounded-lg hover:bg-[#006691] transition-colors">
            Buscar
          </button>
        </div>
        <div className="flex items-center justify-center gap-4 mt-6 text-sm text-slate-300">
          <span>Trending:</span>
          <a href="#" className="text-white font-medium hover:underline">Nike</a>
          <a href="#" className="text-white font-medium hover:underline">Amazon</a>
          <a href="#" className="text-white font-medium hover:underline">Sephora</a>
          <a href="#" className="text-white font-medium hover:underline">Best Buy</a>
        </div>
      </div>
    </section>
  )
}

function Sidebar() {
  return (
    <aside className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm h-fit">
      <div className="flex items-center gap-2 mb-6">
        <span className="material-symbols-outlined text-[#007BA7]">grid_view</span>
        <h3 className="font-bold text-[#002147]">Categorías</h3>
      </div>
      <ul className="space-y-2">
        {categorias.map((cat) => (
          <li key={cat.nombre}>
            <a
              href="#"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                cat.activa
                  ? "bg-[#E0F2F7] text-[#007BA7] font-bold"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span className="material-symbols-outlined text-xl">{cat.icono}</span>
              <span>{cat.nombre}</span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}

function CuponCard({ cupon }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-slate-500">storefront</span>
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

function CuponesGrid() {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#002147]">Mejores Ofertas para Ti</h2>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-slate-400">tune</span>
          <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600">
            <option>Más Populares</option>
            <option>Más Recientes</option>
            <option>Mayor Descuento</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cupones.map((cupon) => (
          <CuponCard key={cupon.id} cupon={cupon} />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button className="px-8 py-3 border border-slate-300 rounded-lg font-bold text-slate-600 hover:bg-slate-50 transition-colors">
          Cargar Más Ofertas
        </button>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 text-[#007BA7] mb-4">
              <span className="material-symbols-outlined text-2xl">confirmation_number</span>
              <h2 className="text-[#002147] text-lg font-bold">Sivar Cuponera</h2>
            </div>
            <p className="text-sm text-slate-500">
              Brindándote los mejores descuentos y códigos promocionales de las marcas que amas. Empieza a ahorrar hoy.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-[#002147] mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-[#007BA7]">Sobre Nosotros</a></li>
              <li><a href="#" className="hover:text-[#007BA7]">Todas las Tiendas</a></li>
              <li><a href="#" className="hover:text-[#007BA7]">Soporte</a></li>
              <li><a href="#" className="hover:text-[#007BA7]">Enviar Cupón</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#002147] mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-[#007BA7]">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-[#007BA7]">Términos de Servicio</a></li>
              <li><a href="#" className="hover:text-[#007BA7]">Política de Cookies</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#002147] mb-4">Newsletter</h4>
            <p className="text-sm text-slate-500 mb-4">Recibe las mejores ofertas en tu correo.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm"
              />
            </div>
            <button className="w-full mt-2 py-2 bg-[#007BA7] text-white font-bold rounded-lg hover:bg-[#006691] text-sm">
              Suscribirse
            </button>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-100 text-center text-xs text-slate-400">
          © 2026 Sivar Cuponera. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Header />
      <Hero />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64 shrink-0">
            <Sidebar />
          </div>
          <CuponesGrid />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
