import OfertaCard from './OfertaCard'

// Importar imágenes
import cafeImg from '../../assets/img-cupones/cafe.webp'
import gorrasImg from '../../assets/img-cupones/gorras.jpg'
import maquillajeImg from '../../assets/img-cupones/maquillaje.jpg'
import mascotasImg from '../../assets/img-cupones/mascotas.jpg'
import radioImg from '../../assets/img-cupones/radio.webp'
import zapatosImg from '../../assets/img-cupones/zapatosSportline.webp'

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
    descripcion: "Obtén 20% de descuento en toda la tienda, válido solo para compras en línea.",
    etiqueta: "En tendencia",
    etiquetaColor: "bg-red-100 text-red-600",
    expira: "válido hasta el 30 de marzo",
  },
  {
    id: 3,
    descuento: "Bebida grande",
    tienda: "Starbucks",
    imagen: cafeImg,
    descripcion: "Agranda tu bebida por el precio de una. Oferta válida solo hoy.",
    etiqueta: "Expira pronto",
    etiquetaColor: "bg-orange-100 text-orange-600",
    expira: "válido hasta las 4 PM",
  },
  {
    id: 4,
    descuento: "15% de descuento",
    tienda: "Siman",
    imagen: maquillajeImg,
    descripcion: "Ahorra en tus compras de maquillaje y cuidado personal.",
    etiqueta: null,
    etiquetaColor: "",
    expira: "válido hasta durar existencias",
  },
  {
    id: 5,
    descuento: "Segunda unidad al 50%",
    tienda: "New Era",
    imagen: gorrasImg,
    descripcion: "Compra tu gorra de tu equipo favorito y obtén la segunda al 50% de descuento",
    etiqueta: null,
    etiquetaColor: "",
    expira: "válido hasta el 28 de febrero de 2026",
  },
  {
    id: 6,
    descuento: "10% de descuento en mascotas",
    tienda: "Walmart",
    imagen: mascotasImg,
    descripcion: "Obtén un 10% de descuento en productos para mascotas.",
    etiqueta: "¡Guau!",
    etiquetaColor: "bg-green-100 text-green-600",
    expira: "válido hasta el 31 de marzo de 2026",
  },
]

export default function OfertasCuadricula() {
  return (
    <div className="flex-1">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-xl font-bold text-[#002147]">Mejores Ofertas para Ti</h2>
        <div className="flex items-center gap-2">
          <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 bg-white">
            <option>Más Populares</option>
            <option>Más Recientes</option>
            <option>Mayor Descuento</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cupones.map((cupon) => (
          <OfertaCard key={cupon.id} cupon={cupon} />
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
