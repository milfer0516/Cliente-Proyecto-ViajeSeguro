//import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/images/Logo-ViajeSeguro.png'
import { 
    FaRegCopyright,
    FaFacebook, 
    FaInstagramSquare, 
    FaTiktok, FaEnvelope  } from "react-icons/fa";
import { FaGooglePlus, FaLocationDot, FaSquarePhone } from "react-icons/fa6";

const Footer = () => {


  return (

    <div className='bg-color-btn-reservar md:mt-4 mt-2 '>
        <footer className="flex flex-col items-center md:flex-row md:justify-around w-full pt-4">
            <div className='flex md:flex-col justify-center items-center flex-row gap-3 mb-2'>
                <Link to={"/"}>
                <img className='w-20 md:w-28 md:ml-10 rounded-full bg-white border-2 mb-2' src={Logo} alt="Logo" />
                </Link>
                <Link to={"/reservas"} type="button" className='bg-azul-oscuro text-neutral-200 md:mt-0 px-7 py-2 text-center md:ml-10 rounded-lg'>Reserva Ahora</Link>
            </div>
            <div className='grid grid-cols-2 lg:grid-cols-2 md:grid-cols-1 mb-2 gap-2 text-zinc-900'>
                <Link to={"/"} className='text-lg font-bold mr-2 hover:bg-red-400 text-center bg-red-500 border-red-400 py-1 rounded-lg'>Inicio</Link>
                <Link to={"/nuestros-servicios"} className='text-lg font-bold mr-2 hover:bg-red-400 text-center bg-red-500 border-red-400 py-1 rounded-lg'>Nuestros Servicios</Link>
                <Link to={"/sobre-nosotros"} className='text-lg font-bold mr-2 hover:bg-red-400 text-center bg-red-500 border-red-400 py-1 rounded-lg'>Sobre Nosotros</Link>
                <Link to={"/contactanos"} className='text-lg font-bold hover:bg-red-400 text-center bg-red-500 border-red-400 py-1 rounded-lg'>Contáctanos</Link>
            </div>
            <div className='text-center mt-2 mb-2'>
                <h2 className='text-xl font-semibold mb-2'>Contáctanos</h2>
                <span className='flex gap-2 text-lg mb-2'>{<FaLocationDot className='text-xl' />}Av. El Dorado # 103-9,Fontibon</span>
                <span className='flex gap-2 text-lg mb-2'> {<FaEnvelope className='text-xl'/>} viajeseguro@viajeseguro.com </span>
                <span className='flex gap-2 text-lg mb-2' >{<FaSquarePhone className='text-xl'/>} +57 3219041397 </span>
            </div>

        </footer>
        <div className="mt-6 mb-6 border-b-2 border-b-amarillo-mostaza md:mx-32"></div>
        <div className='flex flex-col md:flex-row justify-evenly items-center'>
            <div className='flex  gap-2 items-center mb-6'>
                <span className='text-2xl'>{<FaRegCopyright />}</span>
                <p>2024 <span className='font-extrabold text-lg'>*</span> Milfer Antonio Muñoz</p>
            </div>
            <div className='flex flex-col md:flex-row justify-center items-center mb-6 gap-2'>
                <p className='text-lg font-medium'>Siguenos en</p>
                
                <div className='flex text-xl gap-1'>
                    {<FaGooglePlus />}
                    {<FaFacebook />}
                    {<FaInstagramSquare />}
                    {<FaTiktok />}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer