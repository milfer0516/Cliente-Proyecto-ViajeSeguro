import { Link } from 'react-router-dom';
import { FaTimes, FaBars } from "react-icons/fa";
import Logo from '../assets/images/Logo-ViajeSeguro.png'
import { useState } from 'react'

const navLinks = [
  {
    title: 'Registrate',
    link: '/authLayout/registrarse',
    color: "Registrarse"
  },
  {
    title: 'Ingresar',
    link: '/authLayout/iniciar-sesion',
    color: "Ingresar"
  }
];

const navLinksSections = [
    { title: 'Inicio',link: '/',color: "Inicio" },
    { title: 'Nuestros Servicios',link: '/nuestros-servicios', color: "Servicios" },
    { title: 'Sobre Nosotros', link: '/sobre-nosotros', color: "Nosotros" },
    { title: 'Contáctanos', link: '/contactanos', color: "Contactanos" },
    { title: 'Solicita tu Reserva', link: '/reservas', color: "Reservas" },
  ]

const Navbar = () => {
  // crear una funcion para los botones donde maneje el color al dar click
  const [activeButton, setActiveButton] = useState(false);
  const [ menuOpen, setMenuOpen ] = useState(false);
  
  const handleButtonClick = (color) => {
    color.preventDefault();
    
    setActiveButton(color)
  };


  const handleMenu = () => {
    //console.log(menuOpen)
    setMenuOpen((prev) => !prev);
  }


  return (

    <nav className= "bg-azul-oscuro md:p-4 md:h-[30rem] lg:h-[450px] mx-auto">
      
      <div className="flex justify-between md:justify-between md:mt-5 items-center w-full">
          {/* Logo */}
          <Link to={'/'} className="text-white font-bold text-lg ml-8">
            <img className='w-20 md:w-28 md:ml-10 rounded-full bg-white border-2' src={Logo} alt="Logo" />
          </Link>
          {/* Botones navLinks*/}
          <div className=' md:block md:mr-12  mr-2 '>
            <div className=" text-white flex justify-between items-center">
              {navLinks.map((link, index) => (
                <Link key={index} to={link.link} className={`hover:bg-azul-oscuro bg-blue-500 opacity-90 transition-all duration-500 content-center border-2 text-center py-2 md:py-3 px-4 md:px-2 ml-2 rounded-lg sm:w-28 text-gray-200 md:text-lg text-sm ${activeButton === link.color ? 'bg-color-primario-nav  text-white font-semibold hover:border-solid': 'rounded-lg text-white font-semibold py-3'}`
                } 
                onClick={(link) => handleButtonClick( link.color)}>
                {link.title}</Link>
              ))}
            </div>    
          </div>
      </div>
      
      {/* Botones Inicio Servicios Nosotros Contáctanos Reservar */}
      <section className=' md:flex items-center justify-center mt-5 md:mr-0  content-center p-2'>
        <div className=' '>
          <div className='space-x-3 content-center items-center '>
            
            <div className='text-sm w-full hidden lg:block -nav py-4 px-8'>
              {navLinksSections.map((link, index) => (
                <Link
                  key={index}
                  to={link.link}
                  className={`bg-blue-500 opacity-90 text-white border-2 mr-5 py-4 px-8 transition-all duration-500 rounded-md ${ activeButton === link.color
                  ? 'bg-azul-oscuro text-white font-semibold hover:border-solid'
                  : 'bg-transparent hover:bg-azul-oscuro hover:text-white text-white '
                  }`}
                  onClick={() => handleButtonClick(link.color)}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
          {/* Para Moviles */}
          <div className='sm:mx-0 mt-5 lg:hidden block sm:mr-[44rem] '>
            <button 
              type='button'
              className='inline-flex items-center justify-start pb-3 rounded-md'
              onClick={handleMenu}  
            >
              <span className="sr-only">Open main menu</span>
              {menuOpen === true ? 
                <FaTimes className="w-6 h-6 md:w-8 md:h-8 text-gray-400 hover:text-white" /> 
                : <FaBars className="w-8 h-8 md:w-8 md:h-8 text-gray-400 hover:text-white" /> 
              }
            </button>
          </div>
          <div className='container block pt-0 pb-3 sm:px-3 m-auto  -mx-4 px-6 md:relative md:z-50 opacity-80 '>
            {menuOpen && (
              <div className='flex flex-col md:flex md:flex-col md:gap-3 space-y-1 md:space-y-0 lg:flex-row md:justify-center lg:w-full bg-cielo-celeste'>
                {navLinksSections.map((link, index) => (
                  <Link
                    key={index}
                    to={link.link}
                    className={`transition-all duration-500 border-2 text-center md:py-5 py-4 lg:px-7 rounded-lg lg:w-32 text-gray-200 lg:text-lg text-sm md:text-lg md:px-3 font-medium ${
                      activeButton === link.color
                      ? 'bg-azul-oscuro text-white font-semibold hover:border-solid'
                      : 'bg-transparent hover:bg-azul-oscuro hover:text-gray-400 text-white hover:border-solid'
                    }`}
                    onClick={() => handleButtonClick(link.color)}
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className='text-white md:mt-12 gap-6 flex flex-col md:flex-row justify-between items-center content-center mx-4 '>
            <Link to={"/reservas"} className='bg-color-btn-reservar h-12 text-center md:py-3 px-5 rounded-md md:mr-7 font-semibold mb-4 md:mb-0 flex items-center'>Reserva Ahora</Link>
            <div className='md:px-3 text-center md:text-left'>
              <h1 className='text-3xl md:text-4xl font-bold mb-2'>ViajeSeguro</h1>
              <h3 className='text-lg md:text-2xl font-medium mb-2'>Viajar es vivir,</h3>
              <p className='text-sm md:text-base max-w-xs md:max-w-none'>Hazlo fácil y explora el mundo con nosotros</p>
            </div>
          </div>
        </div>
      </section>

    </nav>
  )
}

export default Navbar