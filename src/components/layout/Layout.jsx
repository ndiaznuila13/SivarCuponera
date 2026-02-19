import Header from './Header'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header fijo en la parte superior */}
      <Header />
      
      {/* Contenido principal - crece para empujar el footer al fondo */}
      <main className="grow">
        {children}
      </main>
      
      {/* Footer siempre al fondo */}
      <Footer />
    </div>
  )
}