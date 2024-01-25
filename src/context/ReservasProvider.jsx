import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";

export const ReservasContext = createContext();

export const ReservasContextProvider = ( { children } ) => {

  const [ reservas, setReservas ] = useState([]);
  const [ alerta, setAlerta ] = useState({})
  const [ reservaById, setReservasByID ] = useState({})
  const [ loading, setLoading ] = useState(false)

  const { authUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {

    const obtenerReservasPorUsuario = async () => {

      const token = localStorage.getItem("token");
        //console.log(token)
          if(!token) {
            return
          }

      try {

          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
        };

          const { data } = await clienteAxios.get(`/reservas/getAllReservationsByUser` ,config)
          //console.log("Respuesta desde DATA: ",data)
          
          const reservasAlmacenada = data.reservas;
          console.log("Reserva Almacenada: ",reservasAlmacenada)
          const resultReservas = reservasAlmacenada
            .filter((reserva) => reserva.usuario._id === authUser.id)
            .map((reserva) => ({
              ...reserva,
              distanciaTotal: reserva.distanciaTotal, 
              totalTiempo: reserva.totalTiempo, // 
            }));

          
          setReservas(resultReservas);
          
        } catch (error) {
          console.log(error.response.data);
      }

    }
    obtenerReservasPorUsuario();

    return () => {
        setReservas({})
    };

  },[authUser, authUser.id])

  const submitReservas = async ( reservas  ) => {
    //console.log(reservas)
      try {
        const token = localStorage.getItem("token");
        //console.log(token)
        if(!token) {
          return
        }

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };


        const { data } = await clienteAxios.post('/reservas/crearReserva', reservas, config); 
        console.log(data);

        setReservas(data);
        
        const timer = setTimeout(() => {
          navigate("/reservas")
        }, 3000);

        return () => clearTimeout(timer)

      } catch (error) {
        console.error('Error al obtener las reservas:', error.response.data);
      }
  };


  const obtenerReservaById = async ( id ) => {

      setLoading(true)
      
      try {

        const token = localStorage.getItem("token");
        //console.log(token)
        if(!token) {
          return
        }

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };        

          const { data } = await clienteAxios.get(`/reservas/obtenerReservasPorId/${id}`, config);
          console.log("Reserva por ID: ", data );

          setReservasByID(data)

      } catch (error) {
        console.log(error.response)
      }

      setLoading(false)
  }

    const cerrarSesionReservas = () => {
        setReservas([]);
        setReservasByID({});
        setAlerta({});
    }

    return (
        <ReservasContext.Provider value={{
            reservas,
            setReservas,
            submitReservas,
            alerta,
            setAlerta,
            obtenerReservaById,
            setReservasByID,
            reservaById,
            loading,
            cerrarSesionReservas,
            
        }}>
            { children }
        </ReservasContext.Provider>
    )

};

ReservasContextProvider.propTypes = {
    children: PropTypes.object
}