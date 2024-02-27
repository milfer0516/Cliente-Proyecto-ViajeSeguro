/* eslint-disable react/prop-types */
import { useReservas } from "../hooks/useReservas";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

const ReservaById = (  ) => {

    const [ distance, setDistance ] = useState('')
    const [ tiempo, setTiempo ] = useState([]);
    const [ precio, setPrecio ] = useState(null)
    const { obtenerReservaById, deleteReservation ,reservaById ,loadind } = useReservas();
    
    const params = useParams();
    const { id } = params;
    useEffect(() => {
        const getDataReservaById = async () => {
            await obtenerReservaById(id);
        }
        getDataReservaById();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 
    
    const { destinoInicial, categoria,
            destinoFinal, horaReserva, distancia, tiempoRecorrido} = reservaById;
    //console.log(distancia)
    const fechaFinModify = (reservaById.fechaInicio?.split('T')[0]);
    const fechaFormateada = new Date(fechaFinModify);
    const dia = fechaFormateada.getDate() + 1;
    const mes = fechaFormateada.getMonth() + 1 ;
    const año = fechaFormateada.getFullYear();
  
    useEffect(() => {

        if(distancia) {
            setDistance(distancia)
        }
        if(tiempoRecorrido) {
            setTiempo(tiempoRecorrido)
            
        }
        if(categoria) {
            setPrecio(categoria.precioKilometro)
        }
      
    }, [distancia, tiempoRecorrido, tiempo, categoria, precio])
    

    const handleClickEliminar = (e) => {
        e.preventDefault();
        Swal.fire({
            icon: 'question',
            title: 'Estas seguro de eliminar esta reserva',
            html: `<b>Desde: ${destinoInicial} Para: ${destinoFinal} </b>`,
            confirmButtonText: 'Aceptar',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteReservation(id);
                    Swal.fire(
                        'Eliminado!',
                        'La reserva ha sido eliminada.',
                      'success'
                    )
                }
    
        })
    }

    return (
        loadind ?  (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                <h3 className="text-white">Cargando.....</h3>
            </div>
        ):(
            <div className="flex flex-col lg:flex-row justify-between items-center">
                <div className="flex flex-col bg-slate-50 px-3 py-5 rounded-lg w-full lg:w-5/6 mb-3 lg:mb-0">

                    <h2 className="text-gray-800 font-bold text-3xl font-fuente-principal font-roboto-bold-700 mb-4">Reserva del dia {" "} {dia}-0{mes}-{año}
                    </h2>
                    
                    { categoria &&  <p className="text-2xl font-semibold">Tipo de Vehiculo: <span className="font-normal">{categoria.nombreCategoria}</span> </p>}
                    
                    <p className="text-2xl font-semibold">Destino de Recogida : <span className="font-normal">{destinoInicial}</span> </p>
                    <p className="text-2xl font-semibold">Destino de Llegada : <span className="font-normal">{destinoFinal}</span> </p>
                    <p className="text-2xl font-semibold">Hora de la reserva : <span className="font-normal ml-3">{horaReserva}</span> </p>
                    <p className="text-2xl font-semibold">Fecha de la reserva : <span className="font-normal ml-3">{dia}-{mes}-{año}</span> </p>
                    <p className="text-2xl font-semibold">Distancia Recorrida : <span className="font-normal ml-3">{distance} kms</span> </p>
                    <p className="text-2xl font-semibold">Tiempo duracion de la reserva : <span className="font-normal ml-1">{tiempo[0] >1 ? `Horas ${tiempo[0]}`:`${tiempo[0]} Hora`} : {tiempo[1]} minutos </span> 
                    </p>
                   

                    <p className="text-2xl font-semibold">Precio total reserva : <span className="font-normal ml-3">${distance * precio}</span> </p>

                </div>
                <div className="flex flex-row gap-20 lg:flex-col lg:gap-4 mt-3 lg:mt-0">
                    <div className="flex flex-row lg:flex-col gap-2 items-center text-gray-500 hover:text-gray-900 ">
                        <FaEdit className="w-7 h-7 "/>
                        <Link
                        to={`/reservas/editar-reservas/${id}`}
                        className="bg-red-400 px-3 py-1 rounded-md uppercase font-semibold"
                        >Editar</Link>
                    </div>
                    <div className="flex flex-row lg:flex-col gap-2 items-center text-gray-500 hover:text-gray-900 ">
                        <FaTrashCan className="w-7 h-7 "/>
                        <button
                        onClick={handleClickEliminar}
                        className="bg-red-400 px-3 py-1 rounded-md uppercase font-semibold"
                        >Eliminar</button>
                    </div>
                </div>
            </div>
        )
    )
}

export default ReservaById;