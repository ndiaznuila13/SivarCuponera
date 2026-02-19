import { useState } from 'react';

function PopupFooter({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-transparent backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold">&times;</button>
        <h2 className="text-xl font-bold mb-4 text-[#002147]">{title}</h2>
        <div className="text-slate-600 text-sm">{children}</div>
      </div>
    </div>
  );
}
import './App.css'
import cafeImg from './assets/img-cupones/cafe.webp';
import gorrasImg from './assets/img-cupones/gorras.jpg';
import maquillajeImg from './assets/img-cupones/maquillaje.jpg';
import mascotasImg from './assets/img-cupones/mascotas.jpg';
import radioImg from './assets/img-cupones/radio.webp';
import zapatosImg from './assets/img-cupones/zapatosSportline.webp';

// Datos de ejemplo para los cupones
const cupones = [
  {
    id: 1,
    descuento: "2x1 en zapatos",
    tienda: "Sportline",
    imagen: zapatosImg,
    descripcion: "No pierdas la oportunidad de ahorrar en tu próxima compra deportiva.",
    etiqueta: "Tiempo Limitado",
    etiquetaColor: "bg-green-100 text-green-700",
    expira: "Vence en 2 días",
  },
  {
    id: 2,
    descuento: "20% de descuento",
    tienda: "RadioShack",
    imagen: radioImg,
    descripcion: "Opten 20% de descuento en toda la tienda, válido solo para compras en línea.",
    etiqueta: "En tendencia",
    etiquetaColor: "bg-red-100 text-red-600",
    expira: "valido hasta el 30 de marzo",
  },
  {
    id: 3,
    descuento: "Bebida grande",
    tienda: "Starbucks",
    imagen: cafeImg,
    descripcion: "Agranda tu bebida por el precio de una. Oferta válida solo hoy.",
    etiqueta: "Expira pronto",
    etiquetaColor: "bg-orange-100 text-orange-600",
    expira: "valido hasta las 4 PM",
  },
  {
    id: 4,
    descuento: "15% de descuento",
    tienda: "Siman",
    imagen: maquillajeImg,
    descripcion: "Ahorra en tus compras de maquillaje y cuidado personal. ",
    etiqueta: null,
    etiquetaColor: "",
    expira: "valido hasta durar existencias",
  },
  {
    id: 5,
    descuento: "Segunda unidad al 50%",
    tienda: "New Era",
    imagen: gorrasImg,
    descripcion: "Compre tu gorra de tu equipo favorito y obtén la segunda al 50% de descuento",
    etiqueta: null,
    etiquetaColor: "",
    expira: "valido hasta el 28 de febrero de 2026",
  },
  {
    id: 6,
    descuento: "10% de descuento en mascotas",
    tienda: "Walmart",
    imagen: mascotasImg,
    descripcion: "Obten un 10% de descuento en productos para mascotas. ",
    etiqueta: "¡Guau!",
    etiquetaColor: "bg-green-100 text-green-600",
    expira: "valido hasta el 31 de marzo de 2026",
  },
]

const categorias = [
  { nombre: "Comida", activa: true },
  { nombre: "Servicios", activa: false },
  { nombre: "Productos", activa: false },
]

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 text-[#007BA7]">
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
          <a href="#" className="text-white font-medium hover:underline">Sportline</a>
          <a href="#" className="text-white font-medium hover:underline">RadioShack</a>
          <a href="#" className="text-white font-medium hover:underline">Starbucks</a>
          <a href="#" className="text-white font-medium hover:underline">Siman</a>
          <a href="#" className="text-white font-medium hover:underline">New Era</a>
          <a href="#" className="text-white font-medium hover:underline">Walmart</a>
        </div>
      </div>
    </section>
  )
}

