import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import QRCode from 'react-qr-code';
import { FaPhoneSquareAlt,FaEnvelope,FaWhatsappSquare,FaFacebookSquare,FaTwitterSquare } from "react-icons/fa";

const urlWhatsApp = import.meta.env.VITE_URL_WHATSAPP;

const Contactanos = () => {

  return (
    <>
      <Navbar />
       <section className="bg-gris-claro pb-3 md:py-16">
        <div className="container mx-auto">
          <h2 className="text-center mb-4 text-xl md:text-3xl font-semibold uppercase">Contáctanos</h2>
          <div className="flex flex-col gap-4 lg:flex-row  md:gap-6">
            <div className="flex flex-col w-[95%] mx-auto md:w-3/4 md:mx-auto">
              <form action="/contacto" method="post">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <label htmlFor="nombre" className="text-lg font-medium">Nombre completo:</label>
                    <input type="text" id="nombre" name="nombre" className="rounded-lg border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-azul-oscuro" required />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="correo" className="text-lg font-medium">Correo electrónico:</label>
                    <input type="email" id="correo" name="correo" className="rounded-lg border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-azul-oscuro" required />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="telefono" className="text-lg font-medium">Teléfono:</label>
                    <input type="tel" id="telefono" name="telefono" className="rounded-lg border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-azul-oscuro" required />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="asunto" className="text-lg font-medium">Asunto:</label>
                    <input type="text" id="asunto" name="asunto" className="rounded-lg border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-azul-oscuro" required />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="mensaje" className="text-lg font-medium">Mensaje:</label>
                    <textarea id="mensaje" name="mensaje" className="rounded-lg border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-azul-oscuro" rows="4" required></textarea>
                  </div>
                  <div className="flex justify-center">
                    <button type="submit" className="bg-azul-oscuro font-medium text-white text-lg px-16 p-3 rounded-xl hover:bg-azul-claro">Enviar mensaje</button>
                  </div>
                </div>
              </form>
            </div>
            <div className="flex flex-col gap-6 md:w-3/4 md:mx-auto bg-slate-50 rounded-lg mt-4 pt-3 md:pt-8">
              <h3 className="text-center text-2xl font-semibold">También puedes contactarnos por:</h3>
              <ul className="text-xl list-none ml-1 sm:ml-4 md:ml-8">
                <li className='flex items-center '>{<FaPhoneSquareAlt className="w-6 h-6 md:w-8 md:h-8" />}<span className='font-semibold ml-2 mr-3' >Teléfono : </span> +57 1 234 5678</li>
                <li className='flex items-center'>{<FaEnvelope className="w-6 h-6 md:w-8 md:h-8" />}<span className='font-semibold ml-2 mr-3'>Correo : </span>info@viajeseguro.com</li>
                <li className='flex items-center'>{<FaWhatsappSquare className="w-6 h-6 md:w-8 md:h-8" />}<span className='font-semibold ml-2 mr-3'>WhatsApp:</span> +57 300  123 4567</li>
                <li className='flex items-center'>{<FaFacebookSquare className="w-6 h-6 md:w-8 md:h-8" />}<span className='font-semibold ml-2 mr-3'>Facebook :</span> /Via jeSeguroColombia</li>
                <li className='flex items-center'>{<FaTwitterSquare className="w-6 h-6 md:w-8 md:h-8" />}<span className='font-semibold ml-2 mr-3'>Twitter:</span> @ViajeSeguroCo</li>
              </ul>
              <div>
                <h3 className='text-center text-2xl font-semibold'>También puedes escanear el codigo QR</h3>
                <div className='mt-8 container flex justify-center mb-3 md:mb-0'>
                  <QRCode value={urlWhatsApp} size={150} />
              </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Contactanos