import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alerta";

const NuevoPassword = () => {

  const params = useParams();
  const { token } = params;

  const [password, setPassword ] = useState('');
  const [ tokenValido, setTokenValido ] = useState(false)
  const [ alerta, setAlerta ] = useState(false);
  const [ passwordModificado, setPasswordModificado ] = useState(false);

  useEffect(() => {

    const verificarToken = async ( ) => {
       try {
        
        const url = `/usuarios/olvide-password/${token}`
        await clienteAxios.get(`${url}`);

        setTokenValido(true)

       } catch (error) {
        //console.log(error.response);
        setAlerta({
          msg: error.response.data.message,
          error: true
        })
       }
    }

    verificarToken()

  },[ token ])

  const habdleSubmit = async (e) => {
      e.preventDefault();

      if(password.length < 6) {
        setAlerta({
          msg: "La contraseña debe teber mas de 6 caracteres",
          error: true
        })
        setTimeout(() => {
          setAlerta({})
        }, 5000);

        setPassword('')

        return
      }

      try {
        
        const url = `/usuarios/olvide-password/${token}`

        const { data } = await clienteAxios.post(`${url}`, {password});
        
        setAlerta({
          msg: data.msg,
          error: false
        })

        setTimeout(() => {
          setAlerta({})
        }, 5000);
        setPasswordModificado(true);

      } catch (error) {
        console.log(error.response);
        setAlerta({
          msg: error.response.data.message
        })
      }
  }

  const { msg } = alerta
  return (
    <>
        <h2 className="text-center capitalize text-4xl text-sky-800 font-[700]">Modifica tu contraseña y no pierdas tus {''}
        <span className="text-slate-700">Reservas</span>
        </h2>
        { msg && <Alerta alerta={alerta}/> }

        {tokenValido && (
            <div className=" my-5 bg-white shadow p-10 rounded-lg flex items-center justify-center" >

              <form onSubmit={habdleSubmit}>
                
                <label className="block text-gray-500 mt-1 font-bold uppercase md:text-xl" htmlFor="password">Contraseña</label>
                <input 
                  autoComplete="off" 
                  type="password"
                  id="password"
                  name="password" 
                  placeholder="Ingrese tu nueva contraseña" 
                  className="w-full px-4 py-2 rounded-xl mt-1 mb-2 border bg-gray-100"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}

                />
                
                <button className="text-white font-bold uppercase bg-color-primario-nav w-full mt-2 p-3 rounded-md hover:bg-blue-900 transition-all">Guardar nueva contraeña</button>
              </form>

            </div>  
        )}   

        {passwordModificado && (
          <Link to={"/authLayout/iniciar-sesion"} className='block text-center my-5 text-slate-500 uppercase text-sm mt-2 bg-white py-3 rounded-lg'>
              Inicia Sesión
          </Link>
        )}
    </>
  )
}

export default NuevoPassword