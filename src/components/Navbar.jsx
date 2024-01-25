import { Link } from 'react-router-dom'
import Logo from '../assets/images/Logo-ViajeSeguro.png'


const Navbar = () => {
  
  return (

    <nav className= "bg-cielo-celeste p-4 h-[200px] md:h-[450px] mx-auto md:flex-col md:flex ">
      <div className="container flex md:justify-between md:mt-5 items-center">
        {/* Logo */}
        <Link to={'/'} className="text-white font-bold text-lg ">
          <img className='w-20 md:w-28 md:ml-10 rounded-full bg-color-pantalla border-2' src={Logo} alt="Logo" />
        </Link>

        {/* Botones */}
        <div className=" items-center space-x-4  hidden md:block">
          <Link to={"/authLayout/registrarse"} className='bg-color-primario-nav hover:bg-transparent border-2 hover:border-solid hover:border-2 hover:text-white md:py-3 md:px-4 py-2 px-3 rounded-lg text-color-pantalla font-[700]'> Registrarse </Link>
          
          <Link to={"/authLayout/iniciar-sesion"} className=" bg-color-pantalla hover:bg-transparent hover:border-solid border-2 hover:text-white py-3 px-4 rounded-lg text-gray-950 font-[700]">Iniciar Sesión</Link>
        </div>
 
        
      </div>
      <section className=' flex items-center justify-center mt-4'>
        <div className='hidden md:block md:space-x-3'>
        
          <Link to={"/"} className=" bg-color-primario-nav hover:bg-transparent hover:border-solid hover:border-2 hover:text-white py-3 px-12 rounded-lg text-color-pantalla font-[700]">Inicio</Link>

          <Link to={"/nuestros-servicios"} className=" bg-transparent hover:bg-transparent hover:border-none border-2 hover:bg-color-btn-registrar py-3 px-4 rounded-lg text-color-pantalla font-[700]">Nuestros Servicios</Link>

          <Link to={"/sobre-nosotros"} className="bg-transparent hover:bg-transparent hover:border-none border-2 hover:bg-color-btn-registrar py-3 px-4 rounded-lg text-color-pantalla font-[700]">Sobre Nosotros</Link>

          <Link to={"/contactanos"} className=" bg-transparent hover:bg-transparent hover:border-none border-2 hover:bg-color-btn-registrar py-3 px-4 rounded-lg text-color-pantalla font-[700]">Contáctanos</Link>

          <Link to={"/reservas"} className=" bg-transparent hover:bg-transparent border-2 hover:bg-color-btn-registrar hover:border-none py-3 px-4 rounded-lg text-color-pantalla font-[700]">Haz Tu Reserva</Link>
        </div>
      </section>
    </nav>
  )
}

export default Navbar