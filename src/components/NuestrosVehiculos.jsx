import Slider from "react-slick";
import { Link } from "react-router-dom";
import CardsVehiculos from "../config/CardsVehiculos";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NuestrosVehiculos = () => {
  const vehiculos = CardsVehiculos;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    // Responsive settings to display different images based on screen size:
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      
      {
        breakpoint: 820,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      
    ],
  };

  
  return (
    <>
        <div className="text-center uppercase mt-4 text-3xl font-semibold">Nuestros Vehiculos</div>
        <section className="w-11/12 md:w-3/4 m-auto text-center">
            <div className="mt-4 mb-9">
              <Slider {...settings}>
                {vehiculos.map((vehiculo) => (
                  <div key={vehiculo} className="bg-white text-black rounded-xl">
                    <div className="h-80 bg-cielo-celeste rounded-t-xl flex justify-center items-center">
                      <img className="w-72 h-72 rounded-full" src={vehiculo.image} alt="image-vehiculos" />
                    </div>
                    <div className="flex flex-col justify-center items-center gap-4 p-4">
                      <h3 className="text-xl font-bold">{vehiculo.name}</h3>
                      <p className="text-xl font-semibold">{vehiculo.desciption}</p>
                      <Link to={"/nuestros-servicios"} className="bg-azul-oscuro font-medium text-white text-lg px-16 p-3 rounded-xl" type="button">Ver Más</Link>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
        </section>
    </>
  )
}

export default NuestrosVehiculos;