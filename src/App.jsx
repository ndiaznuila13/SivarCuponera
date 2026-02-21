import { useState } from 'react'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
// import LogIn from './components/auth/LogIn'
// import SignUp from './components/auth/SignUp'
import MisCupones from './components/cupones/MisCupones'

function App() {
  const [rubroSeleccionado, setRubroSeleccionado] = useState(null)
  const [busqueda, setBusqueda] = useState('')

  const handleSeleccionarRubro = (idRubro) => {
    console.log('Categoría seleccionada en App:', idRubro)
    setRubroSeleccionado(idRubro)
  }

  return (
    <AuthProvider>
      <Layout>
        <Home
          rubroSeleccionado={rubroSeleccionado}
          onSeleccionarRubro={handleSeleccionarRubro}
          busqueda={busqueda}
          setBusqueda={setBusqueda}
        />
      </Layout>
    </AuthProvider>
  )
}

export default App