function Sidebar() {
  return (
    <aside className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm h-fit">
      <div className="flex items-center gap-2 mb-6">
        <h3 className="font-bold text-[#002147]">Categorías</h3>
      </div>
      <ul className="space-y-2">
        {categorias.map((cat) => (
          <li key={cat.nombre}>
            <a
              href="#"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${cat.activa
                ? "bg-[#E0F2F7] text-[#007BA7] font-bold"
                : "text-slate-600 hover:bg-slate-50"
                }`}
            >
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

function CuponesGrid() {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#002147]">Mejores Ofertas para Ti</h2>
        <div className="flex items-center gap-2">
          <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600">
            <option>Más Populares</option>
            <option>Más Recientes</option>
            <option>Mayor Descuento</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
  const [popup, setPopup] = useState({ open: false, title: '', content: null });

  const handleOpenPopup = (title, content) => {
    setPopup({ open: true, title, content });
  };
  const handleClosePopup = () => {
    setPopup({ open: false, title: '', content: null });
  };

  return (
    <footer className="bg-white border-t border-slate-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center text-center mx-auto" style={{maxWidth: '900px'}}>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 text-[#007BA7] mb-4">
              <h2 className="text-[#002147] text-lg font-bold">Sivar Cuponera</h2>
            </div>
            <p className="text-sm text-slate-500">
              Brindándote los mejores descuentos y códigos promocionales de las marcas que amas. Empieza a ahorrar hoy.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <h4 className="font-bold text-[#002147] mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-[#007BA7]">Sobre Nosotros</a></li>
              <li><a href="#" className="hover:text-[#007BA7]">Todas las Tiendas</a></li>
              <li><a href="#" className="hover:text-[#007BA7]">Soporte</a></li>
            </ul>
          </div>
          <div className="flex flex-col items-center">
            <h4 className="font-bold text-[#002147] mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <button
                  onClick={() => handleOpenPopup('Política de Privacidad', (
                    <div className="space-y-3 text-left">
                      <h3 className="font-semibold text-base">Introducción</h3>
                      <p>Esta es una política de privacidad de ejemplo. Aquí puedes agregar la introducción sobre cómo se maneja la información personal.</p>
                      <h3 className="font-semibold text-base">Datos que recopilamos</h3>
                      <ul className="list-disc list-inside ml-4">
                        <li>Información de contacto (nombre, correo electrónico, etc.)</li>
                        <li>Datos de navegación y uso del sitio</li>
                        <li>Otra información relevante para encuestas y/o ofertas</li>
                      </ul>
                      <h3 className="font-semibold text-base">Uso de la información</h3>
                      <p>La información recopilada se utiliza para mejorar la experiencia del usuario, personalizar el contenido y enviar promociones relevantes.</p>
                      <h3 className="font-semibold text-base">Tus derechos</h3>
                      <p>Puedes solicitar acceso, rectificación o eliminación de tus datos personales en cualquier momento.</p>
                    </div>
                  ))}
                  className="hover:text-[#007BA7] focus:outline-none bg-transparent"
                >
                  Política de Privacidad
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenPopup('Términos de Servicio', (
                    <div className="space-y-3 text-left">
                      <h3 className="font-semibold text-base">Aceptación de los Términos</h3>
                      <p>Al utilizar este sitio web, aceptas cumplir con estos términos y condiciones de uso. Si no estás de acuerdo, por favor no utilices el sitio.</p>
                      <h3 className="font-semibold text-base">Uso Permitido</h3>
                      <ul className="list-disc list-inside ml-4">
                        <li>Utilizar el sitio solo para fines legales y personales.</li>
                        <li>No realizar actividades que puedan dañar, sobrecargar o afectar el funcionamiento del sitio.</li>
                        <li>Respetar los derechos de propiedad intelectual de los contenidos.</li>
                      </ul>
                      <h3 className="font-semibold text-base">Limitación de Responsabilidad</h3>
                      <p>No nos hacemos responsables por daños directos o indirectos derivados del uso del sitio o de la imposibilidad de acceder al mismo.</p>
                      <h3 className="font-semibold text-base">Modificaciones</h3>
                      <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán efectivos una vez publicados en esta página.</p>
                    </div>
                  ))}
                  className="hover:text-[#007BA7] focus:outline-none bg-transparent"
                >
                  Términos de Servicio
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-100 text-center text-xs text-slate-400">
          © 2026 Sivar Cuponera. Todos los derechos reservados.
        </div>
      </div>

      {/* Popup emergente reutilizable */}
      <PopupFooter open={popup.open} onClose={handleClosePopup} title={popup.title}>
        {popup.content}
      </PopupFooter>
    </footer>
  );
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
