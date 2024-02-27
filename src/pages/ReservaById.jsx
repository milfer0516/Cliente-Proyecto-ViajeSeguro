/* eslint-disable react/prop-types */
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { useReservas } from "../hooks/useReservas";

const ReservaById = (  ) => {

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

   /*  useEffect(() => {
        const getDataReservaById = async () => {
            await obtenerReservaById(id);
        }
        getDataReservaById();
        return () => {
            localStorage.removeItem('datos-reserva');
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);  */
    /* localStorage.setItem('datos-reserva', JSON.stringify(reservaById));
    const storedData = JSON.parse(localStorage.getItem('datos-reserva')); */
    //console.log("Datos almacenados en localStorage: ",storedData);
    
    const { fechaInicio,destinoInicial,categoria,
            destinoFinal,horaReserva, tiempoRecorrido, distancia } = reservaById;
 
    const handleClickEliminar = () => {
        if(confirm("¿Deseas Eliminar el proyecto?")) {
            deleteReservation(id);
        } 
    }

    return (
        loadind ?  (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                <h3 className="text-white">Cargando.....</h3>
            </div>
        ):(
            <div className="flex flex-col lg:flex-row justify-between items-center">
                <div className="flex flex-col bg-slate-50 px-3 py-5 rounded-lg w-full lg:w-5/6 mb-3 lg:mb-0">
                   {/*  <h2 className="text-gray-800 font-bold text-3xl font-fuente-principal font-roboto-bold-700 mb-4">Reserva del dia {" "} {dia}-0{mes}-{año}
                    </h2> */}
                    
                    { categoria &&  <p className="text-2xl font-semibold">Tipo de Vehiculo: <span className="font-normal">{categoria.nombreCategoria}</span> </p>}
                    
                    <p className="text-2xl font-semibold">Destino de Recogida: <span className="font-normal">{destinoInicial}</span> </p>
                    <p className="text-2xl font-semibold">Destino de Llegada: <span className="font-normal">{destinoFinal}</span> </p>
                    <p className="text-2xl font-semibold">Hora de la reserva: <span className="font-normal">{horaReserva}</span> </p>
                    <p className="text-2xl font-semibold">Hora de la reserva: <span className="font-normal">{fechaInicio}</span> </p>
                    {/* {tiempoRecorrido && 
                        <p className="text-2xl font-semibold">Tiempo duracion de la reserva: <span className="font-normal">{hora >=2? `horas ${hora}`: `hora ${hora}`} : {minutos} minutos </span> </p>
                    } */}

                  {/*   {precioKilometro && distancia &&
                    <p className="text-2xl font-semibold">Precio total reserva: <span className="font-normal">${valorReserva}</span> </p>
                    } */}
                    
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