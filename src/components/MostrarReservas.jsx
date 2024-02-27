import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useReservas } from '../hooks/useReservas';

const MostrarReservas = ( { reserva, onDeleteReserva } ) => {

    const { _id, fechaInicio, horaReserva, destinoInicial, destinoFinal, } = reserva;
    //console.log(reserva)

    const { handleModalUpdateReserva } = useReservas();

    const fechaFormateada = new Date(fechaInicio);
    const dia = fechaFormateada.getDate() + 1;
    const mes = fechaFormateada.getMonth() + 1 ;
    const año = fechaFormateada.getFullYear();

    //console.log(`${dia}/${mes}/${año}`);
  return (
    <div className='border-b p-5 flex flex-col lg:flex-row'>
        
        <div className='flex-1'>
            <p className='text-lg font-roboto-bold-700 text-gray-700'>
                Fecha de la Reserva {" "}
                <span>{`${dia}/${mes}/${año}`}</span>
            </p>
            <p className='text-lg font-roboto-bold-700 text-gray-700'>
                Hora de la Reserva {" "}
                <span>{horaReserva}</span>
            </p>
            <p className='text-lg font-roboto-bold-700 text-gray-700'>
                Punto Recogida: {" "}
                <span className='text-gray-600 uppercase font-bold '> {destinoInicial}</span> 
            </p>

            <p className='text-lg font-roboto-bold-700 text-gray-700'>
                Punto de Llegada: {" "}
                <span className='text-gray-600 uppercase font-bold '>{destinoFinal}</span>   
            </p>
            
        </div>

        <div className='gap-2 flex flex-col lg:flex-col my-auto mr-4 pl-3 items-center'>
            <Link to={`reserva-by-id/${_id}`}
            className='text-zinc-200 hover:text-gray-400 uppercase font-bold text-sm bg-verde-menta mx-auto w-full text-center lg:my-2 py-3 lg:w-full px-3 rounded-lg'>
                Ver Rerserva
            </Link>
            <Link 
            onClick={() => handleModalUpdateReserva(reserva)}
            className='text-zinc-200 hover:text-gray-400 uppercase font-bold text-sm bg-amarillo-mostaza text-center mx-auto w-full  py-3 my-2 lg:w-full px-3 rounded-lg'>
                Editar Rerserva
            </Link>
            <Link 
            onClick={() => handleModalUpdateReserva(reserva)}
            className='text-zinc-200 hover:text-gray-400 uppercase font-bold text-sm bg-color-btn-reservar text-center mx-auto w-full py-3 lg:w-full px-3 rounded-lg'>
                Eliminar Rerserva
            </Link>
        </div>

    </div>
  )
}

export default MostrarReservas;

MostrarReservas.propTypes = {
    reserva: PropTypes.object
}