import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useReservas } from "../hooks/useReservas";

const ReservaById = () => {

    const { reservaById, obtenerReservaById, loadind } = useReservas();
    const params = useParams();
    const { id } = params

    useEffect(() => {
        const fetchData = async () => {
            await obtenerReservaById(id);
        };
     fetchData();
    // eslint-disable-next-line
    }, [id]); // Solo utiliza id y obtenerReservaById como dependencias

    const { destinoFinal } = reservaById
    
    return (
        loadind ?  (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                <h3 className="text-white">Cargando.....</h3>
            </div>
        ):(
            <div>
                <h2 className="text-gray-800 font-bold text-3xl font-fuente-principal font-roboto-bold-700">Reserva {destinoFinal}</h2>
            </div>
        )
    )
}

export default ReservaById;