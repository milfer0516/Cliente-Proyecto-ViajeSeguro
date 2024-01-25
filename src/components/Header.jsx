import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/images/Logo-ViajeSeguro.png'
import { useReservas } from '../hooks/useReservas'
import useAuth from '../hooks/useAuth'

const Header = () => {

  const { cerrarSesionAuth } = useAuth();
  const { cerrarSesionReservas } = useReservas()
  const navigate = useNavigate()

  const handleCerrarSesion = () => {
    cerrarSesionAuth();
    cerrarSesionReservas();
    localStorage.removeItem("token");
    navigate("/")
  }
  return (

    <header className="bg-color-primario-nav py-2 px-4 border-b border-gray-600">

      <div className='md:flex md:justify-between items-center'>
        {/* Logo */}
        <Link to={'/'} className="text-white font-bold text-lg ">
          <img className='w-20 md:w-28 md:ml-10 rounded-full bg-color-pantalla border-2' src={Logo} alt="Logo" />
        </Link>

        <input id='buscar' type="search" placeholder='buscar reservas' className='rounded-lg lg:w-96 h-10 px-3' />

        <div className='md:flex items-center gap-4'>
          <Link to={"/reservas"} className='font-bold uppercase text-color-pantalla px-2 bg-amarillo-mostaza p-3 rounded-md text-sm'>Mis Reservas</Link>

          <button type='button' onClick={handleCerrarSesion} className='text-color-pantalla bg-color-btn-reservar p-3 rounded-md uppercase font-bold text-sm'>Cerrar Sesión</button>
        </div>
      </div>
      
    </header>
  
  )
}

export default Header