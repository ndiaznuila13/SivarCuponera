import OfertaCard from './OfertaCard'

// Importar imágenes
import cafeImg from '../../assets/img-cupones/cafe.jpg'
import gorrasImg from '../../assets/img-cupones/gorras.jpg'
import maquillajeImg from '../../assets/img-cupones/MAC.jpg'
import mascotasImg from '../../assets/img-cupones/mascotas.jpg'
import radioImg from '../../assets/img-cupones/radio.webp'
import zapatosImg from '../../assets/img-cupones/zapatosSportline.png'

// Datos de ejemplo para los cupones
const cupones = [
  {
    id: 1,
    descuento: "Lleva 2 pares de Sambas por $150",
    tienda: "Sportline",
    imagen: zapatosImg,
    descripcion: "No pierdas la oportunidad de ahorrar en tu próxima compra deportiva.",
    etiqueta: "Ahorra $30",
    etiquetaColor: "bg-green-100 text-green-700",
    expira: "Vence en 2 días",
  },
  {
    id: 2,
    descuento: "Laptop Asus a $399.99",
    tienda: "RadioShack",
    imagen: radioImg,
    descripcion: "Adquiere esta espectacular laptop con un descuento increíble.",
    etiqueta: "Ahorra $100",
    etiquetaColor: "bg-red-100 text-red-600",
    expira: "válido hasta el 30 de marzo",
  },
  {
    id: 3,
    descuento: "Bebida grande",
    tienda: "Starbucks",
    imagen: cafeImg,
    descripcion: "Por solo $2.99 obtén una bebida grande de Starbucks.",
    etiqueta: "Solo hoy",
    etiquetaColor: "bg-orange-100 text-orange-600",
    expira: "válido hasta las 4 PM",
  },
  {
    id: 4,
    descuento: "Obten tu labial MAC a $15",
    tienda: "Siman",
    imagen: maquillajeImg,
    descripcion: "Ahorra en tus compras de labial.",
    etiqueta: "Ahorra $5",
    etiquetaColor: "bg-green-100 text-green-600",
    expira: "válido hasta durar existencias",
  },
  {
    id: 5,
    descuento: "Llevate 2 gorras de tu equipo favorito por $90",
    tienda: "New Era",
    imagen: gorrasImg,
    descripcion: "Compra tu gorra de tu equipo favorito y obtén la segunda al 50% de descuento",
    etiqueta: "¡Oferta Especial!",
    etiquetaColor: "bg-green-100 text-green-600",
    expira: "válido hasta el 28 de febrero de 2026",
  },
  {
    id: 6,
    descuento: "Compra tu bolsa de comida Pedigree de 18 lbs por $10",
    tienda: "Walmart",
    imagen: mascotasImg,
    descripcion: "Obtén un 10% de descuento en productos para mascotas.",
    etiqueta: "Antes $16.98",
    etiquetaColor: "bg-yellow-100 text-yellow-600",
    expira: "válido hasta el 31 de marzo de 2026",
  },
]

export default function OfertasCuadricula() {
  return (
    <div className="flex-1">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4">
        <h2 className="text-lg sm:text-xl font-bold text-oxford-navy">Mejores Ofertas para Ti</h2>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 bg-white w-full sm:w-auto">
            <option>Más Populares</option>
            <option>Más Recientes</option>
            <option>Mayor Descuento</option>
          </select>
        </div>
      </div>
      {/* Grid: 1 columna en móvil, 2 en tablet/desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {cupones.map((cupon) => (
          <OfertaCard key={cupon.id} cupon={cupon} />
        ))}
      </div>
      <div className="flex justify-center mt-6 sm:mt-8">
        <button className="px-6 sm:px-8 py-2.5 sm:py-3 border border-slate-300 rounded-lg font-bold text-slate-600 hover:bg-slate-50 transition-colors text-sm sm:text-base">
          Cargar Más Ofertas
        </button>
      </div>
    </div>
  )
}
