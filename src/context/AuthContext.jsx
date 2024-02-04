import { createContext, useEffect, useState  } from 'react';
import clienteAxios from '../config/clienteAxios';
//import Cookies from 'js-cookie'
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';


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