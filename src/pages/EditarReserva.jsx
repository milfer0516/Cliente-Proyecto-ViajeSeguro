import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useReservas } from "../hooks/useReservas";
import FormularioReservas from '../components/FormularioReservas';

const EditarReserva = () => {

    const { reservaById, obtenerReservaById, loadind } = useReservas();
    
    const params = useParams();
    const { id } = params

    useEffect(() => {
        obtenerReservaById(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Solo utiliza id y obtenerReservaById como dependencias

    //const { categoria, destinoFinal, horaReserva, fechaInicio } = reservaById

    if(loadind) {
        return (
            <div className="fixed top-1/2 left-1/ w-2/4 h-2/4 bg-black bg-opacity-50 flex items-center justify-center">
                <h3 className="text-black">Cargando.....</h3>
            </div>
        )
    }

    const { destinoInicial } = reservaById
    const fechaFinModify = (reservaById.fechaInicio.split('T')[0]);
    const fechaFormateada = new Date(fechaFinModify);
    const dia = fechaFormateada.getDate() + 1;
    const mes = fechaFormateada.getMonth() + 1 ;
    const año = fechaFormateada.getFullYear();

  return (
    <>
        <h2 className='text-2xl font-semibold'>Editar Reserva: {destinoInicial}</h2>
        <h2 className='text-2xl font-semibold'>Del:  dia {dia}-0{mes}-{año}</h2>

         <div className="mt-10 flex justify-center w-full">
          <FormularioReservas />
        </div>
    </>
  )
}

export default EditarReserva