import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";

export const ReservasContext = createContext();

export const ReservasContextProvider = ( { children } ) => {

  const [ reservas, setReservas ] = useState([]);
  const [ alerta, setAlerta ] = useState({})
  const [ reservaById, setReservasByID ] = useState({});
  const [ updateReserva, setUpdateReserva ] = useState({});
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
          //console.log(data)
          const reservasAlmacenada = data.reservas;
          //console.log("Reserva Almacenada: ",reservasAlmacenada)
          
          const resultReservas = reservasAlmacenada
            .filter((reserva) => reserva.usuario._id === authUser.id);

          setReservas(resultReservas);
          
          
        } catch (error) {
          console.log(error.response.data);
          return []
      }

    }
    obtenerReservasPorUsuario();


  },[authUser._id, authUser.id])

  const submitReservas = async ( reserva ) => {
    //console.log(reserva)
    if(reserva.id) {
      await updateReservation(reserva);
    } else {
      await newReservation(reserva);
    }
     
  };

  // Funcion para update Proyect
  const updateReservation = async ( reserva ) => {
    //console.log('Editando......')

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

        const {data} = await clienteAxios.put(`/reservas/actualizarReserva/${reserva.id}`, reserva , config)
        //console.log(updateReservation);
        
         if (data) {
          setReservas((prevReservas) =>
            prevReservas.map((stateReserva) =>
              stateReserva._id === data._id ? data : stateReserva
            )
          );

          setAlerta({
            msg: 'Reserva actualizada correctamente',
            error: false

          })

          const timer = setTimeout(() => {
            setAlerta({});
            navigate("/reservas");
          }, 3000);

          return () => clearTimeout(timer);
        }
    } catch (error) {
      console.log(error)
    }
  }

  // Funcion para new Proyect
  const newReservation = async reserva => {
    //console.log('Creando Nuevo......')

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


        const { data } = await clienteAxios.post('/reservas/crearReserva', reserva, config); 

        //console.log(data);
        setReservas({...reserva , data});

        setAlerta({
            msg: 'Reserva actualizada correctamente',
            error: false,
          })
        
        const timer = setTimeout(() => {
          setAlerta({});
          navigate("/reservas")
        }, 3000);

        return () => clearTimeout(timer)

      // eslint-disable-next-line no-unreachable
      } catch (error) {
        console.error('Error al obtener las reservas:', error.response.data);
      }
     
  }

  const obtenerReservaById = async ( id ) => {
      //console.log(id)
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
          //console.log("Reserva por ID: ", data );
          setReservasByID(data);

      } catch (error) {
        console.log(error.response)
      }

      setLoading(false)
  };

  const handleModalUpdateReserva = ( reserva ) => {
    //console.log(reserva);
    setUpdateReserva(reserva);
    //console.log(updateReserva)
  }

  const deleteReservation = async (id) => {
    console.log("Eliminado... ", id );

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

        const { data } = await clienteAxios.delete(`reservas/eliminarRerserva/${id}`, config); 
        console.log(data)
        setAlerta({
          msg: data.message,
          error: false
        });
        
        navigate("/reservas")
        
      } catch (error) {
        console.log(error)
      }
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
            handleModalUpdateReserva,
            updateReserva,
            setReservasByID,
            reservaById,
            loading,
            cerrarSesionReservas,
            deleteReservation
        }}>
            { children }
        </ReservasContext.Provider>
    )

};

ReservasContextProvider.propTypes = {
    children: PropTypes.object
}