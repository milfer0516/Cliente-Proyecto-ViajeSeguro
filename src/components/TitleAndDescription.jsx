import { Link } from 'react-router-dom';

const TitleAndDescription = () => {
  return (
    <>
        <h1 className='m-auto w-6/12 uppercase text-2xl md:text-4xl font-sem my-8 text-center'>
        <span className='text-blue-900 font-roboto-sbold-900'>ViajeSeguro Tu sitio online</span> { " " }
        de transporte público Viaja a Tú destino Ideal </h1>

        <section className='container m-auto w-[95%] bg-slate-100 rounded-md'>
          <div className='m-auto mx-8 mt-3 p-3'>
            <h2 className='text-2xl md:text-3xl font-bold'>¿Por qué elegirnos?</h2>
            <div className='w-11/12 mt-4 text-lg'>
              <p>Somos una empresa con amplia experiencia en el sector del transporte público terrestre.</p>
              <p>Contamos con una flota moderna y en perfecto estado de mantenimiento.</p>
              <p>Nuestros conductores son profesionales y experimentados, y te brindarán un trato cordial y personalizado.</p>
              <p>Te ofrecemos un servicio de atención al cliente <span className='font-bold'>24/7</span> para que puedas resolver cualquier duda o incidencia.</p>
            </div>
          </div>
          <div className=' flex flex-col md:flex-row md:justify-between xl:justify-around my-3 pt-1 gap-2'>
            <div className='flex flex-col ml-3 items-center mt-2 mb-3'>
              <h2 className='text-3xl font-semibold text-center'>Categorías de vehículos</h2>
              <div className='text-lg w-12/12 pl-4 justify-content: center mt-2'>
                <p><span className='font-semibold text-xl'>Camionetas:</span> Ideales para grupos pequeños o viajes cortos.</p>
                <p><span className='font-semibold text-xl'>Automóviles</span> Para mayor comodidad y privacidad en tu viaje.</p>
                <p><span className='font-semibold text-xl'>Vans de 8 pasajeros:</span> Perfectas para grupos medianos o familias.</p>
                <p><span className='font-semibold text-xl'>Van de 14 pasajeros:</span> Ideal para grupos grandes o eventos especiales.</p>
                <p><span className='font-semibold text-xl'>Van de 19 pasajeros:</span> La mejor opción para viajes con grupos numerosos.</p>
              </div>
            </div>
              <div className='flex flex-col mr-4 mt-2'>
                <h2 className='text-3xl font-semibold text-center'>Beneficios de reservar con nosotros</h2>
                <div className='text-lg font-medium w-12/12 justify-content: center mt-2 pl-2'>
                  <p><span className='text-xl font-bold'>1</span> Reserva online en pocos pasos</p>
                  <p><span className='text-xl font-bold'>2</span> Precios competitivos</p>
                  <p><span className='text-xl font-bold'>3</span> Vehículos modernos y en perfecto estado</p>
                  <p><span className='text-xl font-bold'>4</span> Conductores profesionales y experimentados</p>
                  <p><span className='text-xl font-bold'>5</span> Atención al cliente personalizada</p>
                </div>
              </div>
            
          </div>

          <div className='flex flex-col lg:flex-row justify-center lg:justify-evenly lg:items-center md:gap-2 md:pb-2 lg:w-9/12'>
            <p className='text-xl font-semibold md:px-11 px-2'>Reserva ahora tu transporte público terrestre y disfruta de un viaje cómodo y seguro.</p>

            <Link to={"/reservas"} className='w-3/4 lg:w-2/4 m-auto px-3 py-3 uppercase bg-color-btn-reservar text-zinc-200 rounded-lg text-center mb-3 mt-3' type="button">Solicita Tu Reserva</Link>
          </div>
        </section>
    </>
  )
}

export default TitleAndDescription