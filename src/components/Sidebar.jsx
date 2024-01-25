import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

/**
 * The Sidebar component is a React component that displays a welcome message and a link to create a
 * new reservation.
 * @returns The Sidebar component is returning an aside element with a className of "md:w-80 lg:w-96
 * px-5 py-10 bg-slate-200 text-slate-900 md:text-lg". Inside the aside element, there is a paragraph
 * element that displays a welcome message with the user's name. Below the paragraph, there is a Link
 * component that links to "nueva-reserva"
 */
const Sidebar = () => {

  const { authUser } = useAuth();
  return (
    <aside className="md:w-80 lg:w-96 px-5 py-10 bg-slate-200 text-slate-900 md:text-lg">
      <p>Bienvenido <span className="font-bold">{authUser.nombre}</span> </p>

      <Link to={"nueva-reserva"} className="bg-cielo-celeste text-color-pantalla p-3 uppercase font-bold block mt-5 text-center rounded-lg">Nueva Reserva</Link>
    </aside>
  )
}

export default Sidebar