import PropTypes from 'prop-types';
import { createContext, useEffect, useState  } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
//import Cookies from 'js-cookie'

// Contexto
export const AuthContext = createContext();

// Proveedor del contexto
export const AuthContextProvider = ({ children }) => {
    
    const [ authUser, setAuthUser ] = useState({})
    const [ loading, setLoading ] = useState(true)

    const navigate = useNavigate();

    useEffect(() => {
        const authencatedUser = async () => {
            const token = localStorage.getItem("token")
            if(!token) {
                setLoading(false)
                return
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {

                const { data } = await clienteAxios.get("/usuarios/perfil-usuario", config)
                setAuthUser(data);

                navigate("/reservas");
                
            } catch (error) {
                console.log(error)
                setAuthUser({})
            }

            setLoading(false)

            //Decodificar token para obtener la fecha expiración
            const decodeToken = jwtDecode(token);
            const { exp } = decodeToken;
            const tokenExperation = exp * 1000;

            //Calcular el tiempo restante hasta que el token expire
            const currentTime = new Date().getTime();
            const timeLeft = tokenExperation - currentTime;

            // Convertir el tiempo restante a horas y minutos
            const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60)); // Convertir milisegundos a horas
            const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

            console.log(`"Tiempo restante hasta que el token expire: "es Hora ${hoursLeft}-${minutesLeft} Minutos`)
        }
        authencatedUser()
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const cerrarSesionAuth = () => {
        setAuthUser({})
    }

  return (
    <AuthContext.Provider value={{ 
        authUser,
        setAuthUser,
        loading,
        cerrarSesionAuth
     }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
    children: PropTypes.object
}