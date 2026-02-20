const categorias = [
  { nombre: "Todas", activa: true },
  { nombre: "Comida", activa: false },
  { nombre: "Servicios", activa: false },
  { nombre: "Productos", activa: false },
]

export default function Sidebar() {
  return (
    <aside className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm h-fit sticky top-20">
      <div className="flex items-center gap-2 mb-6">
        <h3 className="font-bold text-oxford-navy text-lg">Categorías</h3>
      </div>
      <ul className="space-y-2">
        {categorias.map((cat) => (
          <li key={cat.nombre}>
            <a
              href="#"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                cat.activa
                  ? "bg-cerulean-light text-primary font-bold"
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
