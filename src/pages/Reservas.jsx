import { useReservas } from "../hooks/useReservas";
import useAuth from "../hooks/useAuth";
import MostrarReservas from "../components/MostrarReservas";
import { useEffect } from "react";

const Reservas = () => {

  const { reservas, setReservas } = useReservas()
  const { authUser } = useAuth()

  
  useEffect(() => {

    if(reservas) {
      setReservas(reservas)
    }

  },[reservas, setReservas])
  

  return (

    <> 
      <h1 className="text-4xl font-bold">Tus Reservas {authUser.nombre}</h1>
      <div className=" bg-white mt-10 rounded-lg ">
        {reservas.length > 0 ? (
          <section>
            <div className="flex justify-end text-sm">
              <h3 className="text-center text-gray-600 pt-3 pb-1 px-3 border-b"><span className="font-bold">{authUser.nombre}</span> Haz solicitado en total <span className="font-bold">{reservas.length} Reservas</span></h3>
            </div>
            <div>
              {reservas.map( reserva => (
                <MostrarReservas 
                  key={reserva._id} 
                  reserva={reserva}
                />
              ))}
            </div>
          </section>
        )
        : <p>No hay reservas</p>
        }
      </div>
    </>
  )
}

export default Reservas