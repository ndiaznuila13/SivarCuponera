import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
// import LogIn from './components/auth/LogIn'
// import SignUp from './components/auth/SignUp'
import MisCupones from './components/cupones/MisCupones'

function App() {
  const [rubroSeleccionado, setRubroSeleccionado] = useState(null)

  const handleSeleccionarRubro = (idRubro) => {
    console.log('Categoría seleccionada en App:', idRubro)
    setRubroSeleccionado(idRubro)
  }

  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  rubroSeleccionado={rubroSeleccionado}
                  onSeleccionarRubro={handleSeleccionarRubro}
                />
              } 
            />
            {/* <Route path="/login" element={<LogIn />} /> */}
            {/* <Route path="/signup" element={<SignUp />} /> */}
            <Route path="/mis-cupones" element={<MisCupones />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App