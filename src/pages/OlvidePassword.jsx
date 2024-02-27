import { useState } from 'react'
import { Link } from "react-router-dom"
import clienteAxios from '../config/clienteAxios'
import Alerta from '../components/Alerta'

const OlvidePassword = () => {

  const [correo, setCorreo] = useState('')
  const [alerta, setAlerta ] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const url = `/usuarios/olvide-password`;

      const { data } = await clienteAxios.post(url, { correo })

      console.log(data)
      setAlerta({
        msg: data.msg,
        error: false
      })
      
      return data
    } catch (error) {
      console.log(error.response.data.message)
      setAlerta({
        msg: error.response.data.message,
        error: true
      })
    }
      setTimeout(() => {
        setAlerta({})
      }, 5000);
  };

  

  const { msg } = alerta
  return (
    <>
        <h2 className="text-center capitalize text-4xl text-sky-800 font-[700]">Ingresa tu correo para Recuperar tu contraseña</h2>

        <div className=" rounded-lg">
        {msg && <Alerta alerta={alerta} />}

        </div>
      <div className=" my-5 bg-white shadow p-10 rounded-lg flex items-center justify-center" >
        <form onSubmit={handleSubmit} >
          
          <label className="block text-gray-500 mt-1 font-bold uppercase md:text-xl" htmlFor="correo">Correo</label>
          <input 
            autoComplete="off"
            id="correo"
            name="correo" 
            placeholder="Ingrese su Email" 
            className="w-full px-4 py-2 rounded-xl mt-1 mb-2 border bg-gray-100"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
          
          <button className="text-white font-bold uppercase bg-color-primario-nav w-full mt-2 p-3 rounded-md hover:bg-blue-900 transition-all">Enviar Instrucciones</button>
        </form>
      </div>

        <nav className='lg:flex lg:justify-between'>
          <Link to={"/authLayout/iniciar-sesion"} className='block text-center my-5 text-slate-500 uppercase text-sm'>
            ¿Ya tienes una cuenta? Inicia Sesión
          </Link>
          <Link to={"/authLayout/olvide-password"} className='block text-center my-5 text-slate-500 uppercase text-sm'>
            Olvide mi Password
          </Link>
        </nav>
    </>
  )
  
}

export default OlvidePassword