
import { Outlet, Navigate, } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
//import { useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';


const RutaProtegida = () => {

  const { authUser, loading } = useAuth();

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
