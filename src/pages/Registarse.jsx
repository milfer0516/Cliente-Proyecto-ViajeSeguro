import { useState } from "react"
import {registerRequest}  from '../api/authRegistro'
import {  Link } from "react-router-dom";

import Alerta from "../components/Alerta";

const Registarse = () => {

  //const navigate = useNavigate();

  const [ nombre, setNombre ] = useState('');
  const [ correo, setCorreo ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ repetirpassword, setRepetirPassword ] = useState('');
  const [ telefono, setTelefono ] = useState('');
  const [ alerta, setAlerta] = useState({})
 

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Enviar la solicitud de registro
    const response = await registerRequest(nombre, correo, password, telefono);

     // Limpiar los campos después de un registro exitoso
    setNombre('');
    setCorreo('');
    setPassword('');
    setRepetirPassword('')
    setTelefono('');
      
       // Otras acciones después de un registro exitoso (por ejemplo, redireccionar a otra página)
       //console.log(response)
       //Validar que las contraseñas sean iguales
       if(password !== repetirpassword) {
         setAlerta({
           msg: "Las contraseñas deben ser iguales",
           error: true
          })
          return
       }
      
        if(response.success) {
          
          setAlerta({
            msg: response.message,
            error: false
          })
          return
        } else if(response.errors) {
          //console.log(response.errors);
          const validationExpress = response.errors.map(error => {
            return {
              field: error.path,
              message: error.msg
            }
          })
          
          validationExpress.forEach(error => {
            console.log(`Mensaje: ${error.message}`)
            setAlerta({
              msg: error.message,
              error: true
            })
          })
        }
        
  };

  const cerrarAlerta = () => {
    setAlerta({})
  }

  const { msg } = alerta

  return (
    <>
        <h2 className="text-center capitalize text-4xl text-sky-800 font-[700] mt-2">Crea tu cuenta y realiza tus {''}
          <span className="text-slate-700">Reservas</span>
        </h2>
        
        {msg && <Alerta alerta={alerta} onCerrar={cerrarAlerta} />}
        
      <div className=" my-5 bg-white shadow p-10 rounded-lg" >
        
        <form onSubmit={handleSubmit}>
          <label className="block text-gray-500 mt-1 font-bold uppercase md:text-xl" htmlFor="nombre">Nombre</label>
          <input 
            autoComplete="off"
            id="nombre"
            type="text" 
            name="nombre" 
            placeholder="Ingrese su Nombre" 
            className="w-full px-4 py-2 rounded-xl mt-1 mb-2 border bg-gray-100"
            value={nombre}
            onChange={(e) => setNombre(e.target.value) }
          />
          <label className="block text-gray-500 mt-1 font-bold uppercase md:text-xl" htmlFor="correo">Correo</label>
          <input 
            autoComplete="off" 
            type="email"
            id="correo"
            name="correo" 
            placeholder="Ingrese su Email" 
            className="w-full px-4 py-2 rounded-xl mt-1 mb-2 border bg-gray-100"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
          <label className="block text-gray-500 mt-1 font-bold uppercase md:text-xl" htmlFor="password">Contraseña</label>
          <input 
            autoComplete="new-password"
            id="password" 
            type="password" 
            name="password" 
            placeholder="Contraseña" 
            className="w-full px-4 py-2 rounded-xl mt-1 mb-2 border bg-gray-100"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
          <label className="block text-gray-500 mt-1 font-bold uppercase md:text-xl" htmlFor="password2">Repetir Contraseña</label>
          <input 
            autoComplete="new-password"
            id="password2" 
            type="password" 
            name="password" 
            placeholder="Repetir Contraseña" 
            className="w-full px-4 py-2 rounded-xl mt-1 mb-2 border bg-gray-100"
            value={repetirpassword}
            onChange={(e) => setRepetirPassword(e.target.value)} 
          />
          <label className="block text-gray-500 mt-1 font-bold uppercase md:text-xl" htmlFor="telefono">Teléfono</label>
          <input 
            autoComplete="off" 
            id="telefono"
            type="tel"
            name="telefono" 
            placeholder="telefono" 
            className="w-full px-4 py-2 rounded-xl mt-1 mb-2 border bg-gray-100"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)} 
          />
          <button className="text-white font-bold uppercase bg-color-primario-nav w-full mt-2 p-3 rounded-md hover:bg-azul-oscuro transition-all">Crear Cuenta</button>
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

export default Registarse