import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Inicio from './pages/Inicio'
import NuestroServicios from './pages/NuestrosServicios'
import Contactanos from './pages/Contactanos'
import SobreNosotros from './pages/SobreNosotros'
import Reservas from './pages/Reservas'

import Registarse from './pages/Registarse'
import NuevoPassword from './pages/NuevoPassword'
import OlvidePassword from './pages/OlvidePassword'
import IniciarSesion from './pages/IniciarSesion'
import ConfirmarCuenta from './pages/ConfirmarCuenta';
import NuevaReserva from './pages/NuevaReserva';
/* Rutas Protegidas */
import AuthLayout from './layouts/AuthLayout'
import RutaProtegida from './layouts/RutaProtegida'

/* Context */
import { AuthContextProvider } from './context/AuthContext.jsx';
import { ReservasContextProvider } from './context/ReservasProvider.jsx';
import ReservaById from './pages/ReservaById.jsx'


function App() {

  return (
   
    <BrowserRouter >
      <AuthContextProvider>
        <ReservasContextProvider> 
          <Routes>
            {/* Auths Routes  */}    
            <Route path='/authLayout' element={ <AuthLayout /> } >       
              <Route path='iniciar-sesion' element={<IniciarSesion />} />
              <Route path='registrarse' element={<Registarse /> } />
              <Route path='confirmar-cuenta/:tokenId' element={<ConfirmarCuenta /> } />
              <Route path='olvide-password' element={<OlvidePassword /> } />
              <Route path='nuevo-password/:token' element={<NuevoPassword /> } />          
            </Route>
            {/* Public Routes */}
            <Route path='/' element={< Inicio /> } />
            <Route path='nuestros-servicios' element={<NuestroServicios />} />
            <Route path='sobre-nosotros' element={<SobreNosotros />} />
            <Route path='contactanos' element={<Contactanos />} />
            
            <Route path='/reservas' element={<RutaProtegida />}>
              <Route index element={<Reservas />} />
              <Route path='nueva-reserva' element={<NuevaReserva />} />
              <Route path='reserva-by-id/:id' element={<ReservaById />} />
            </Route>
          </Routes>
        </ReservasContextProvider> 
      </AuthContextProvider>  
    </BrowserRouter> 
 
  )
}

export default App
