import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Alerta from '../components/Alerta';
import { loginRequest } from '../api/authRegistro';
import useAuth from '../hooks/useAuth';



const IniciarSesion = () => {

  const [ credentials, setCredentials ] = useState({
    correo: "",
    password: ""
  });
  const [ alerta, setAlerta ] = useState({})

  const navigate = useNavigate()

  const {  setAuthUser } = useAuth();
  //console.log(authUser)

  const handleChange = (e) => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value}))
  }
 
  const handleSubmit = async (e) => {
    e.preventDefault();

      const response = await loginRequest(credentials);
      //console.log(response)
      if(response.errors) 
       return setAlerta({
          msg: response.errors,
          error: true
        })
      if(response.data)  {
        localStorage.setItem("token", response.data.token);
        setAuthUser(response.data)
        navigate("/reservas");
      } 
  };

  const cerrarAlerta = () =>  {
    setAlerta({})
  }

  const { msg } = alerta

  return (
    <>

      <h2 className="text-center capitalize text-4xl text-sky-800 font-[700]">Inicia sesion y realiza tus {''}
      <span className="text-slate-700">Reservas</span>
      </h2>

      {msg && <Alerta alerta={alerta} onCerrar={cerrarAlerta} />}
        
      <div className="my-5 bg-cielo-celeste p-10 rounded-lg" >
        <form >
          <label className=" text-gray-700 mt-1 font-bold uppercase md:text-xl" htmlFor="correo">Correo</label>
          <input 
            autoComplete="off"
            id="correo"
            type="email" 
            name="correo" 
            placeholder="Ingrese su correo electronico" 
            className="w-full p-3 mt-3 rounded-xl border bg-gray-100"
            onChange={ handleChange }
            
          />
          <label className="block text-gray-700 font-bold uppercase mt-2 md:text-xl" htmlFor="password">Contraseña</label>
          <input 
            autoComplete="new-password" 
            type="password"
            id="password"
            name="password" 
            placeholder="Ingrese su contraseña" 
            className="w-full p-3 mt-3 rounded-xl border bg-gray-100"
            onChange={ handleChange }
          />
          
          <button onClick={handleSubmit} className="text-white font-bold uppercase bg-color-primario-nav w-full mt-3 p-3 rounded-md hover:bg-azul-oscuro transition-all">Ingresar</button>
        </form>
      </div>

      <nav className='lg:flex lg:justify-between'>
        <Link to={"/authLayout/registrarse"} className='block text-center my-5 text-slate-500 uppercase text-sm'>
          ¿No tienes una cuenta? Registrate
        </Link>
        <Link to={"/authLayout/olvide-password"} className='block text-center my-5 text-slate-500 uppercase text-sm'>
          Olvide mi Password
        </Link>
      </nav>
  
  </>
  )
}

export default IniciarSesion