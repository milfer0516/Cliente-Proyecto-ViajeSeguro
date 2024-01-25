import FormularioReservas from "../components/FormularioReservas"

const NuevaReserva = () => {
  return (
    <> 
      <h1 className="text-4xl font-bold">Nueva Reserva</h1>
        <div className="mt-10 flex justify-center w-full">
          <FormularioReservas />
        </div>
    </>
  )
}

export default NuevaReserva