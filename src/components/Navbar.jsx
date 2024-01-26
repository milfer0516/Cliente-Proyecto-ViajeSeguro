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
    { title: 'Nosotros', link: '/sobre-nosotros', color: "Nosotros" },
    { title: 'Contactanos', link: '/contactanos', color: "Contactanos" },
    { title: 'Reservas', link: '/reservas', color: "Reservas" },
  ]

const Navbar = () => {
  // crear una funcion para los botones donde maneje el color al dar click
  const [activeButton, setActiveButton] = useState("Inicio");
  const [ menuOpen, setMenuOpen ] = useState(false);
  
  const handleButtonClick = (event, color) => {
    event.preventDefault();
    console.log("Color del botón clicado:", color)
    setActiveButton(color)
  };


  const handleMenu = () => {
    console.log(menuOpen)
    setMenuOpen((prev) => !prev);
  }


  return (

    <nav className= " bg-cielo-celeste p-4 h-[10rem] md:h-[450px] mx-auto">
      
      <div className="flex justify-between md:justify-between md:mt-5 items-center ">
          {/* Logo */}
          <Link to={'/'} className="text-white font-bold text-lg ml-8">
            <img className='w-20 md:w-28 md:ml-10 rounded-full bg-color-pantalla border-2' src={Logo} alt="Logo" />
          </Link>
          {/* Botones navLinks*/}
          <div className=' md:block md:mr-12  mr-2'>
            <div className=" text-white flex justify-between items-center">
              {navLinks.map((link, index) => (
                <Link key={index} to={link.link} className={`hover:bg-azul-oscuro transition-all duration-500 content-center border-2 text-center py-2 md:py-3 px-4 md:px-2 ml-2 rounded-lg sm:w-28 text-gray-200 md:text-lg text-sm ${activeButton === link.color ? 'bg-color-primario-nav  text-white font-semibold hover:border-solid': 'rounded-lg text-white font-semibold py-3'}`
                } onClick={() => handleButtonClick( link.color)}>
                  {link.title}</Link>
              ))}
            </div>    
          </div>
      </div>
      
      {/* Botones Inicio Servicios Nosotros Contáctanos Reservar */}
      <section className='md:flex items-center justify-center mt-4 md:mr-0 lg:mr-16'>
        <div>
          <div className=' hidden md:block md:space-x-3 content-center items-center'>
            <div className='text-sm w-full'>
              {navLinksSections.map((link, index) => (
                <a
                  key={index}
                  href={link.link}
                  className={`transition-all duration-500 border-2 text-center py-2 md:py-3 md:px-7 ml-2 rounded-lg text-gray-200 md:text-lg text-sm ${
                    activeButton === link.color
                      ? 'bg-azul-oscuro text-white font-semibold hover:border-solid'
                      : 'bg-transparent hover:bg-azul-oscuro hover:text-white text-white hover:border-solid'
                  }`}
                  onClick={() => handleButtonClick( link.color)}
                >
                  {link.title}
                </a>
              ))}
            </div>
          </div>
          {/* Para Moviles */}
          <div className='-mr-2 md:hidden block'>
            <button 
            type='button'
            className='inline-flex items-center justify-center pb-3 rounded-md'
            onClick={handleMenu}  
            >
              <span className="sr-only">Open main menu</span>
              {menuOpen === true ? <FaTimes 
              className="w-6 h-6 md:w-12 md:h-12 text-gray-400 hover:text-white" 
              /> 
              : <FaBars className="w-8 h-8 md:w-12 md:h-12 text-gray-400 hover:text-white" /> }
            </button>
          </div>
          <div className='pt-0 pb-3 sm:px-3 m-auto bg-cielo-celeste -mx-4 px-6'>
  {menuOpen && (
    <div className='md:block flex flex-col space-y-2 md:space-y-0 md:flex-row md:justify-center w-full'>
      {navLinksSections.map((link, index) => (
        <a
          key={index}
          href={link.link}
          className={`transition-all duration-500 border-2 text-center py-3 md:py-3 md:px-7 rounded-lg sm:w-28 text-gray-200 md:text-lg text-sm px-3 font-medium ${
            activeButton === link.color
            ? 'bg-azul-oscuro text-white font-semibold hover:border-solid'
            : 'bg-transparent hover:bg-azul-oscuro hover:text-white text-white hover:border-solid '
          }`}
          onClick={() => handleButtonClick(link.color)}
        >
          {link.title}
        </a>
      ))}
    </div>
  )}
</div>

        </div>
      </section>
    </nav>
  )
}

export default Navbar