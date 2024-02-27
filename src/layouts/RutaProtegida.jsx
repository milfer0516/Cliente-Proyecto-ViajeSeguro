
import { Outlet, Navigate, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { jwtDecode } from 'jwt-decode';


const RutaProtegida = () => {

  const { authUser, loading } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {

    const token = localStorage.getItem("token")

    if(!token) {
      return navigate("/authLayout/iniciar-sesion")
    }

    const decodeToken = jwtDecode(token);
    const { exp } = decodeToken;
    const tokenExperation = exp * 1000;
    const currentTime = new Date().getTime();

    if(tokenExperation < currentTime ) {
      return navigate("/authLayout/iniciar-sesion")
    }

  },[navigate])

  if(loading) return "Cargando......";
  
  return (
    <>
      { authUser.id ? ( 
        <div className=''>
          <Header />

          <div className='md:flex md:min-h-screen '>
            <Sidebar />

            <main className='flex-1 p-10 bg-slate-200'>
              <Outlet />
            </main>

          </div>
        </div>
      ) 
      : <Navigate to={"/authLayout/iniciar-sesion"} />}
    </>
  );
};

export default RutaProtegida;
