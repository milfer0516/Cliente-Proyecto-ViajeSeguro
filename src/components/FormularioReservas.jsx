/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { FaHandPointer } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";
import Alerta from "./Alerta";
import { useReservas } from "../hooks/useReservas";
import AddressFinalDestination from "../api/AddressFinalDestination";
import mapboxgl from 'mapbox-gl';
import getTimeDistance from "../config/getTimeDistance";

mapboxgl.accessToken = import.meta.env.VITE_ACCESS_TOKEN_MAPBOX;


const FormularioReservas = (  ) => {
       
    const [categorias, setCategorias] = useState([]);
    // Separate state variables for each coordinate
    const [ getCoordsIniciales, setGetCoordsIniciales ] = useState([]);
    const [ getCoordsFinales, setGetCoordsFinales ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true)
    const [ id, setId ] = useState(null)
    const [ nuevaReserva, setNuevaReserva ] = useState({
        id: id,
        usuario: {},
        categoria: {},
        fechaInicio: "",
        fechaFin: "",
        horaReserva: "",
        destinoInicial: '',
        destinoFinal: '',
        coordenadasInicio: [],
        coordenadasFinales: [],
        tiempoRecorrido: [],
        distancia:[]
    });

    const params  = useParams();
    const { authUser } = useAuth();
    const { alerta, setAlerta, submitReservas, 
            reservaById, newReservation, updateReservation } = useReservas();

    
    /* The above code is a `useEffect` hook in a React component. It is triggered when either
    `params.id` or `reservaById` changes. Inside the `useEffect`, it sets the `id` state with
    `reservaById._id` value and then conditionally updates the `nuevaReserva` state based on the
    values of `reservaById`. If `params.id` is truthy, it extracts specific properties from
    `reservaById` and assigns them to the `nuevaReserva` state object. */
    useEffect(() => {
        //console.log(params)

        if( params.id && reservaById.usuario ) {
            //console.log(reservaById)
            setId(reservaById._id)
            setNuevaReserva({
                ...nuevaReserva,
                id: reservaById._id,
                usuario: reservaById.usuario,
                categoria: reservaById.categoria,
                fechaInicio: reservaById.fechaInicio?.split('T')[0],
                fechaFin: reservaById.fechaInicio?.split('T')[0],
                horaReserva: reservaById.horaReserva,
                destinoInicial: reservaById.destinoInicial,
                destinoFinal: reservaById.destinoFinal,
                tiempoRecorrido: reservaById.tiempoRecorrido,
                distancia: reservaById.distancia
            });
            
        } 

    },[ params ])

    useEffect(() => {
    // Se realiza la solicitud a categorias para obtenerlas
    const obtenerCategorias = async  () => {

        const token = localStorage.getItem("token")
        if(!token) return;

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const {data} = await clienteAxios.get("/categorias/encontrarCategorias", config);
            
            //console.log(data.categoria)
            setCategorias(data.categoria);
            
        } catch (error) {
            console.log(error) 
        }
    }

    obtenerCategorias()

    },[]);

    useEffect(() => {
        const getRoutesData = async () => {
            try {
                if (!getCoordsIniciales.length || !getCoordsFinales.length) return;
                await fetchRoutes();
            } catch (error) {
                console.log(error);
            }
        };

        getRoutesData();
    }, [getCoordsIniciales, getCoordsFinales]);

    /* const handleChange = (e) => {
        setNuevaReserva({...nuevaReserva, categoria: e.target.value});
        
    }; */

    const fetchRoutes = async () => {

        if(!getCoordsIniciales || !getCoordsFinales) return
        const [longitudeStart, latitudeStart] = getCoordsIniciales;
        const [longitudeEnd, latitudeEnd] = getCoordsFinales;

        if(longitudeStart, latitudeStart && longitudeEnd, latitudeEnd) {
                const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${longitudeStart},${latitudeStart};${longitudeEnd},${latitudeEnd}?annotations=maxspeed&overview=full&geometries=geojson&access_token=${mapboxgl.accessToken}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            //console.log(data)
            if(await data.routes[0].distance && await data.routes[0].duration) {
                const resultDistance = Number(Math.ceil(await data.routes[0].distance / 1000).toFixed(2));
                const duration = data.routes[0].duration 
                const { horas, minutos } = getTimeDistance(duration);

                setNuevaReserva({
                    ...nuevaReserva,
                    distancia: resultDistance,
                    tiempoRecorrido: [ horas, minutos ]
                });

                console.log([horas, minutos]);
                console.log(resultDistance)
                
            }
        } catch (error) {
            console.log(error)
        }
        }
        
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        const camposVacios = Object.values(nuevaReserva).some(campo => campo === "" );

        if(camposVacios) {
            setAlerta({
                msg: "Todos los campos son abligatorios",
                error: true
            })
            return
        }

        // Registrar nueva reserva
        await submitReservas(nuevaReserva, id);

        if(newReservation) {
            setAlerta({
            msg: "Reserva solicitada con exito!",
            error: false
            });
        } 
        if( updateReservation ) {
            setAlerta({
            msg: "Reservas Actualizada Correctamente!",
            error: false
            });
        }

        setNuevaReserva({
            categoria: {},
            fechaInicio: "",
            fechaFin: "",
            horaReserva: "",
            destinoInicial: '',
            destinoFinal: '',
            coordenadasInicio: [],
            coordenadasFinales: [],
        });
        
    };


    const handleSelectPlace = (place, label) => {
        if (label === "destinoInicial") {
            setIsLoading(false);
            setNuevaReserva({
                ...nuevaReserva,
                destinoInicial: place,
            });
        } else if (label === "destinoFinal") {
            setIsLoading(false);
            setNuevaReserva({
            ...nuevaReserva,
            destinoFinal: place,
            });
        } else {
            console.warn(`Etiqueta no válida: ${label}`);
        }
        
    };

    const handleInputDestinoInicial = async (coordinates) => {
        // console.log(coordinates)
        const [longitude, latitude] = await coordinates;
        setGetCoordsIniciales([longitude, latitude]);
        setNuevaReserva({ ...nuevaReserva, coordenadasInicio: [ longitude, latitude  ]});
    };

    const handleInputDestinoFinal = async (coordinates) => {
        const [longitude, latitude] = await coordinates;
        setGetCoordsFinales([longitude, latitude]);
        setNuevaReserva({ ...nuevaReserva, coordenadasFinales: [ longitude, latitude  ]});
    };
        
    const cerrarAlerta = () => {
        setAlerta({})
        setNuevaReserva({
        categoria: "",
        fechaInicio: "",
        fechaFin: "",
        horaReserva: "",
        destinoInicial: "",
        destinoFinal: ""
        })
        
    };
    const { msg } = alerta;
    

  return (
    <div className="">
        <form onSubmit={handleSubmit}
        className="bg-white py-12 px-5 w-[22rem] lg:w-[35rem] rounded-lg shadow-sm">

            {msg && <Alerta alerta={alerta} onCerrar={cerrarAlerta} />}

            <div className="mb-3">
                <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="usuario">Usuario</label>

                <input 
                    type="text" 
                    value={authUser.nombre}
                    onChange={(e) => setNuevaReserva({...nuevaReserva, usuario: e.target.value})}
                    id="usuario"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder={authUser ? authUser.nombre : ""}
                />
            </div>
            <div className="mb-3">
                <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="categorias">
                Categoria
                </label>
                <select
                id="categorias"
                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                onChange={(e) => setNuevaReserva({...nuevaReserva, categoria: e.target.value})}
                >
                <option value={""}>Seleccione el tipo de vehiculo</option>
                {categorias.map((categoria, index) => (
                    <option
                    key={index}
                    value={categoria._id}
                    >
                    {categoria.nombreCategoria}
                    </option>
                ))}
                </select>
            </div>
            <div className="mb-3">
                <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="fecha-inicio">Fecha Inicio</label>

                <input 
                type="date" 
                id="fecha-inicio"
                value={nuevaReserva.fechaInicio}
                onChange={(e) => setNuevaReserva({...nuevaReserva, fechaInicio: e.target.value})}
                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                />
            </div>
            <div className="mb-3">
                <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="fecha-fin">Fecha Fin</label>

                <input 
                type="date" 
                id="fecha-fin"
                value={nuevaReserva.fechaFin}
                onChange={(e) => setNuevaReserva({...nuevaReserva, fechaFin: e.target.value})}
                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                />
            </div>
            <div className="mb-3">
                <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="hora-reserva">Hora Reserva</label>        

                <input 
                type="time" 
                id="hora-reserva"
                name="hora-reserva"
                value={nuevaReserva.horaReserva}
                onChange={(e) => setNuevaReserva({...nuevaReserva, horaReserva: e.target.value})}
                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                placeholder="Nombre del Usuario" 
                />
            </div>
            
            <div className="mb-3 ">
                <label 

                className="text-gray-700 uppercase font-bold text-sm" htmlFor="destinoInicial"> Destino Inicial </label> 
                <input 
                type="text" 
                id="destinoInicial"
                name="destinoInicial"
                value={nuevaReserva.destinoInicial}
                onChange={(e) => setNuevaReserva({...nuevaReserva, destinoInicial: e.target.value})}
                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                placeholder="Ingrese su destino inicial"
              
                 />
                <p className="relative left-[28rem] flex gap-1 bottom-8 cursor-pointer"
                 >
                  {<FaHandPointer className="w-6 h-6 bg-azul-oscuro text-white rounded-md" />}  
                </p>
                
                <AddressFinalDestination 
                query={nuevaReserva.destinoInicial}
                onSelectPlace={(place) => handleSelectPlace(place, "destinoInicial")}
                getCoordinates={handleInputDestinoInicial}
                />
            </div>

            <div className="mb-3">
                <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="destinoFinal">Destino Final</label>

                <input 
                type="text" 
                id="destinoFinal"
                name="destinoFinal"
                value={nuevaReserva.destinoFinal}
                onChange={(e) => setNuevaReserva({...nuevaReserva, destinoFinal: e.target.value})}
                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                placeholder="Ingrese su destino final" 
                
                />
                {isLoading}
                <AddressFinalDestination 
                query={nuevaReserva.destinoFinal}
                onSelectPlace={(place) => handleSelectPlace(place, "destinoFinal")}
                getCoordinates={handleInputDestinoFinal}
                /> 
                
            </div>
                    
            <input 
            type="submit" 
            value={ reservaById._id && id ? 'Actualizar Reserva' : 'Solicitar Reserva'  }
            className="text-center w-full bg-color-primario-nav hover:bg-azul-oscuro text-white py-3 mt-2 uppercase rounded-md font-bold text-sm cursor-pointer" /> 
        </form>
        
    </div>
  )
}

export default FormularioReservas;
