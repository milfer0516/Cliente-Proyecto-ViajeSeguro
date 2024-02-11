import { useState } from 'react'
import { MdClose } from 'react-icons/md';

const ModalPageInicio = () => {

    const [showModal, setShowModal] = useState(true);

    const handleClickClose = (e) => {
        e.preventDefault();
        //console.log("Click")
        setShowModal(false);
        //console.log(showModal)
    }
  return (
    <>
    { showModal && ( 

        <div className="z-50 fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-black bg-opacity-50">
            
        <div className="z-50 w-11/12 md:w-7/12 lg:w-8/12 p-2 rounded-md md:rounded-lg bg-zinc-800 opacity-80 text-white">
            <div className="mt-6 flex justify-end">
                <button 
                    onClick={handleClickClose}
                    className="bg-white p-3 rounded-[50%] relative text-zinc-900 font-bold -right-4 top-3 md:-right-5 md:-top-9">
                    {<MdClose className='w-3 h-3 md:w-6 md:h-6' />}
                </button>
            </div>
            <h3 className="text-center text-lg md:text-3xl font-bold uppercase text-gray-300">Bienvenidos a ViajeSeguro </h3>
            <p className="mt-1 p-2 md:p-4 text-[1rem] md:text-xl text-gray-300">Para que te lleves una buena experiencia en nuestro sitio web y tu interaccion con nuestro mapa de direcciones o lugares sigue los siguientes pasos: </p>
            <div className=' mt-1 ml-8 mb-3 w-10/12'>
                <ol className=' text-slate-300 text-[1rem] lg:text-xl'>
                    <li><span className='font-extrabold text-xl text-slate-100'>1.</span>  Si quieres usar tu ubicacion actual como referencia solo le das click al boton rojo y le das agregar con el boton verde para que la caja de texto lea las coordenadas
                    </li>
                    <li><span className='font-extrabold text-xl text-slate-100'>2.</span> Si quieres usar una ubicacion diferente, se debe digitar primero en el destino inicial luego agrega un lugar o direccion exacta y te va salir una lista das click en una direccion de la lista y le luego das click en el boton verde para ser agregada
                    </li>
                    <li><span className='font-extrabold text-xl text-slate-100'>3.</span> Si quieres hacer una nueva busqueda o agregar un destino inicial diferente debes dar click el boton resetear que es el de color amarillo y esperar que se borren los datos
                    </li>
                    <li><span className='font-extrabold text-xl text-slate-100'>4.</span> Si quieres ver tu ubicacion en el mapa debes darle click en el boton de gps que se encuentra al lado derecho de la pantalla
                    </li>
                </ol>
            </div>
        </div>
        
        </div>
    )}
    </>
  )
}

export default ModalPageInicio;