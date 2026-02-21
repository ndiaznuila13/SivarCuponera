import Hero from '../components/ofertas/Hero'
import Sidebar from '../components/ofertas/Sidebar'
import OfertasCuadricula from '../components/ofertas/OfertasCuadricula'

export default function Home({ rubroSeleccionado, onSeleccionarRubro, busqueda, setBusqueda }) {
  return (
    <>
      <Hero busqueda={busqueda} setBusqueda={setBusqueda} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <Sidebar
            rubroSeleccionado={rubroSeleccionado}
            onSeleccionarRubro={onSeleccionarRubro}
          />
          <OfertasCuadricula
            rubroSeleccionado={rubroSeleccionado}
            busqueda={busqueda}
          />
        </div>
      </div>
    </>
  )
}