
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

const ConfirmarCuenta = () => {

  const [ alerta, setAlerta ] = useState({});
  //Estado para manejar si la cuenta se confirmó
  const [ cuentaConfirmada, setCuentaConfirmada ] = useState(false)
  

  const params = useParams(); // Para capturar los datos que vienen de la URL
  const { tokenId } = params;
  console.log(tokenId)
  
    const confirmarCuenta = async () => {
        try {
            const response = await clienteAxios.get(`/usuarios/confirmar/${tokenId}`);
            console.log(response.data);
            setAlerta({
                msg: response.data.message,
                error: false
            });
            setCuentaConfirmada(true);
        } catch (error) {
            console.log(error);
            setAlerta({
                msg: error.response.data.message,
                error: true
            });
        }
    };

    useEffect(() => {
      confirmarCuenta()
    },[tokenId])

  const cerrarAlerta = () => {
    setAlerta({})
  }

  const { msg } = alerta;
  return (
    <>
      <h2 className="text-center capitalize text-4xl text-sky-800 font-[700]">Confirma tu cuenta y solicita tus {''}
        <span className="text-slate-700">Reservas</span>
      </h2>

      <div className="mt-5 md:mt-20 shadow-2xl px-5 py-10 rounded-lg">
        {msg && <Alerta alerta={alerta} onCerrar={cerrarAlerta} />}

        {cuentaConfirmada && (
            <Link to={"/authLayout/iniciar-sesion"} className='block text-center my-5 text-slate-500 uppercase text-sm mt-2 bg-white py-3 rounded-lg'>
              Inicia Sesión
            </Link>
        )}
      </div>
    </>
  )
}

export default ConfirmarCuenta