import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const MostrarReservas = ( { reserva } ) => {

    const { _id, destinoInicial, destinoFinal, horaReserva, fechaInicio } = reserva

    const fechaFormateada = new Date(fechaInicio);
    const dia = fechaFormateada.getDate() + 1;
    const mes = fechaFormateada.getMonth() + 1 ;
    const año = fechaFormateada.getFullYear();

    //console.log(`${dia}/${mes}/${año}`);
  return (
    <div className='border-b p-5 flex'>
        
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
        

        <Link to={`reserva-by-id/${_id}`}
        className='text-gray-600 hover:text-gray-700 uppercase font-bold text-sm bg-color-btn-reservar h-5'>
            Ver Rerserva
        </Link>
    </div>
  )
}

export default MostrarReservas

MostrarReservas.propTypes = {
    reserva: PropTypes.object
}