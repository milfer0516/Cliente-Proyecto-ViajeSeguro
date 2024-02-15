import { useState, useEffect } from "react";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";
import Alerta from "./Alerta";
import { useReservas } from "../hooks/useReservas";

const FormularioReservas = () => {
    
    const [vehiculos, setVehiculos] = useState([]);
    const [ nuevaReserva, setNuevaReserva ] = useState({
        usuario: {},
        vehiculo: "",
        fechaInicio: "",
        fechaFin: "",
        horaReserva: "",
        destinoInicial: "",
        destinoFinal: "",
    });

    const { authUser } = useAuth();
    const { alerta, setAlerta, submitReservas } = useReservas();

    useEffect(() => {
        // Se realiza la solicitud a categorias para obtenerlas
        const obtenerVehiculos = async  () => {

            const token = localStorage.getItem("token")
            if(!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const response = await clienteAxios.get("/categorias/encontrarCategorias", config);
                console.log(response);
                setVehiculos(response.data.categoria);
                console.log(vehiculos);
                
            } catch (error) {
                console.log(error) 
            }
        }

        obtenerVehiculos()
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const camposVacios = Object.values(nuevaReserva).some(campo => campo === "" );

        if(camposVacios) {
            setAlerta({
                msg: "Todos los campos son abligatorios",
                error: true
            })
            return
        }

         await submitReservas(nuevaReserva);

         setAlerta({
            msg: "Reserva registrada con exito!",
            error: false
         })

    };
        
        
        const cerrarAlerta = () => {
            setAlerta({})
            setNuevaReserva({
            vehiculo: "",
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
                <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="vehiculo">Vehiculo</label>

                <select
                id="vehiculo" 
                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                onChange={(e) => setNuevaReserva({...nuevaReserva, vehiculo: e.target.value})}
                >
                    <option value="">Seleccione el tipo de vehiculo</option>
                    {vehiculos.map((vehiculo) => (
                        <option key={vehiculo._id} value={vehiculo._id}>
                            {vehiculo.nombreCategoria}
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
            <div className="mb-3">
                <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="origen">Destino Inicial</label>

                <input 
                type="text" 
                id="origen"
                name="origen"
                value={nuevaReserva.destinoInicial}
                onChange={(e) => setNuevaReserva({...nuevaReserva, destinoInicial: e.target.value})}
                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                placeholder="Ingrese su destino inicial" 
                />
            </div>
            <div className="mb-3">
                <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="destino">Destino Final</label>

                <input 
                type="text" 
                id="destino"
                name="destino"
                value={nuevaReserva.destinoFinal}
                onChange={(e) => setNuevaReserva({...nuevaReserva, destinoFinal: e.target.value})}
                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                placeholder="Ingrese su destino final" 
                />
            </div>

            <button type="submit" className="text-center w-full bg-color-primario-nav hover:bg-azul-oscuro text-white py-3 mt-2 uppercase rounded-md font-bold text-sm">Crear Reserva</button>
        </form>
    </div>
  )
}

export default FormularioReservas;