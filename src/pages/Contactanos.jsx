import useForm from '../hooks/useForm';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import QRCode from 'react-qr-code';
import { FaPhoneSquareAlt,FaEnvelope,FaWhatsappSquare,
  FaFacebookSquare,FaTwitterSquare } from "react-icons/fa";

const urlWhatsApp = import.meta.env.VITE_URL_WHATSAPP;

const Contactanos = () => {

  //regexEmail = ^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$
  //regexNombre = ^([a-zA-Záéíóúñü ,.'-]+\s)+[a-zA-Záéíóúñü ,.'-]+$
  //regexMensaje = ^.{1,255}$

  const initialData = {
    nombre:   '',
    correo:   '',
    telefono: '',
    asunto:   '',
    mensaje:  ''
  }

  const onValidate = (form) => {
    
    let errors = {};

    /* These are regular expressions (regex) used for form validation in the `onValidate` function. */
    let regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let regexNombre = /^([A-Za-zÑñÁáÉéÍíÓóÚú\s])+$/;
    let regexTelefono = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s]?\d{3}[\s.-]?\d{4}$/;
    let regexMensaje = /^.{1,255}$/;

    if(!form.nombre.trim()) {
      errors.nombre = 'El campo "Nombre" no debe estar vacio.';
    } else if(!regexNombre.test(form.nombre)) {
      errors.nombre = 'El campo "Nombre" solo acepta letras y espacios';
    }

    if(!form.correo.trim()) {
      errors.correo = 'El campo "Correo" no debe estar vacio.';
    }else if(!regexEmail.test(form.correo)) {
      errors.correo = 'El campo "Correo" contiene un formato no valido.';
    }

    if (!form.telefono.trim()) {
      errors.telefono = 'El campo "Teléfono" no debe estar vacío.';
    } else if (!regexTelefono.test(form.telefono)) {
      errors.telefono = 'El campo "Teléfono" solo acepta números, signo "+", paréntesis y espacios en blanco.';
    } else if (form.telefono.length < 10) {
      errors.telefono = 'El campo "Teléfono" debe tener al menos 10 caracteres.';
    } else if (form.telefono.length > 15) {
      errors.telefono = 'El campo "Teléfono" no debe tener más de 15 caracteres.';
    }

    if(!form.asunto.trim()) {
      errors.asunto = 'El campo "Asunto" no debe estar vacio.';
    } else if(!regexNombre.test(form.asunto)) {
      errors.asunto = 'El campo "Nombre" solo acepta letras y espacios';
    }

    if(!form.mensaje.trim()) {
      errors.mensaje = 'El campo "Mensaje" no debe estar vacio.';
    }else if(!regexMensaje.test(form.mensaje)) {
      errors.mensaje = 'El campo "Mensaje" solo acepta 255 caracteres';
    }

    console.log(errors)
    return errors;
  }

  const { form, errors, loading, handleChange, handleSubmit } = useForm(initialData, onValidate)

  return (
    <>
      <Navbar />
       <section className="bg-gris-claro pb-3 md:py-16">
        <div className="container mx-auto">
          <h2 className="text-center mb-4 text-xl md:text-3xl font-semibold uppercase">Contáctanos</h2>
          <div className="flex flex-col gap-4 lg:flex-row  md:gap-6">
            <div className="flex flex-col w-[95%] mx-auto md:w-3/4 md:mx-auto">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <label htmlFor="nombre" className="text-lg font-medium">Nombre completo:</label>
                    <input type="text" id="nombre" name="nombre"
                    onChange={handleChange}
                    value={form.nombre}
                    className="rounded-lg border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-azul-oscuro" />
                    {errors.nombre && 
                      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative" role="alert">
                        <strong>{errors.nombre}</strong>
                      </div>
                    }
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="correo" className="text-lg font-medium">Correo electrónico:</label>
                    <input  id="correo" name="correo"
                      onChange={handleChange}
                      value={form.correo}
                     className="rounded-lg border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-azul-oscuro" />
                    {errors.correo && 
                      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative" role="alert">
                        <strong>{errors.correo}</strong>
                      </div>
                    }
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="telefono" className="text-lg font-medium">Teléfono:</label>
                    <input type="tel" id="telefono" name="telefono"
                    onChange={handleChange}
                    value={form.telefono}
                    className="rounded-lg border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-azul-oscuro" />
                    {errors.telefono && 
                      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative" role="alert">
                        <strong>{errors.telefono}</strong>
                      </div>
                    }
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="asunto" className="text-lg font-medium">Asunto:</label>
                    <input type="text" id="asunto" name="asunto"
                    onChange={handleChange}
                    value={form.asunto}
                    className="rounded-lg border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-azul-oscuro" />
                    {errors.asunto && 
                      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative" role="alert">
                        <strong>{errors.asunto}</strong>
                      </div>
                    }
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="mensaje" className="text-lg font-medium">Mensaje:</label>
                    <textarea id="mensaje" name="mensaje" 
                    onChange={handleChange}
                    value={form.mensaje}
                    //onBlur={(e => console.log(e.target.value))}
                    className="rounded-lg border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-azul-oscuro text-lg font-medium" rows="4" ></textarea>
                    {errors.mensaje && 
                      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative" role="alert">
                        <strong>{errors.mensaje}</strong>
                      </div>
                    }
                  </div>
                  <div className="flex justify-center">
                    <button 
                    type="submit" 
                    className="bg-azul-oscuro font-medium text-white text-lg px-16 p-3 rounded-xl hover:bg-azul-claro"
                    disabled={loading}>{loading ? "Enviando Mensaje....." : "Enviar mensaje"}</button>
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

export default Contactanos;