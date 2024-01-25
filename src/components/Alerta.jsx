/* eslint-disable react/prop-types */
import { useEffect } from "react";

const Alerta = ( { alerta, onCerrar } ) => {

  useEffect(() => {

    const timer = setTimeout(() => {
      onCerrar()
    }, 5000);

    return () => clearTimeout(timer);
  },[onCerrar]);

  return (

    <div className={`${alerta.error ? 'from-red-400 to-red-600' : 'from-sky-400 to-sky-600'} text-center p-3 rounded-lg uppercase text-white bg-gradient-to-br font-bold text-sm my-5`}>       
        { alerta.msg }
    </div>
    
  )
}


export default Alerta