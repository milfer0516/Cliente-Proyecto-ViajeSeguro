import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import imageVan8 from '../images/Images-Vehiculos/imagen-van-8.png';
import imageMision from '../images/Images-Vehiculos/imagen-mision.png';

const SobreNosotros = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }
  return (
    <>
      <Navbar />
      <>
        <h2 className='text-2xl md:text-4xl text-center font-bold my-5 uppercase'>Sobre Nosotros</h2>
        <div className=' w-11/12 m-auto  mb-4'>
        <h3 className='text-2xl font-semibold mb-2'>¿Quiénes somos?</h3>
          <p className='text-xl'>Somos una empresa innovadora que facilita la reserva de viajes en transporte público terrestre. Nacimos con la misión de simplificar el proceso de compra de pasajes y brindar una experiencia de viaje cómoda y segura a nuestros usuarios.</p>
        </div>
       <section className="w-[90%] m-auto md:h-[15rem] mb-8 ">
        <div className="mt-6 bg-cielo-celeste rounded-xl">
          <Slider {...settings}>
              <div className="md:p-4 pt-2 text-gray-200">
                <div className="flex flex-col md:flex-row items-center gap-5">
                  <img className="w-80 lg:w-[30rem] rounded-md" src={imageVan8} alt="image-vehicle" />
                    <div className="flex flex-col">
                      <h3 className="mb-2 lg:text-3xl text-xl font-semibold">Nuestra visión</h3>
                        <p className="text-lg font-medium">
                          Ser la plataforma líder en reservas de transporte público terrestre, ofreciendo un servicio integral que se adapte a las necesidades de cada pasajero.
                        </p>
                    </div>
                </div>
              </div>
              <div className="md:p-4 pt-2 pb-4 text-gray-200">
                <div className="flex flex-col md:flex-row items-center gap-5">
                  <img className="w-80 lg:w-[30rem] rounded-md" src={imageMision} alt="image-mision" />
                  <div className="flex flex-col">
                      <h3 className="mb-2 lg:text-3xl text-xl font-semibold">Nuestra misión</h3>
                      <p className="text-lg font-medium">
                        Brindar una plataforma intuitiva y segura para que los usuarios puedan reservar sus viajes de forma rápida y sencilla, con acceso a una amplia variedad de rutas, horarios y tarifas.
                      </p>
                    </div>
                </div>
              </div>
          </Slider>
        </div>
      </section>
      <section className="w-[90%] m-auto md:h-[15rem] md:mb-24">
        <div className="mt-6 bg-cielo-celeste rounded-xl mb-8">
          <Slider {...settings}>
              <div className="md:p-4 pt-2 text-gray-200">
                <div className="flex flex-col md:flex-row items-center gap-5">
                    <div className="flex flex-col">
                      <h3 className="mb-2 lg:text-3xl text-xl font-semibold mt-2">¿Qué nos diferencia?</h3>
                        <p className="text-lg font-medium pb-3">
                          Tecnología innovadora: Ofrecemos una plataforma moderna y fácil de usar, con opciones de búsqueda avanzada para encontrar el viaje perfecto.
                        </p>
                        <p className="text-lg font-medium pb-3">
                          Amplia cobertura: Contamos con una extensa red de operadores de transporte público terrestre, lo que nos permite ofrecer una amplia variedad de rutas y destinos.
                        </p>
                        <p className="text-lg font-medium pb-3">
                          Precios competitivos: Trabajamos para ofrecer los mejores precios del mercado, con opciones que se ajustan a todos los presupuestos.
                        </p>
                    </div>
                </div>
              </div>
              <div className="md:p-4 pt-2 pb-4 text-gray-200">
                <div className="flex flex-col md:flex-row items-center gap-5 ">
                  <div className="flex flex-col">
                      <h3 className="mb-2 lg:text-3xl text-xl font-semibold">Nuestro compromiso</h3>
                      <p className="text-lg font-medium pb-2">
                        Seguridad: Nos comprometemos a garantizar la seguridad de nuestros usuarios durante todo el viaje.
                      </p>
                      <p className="text-lg font-medium pb-2">
                        Confianza: Brindamos un servicio transparente y confiable, con información clara y precisa sobre las rutas, horarios y tarifas.
                      </p>
                      <p className="text-lg font-medium pb-2">
                        Eficiencia: Buscamos optimizar el proceso de compra de pasajes para que los usuarios puedan ahorrar tiempo y dinero.
                      </p>
                      <p className="text-lg font-medium pb-1">
                        Atención al cliente personalizada: Contamos con un equipo de atención al cliente altamente calificado para ayudarte a resolver cualquier duda o problema.
                      </p>
                    </div>
                </div>
              </div>
          </Slider>
        </div>
      </section>
      </>
      <Footer />
    </>
  )
}

export default SobreNosotros