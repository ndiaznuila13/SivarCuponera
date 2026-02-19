import { useState } from 'react'
import Layout from './components/layout/Layout'
import Hero from './components/ofertas/Hero'
import Sidebar from './components/ofertas/Sidebar'
import OfertasCuadricula from './components/ofertas/OfertasCuadricula'
import PopupFooter from './components/common/PopupFooter'
import './App.css'

function App() {
  const [popup, setPopup] = useState({ open: false, title: '', content: null })

  const handleOpenPopup = (title, content) => {
    setPopup({ open: true, title, content })
  }

  const handleClosePopup = () => {
    setPopup({ open: false, title: '', content: null })
  }

  return (
    <Layout>
      <Hero />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64 shrink-0">
            <Sidebar />
          </div>
          <OfertasCuadricula />
        </div>
      </main>

      {/* Popup emergente reutilizable */}
      <PopupFooter open={popup.open} onClose={handleClosePopup} title={popup.title}>
        {popup.content}
      </PopupFooter>
    </Layout>
  )
}

export default App