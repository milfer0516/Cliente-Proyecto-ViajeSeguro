import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import imageTuristico from '../images/Images-Servicios/catedral-de-sal.jpg'
import imageCorporativo from '../images/Images-Servicios/transporte-ejecutivos.jpg';
import imageAeropuerto from '../images/Images-Servicios/transporte-aeropuerto.jpg'
import imageUrbano from '../images/Images-Servicios/Transporte público especial.jpg'

const NuestrosServicios = () => {

  return (
    
    <>
      <Navbar />
      <div className='container m-auto mt-5 mb-5'>
        <h2 className='text-2xl font-bold md:text-4xl text-center'>Nuestros Servicios</h2>
        <p className='w-11/12 ml-4 md:w-10/12 md:ml-20 mt-2 text-[1rem] md:text-lg'>En ViajeSeguro, nos enorgullece ofrecer una amplia gama de servicios de transporte de pasajeros diseñados para satisfacer todas tus necesidades de viaje. Nuestro compromiso es brindar una experiencia segura, comoda y confiable en cada trayecto. Ya sea que estes planeando un turistico, una reunión ne de negocios o un traslado dentro de la ciudad, estamos aquí para ti</p>
      </div>
      <section className='w-[97%] md:w-11/12 m-auto'>
        <div className='grid md:grid-rows-2 lg:grid-cols-2 gap-4 rounded-lg'>
          <div className='bg-white rounded-lg shadow-md '>
            <img className='w-full h-[26rem] rounded-t-lg' src={imageTuristico} alt="image-turistico" />
            <h3 className='text-center text-lg md:text-2xl font-bold uppercase text-zinc-800 mt-3'>Transporte Turístico</h3>
            <p className='mt-1 p-2 md:p-4 text-[1rem] md:text-xl text-zinc-800'>Descubre nuevos destinos con comodidad y seguridad. Nuestros vehículos comodos y conductores experimentados te llevaran a lugares emocionantes</p>
            <div className="flex justify-center mt-16">
              <button className="bg-color-btn-reservar text-zinc-800 text-lg font-semibold w-full mx-2 md:w-1/2 md:mx-auto py-4 rounded-lg mb-3">Reservar Ahora</button>
            </div>
          </div>
          <div className='bg-white rounded-lg shadow-md '>
            <img className='w-full h-[26rem] rounded-t-lg' src={imageCorporativo} alt="image-turistico" />
            <h3 className='text-center text-lg md:text-2xl font-bold uppercase text-zinc-800 mt-3'>Transporte Corporativo</h3>
            <p className='mt-1 p-2 md:p-4 text-[1rem] md:text-xl text-zinc-800'>Ofrecemos soluciones de transporte personalizadas para empresas. Desde traslados de ejecutivos hasta eventos corporativos. Garantizamos puntualidad y profesionalismo</p>
            <div className="flex justify-center mt-16">
              <button className="bg-color-btn-reservar text-zinc-800 text-lg font-semibold w-full mx-2 md:w-1/2 md:mx-auto py-4 rounded-lg mb-3">Reservar Ahora</button>
            </div>
          </div>
          <div className='bg-white rounded-lg shadow-md'>
            <img className='w-full rounded-t-lg' src={imageAeropuerto} alt="image-turistico" />
            <h3 className='text-center text-lg md:text-2xl font-bold uppercase text-zinc-800 mt-3'>Transporte al Aeropuerto</h3>
            <p className='mt-1 p-2 md:p-4 text-[1rem] md:text-xl text-zinc-800 '>Ofrecemos traslados al aeropuerto desde cualquier punto de la ciudad o desde o hacia los alrededores, en una variedad de gama de vehiculos en muy buen estado puntualidad y los mejores conductores con gran experiencia.</p>
            <div className="flex justify-center mt-4">
              <button className="bg-color-btn-reservar text-zinc-800 text-lg font-semibold w-full mx-2 md:w-1/2 md:mx-auto py-4 rounded-lg mb-3">Reservar Ahora</button>
            </div>
          </div>
          <div className='bg-white rounded-lg shadow-md'>
            <img className='w-full h-[26rem] rounded-t-lg' src={imageUrbano} alt="image-turistico" />
            <h3 className='text-center text-lg md:text-2xl font-bold uppercase text-zinc-800 mt-3'>Transporte Urbano</h3>
            <p className='mt-1 p-2 md:p-4 text-[1rem] md:text-xl text-zinc-800 '>Ofrecemos la modalidad de reservas de tipo urbano para personas que necesiten un servicio de transporte para su cita medica o evento no empresarial o corporativo, te recogemos y te dejamos en el lugar que tú elijas, Puedes elegir el tipo de vehículo y la tarifa que mejor se adapte a tus necesidades.</p>
            <div className="flex justify-center mb-2 md:mt-[5rem]">
              <button className="bg-color-btn-reservar text-zinc-800 text-lg font-semibold w-full mx-2 md:w-1/2 md:mx-auto py-4 rounded-lg mb-3">Reservar Ahora</button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default NuestrosServicios