import clienteAxios from "../config/clienteAxios";

// eslint-disable-next-line no-undef
const URL_API_REGISTER = `/usuarios/registrarse`;
const URL_API_LOGIN = `/usuarios/login`;

 export const registerRequest = async (nombre, correo, password, telefono) => {

    try {

        const { data } = await clienteAxios.post(URL_API_REGISTER, {
            nombre, correo, password, telefono });

        //console.log(data)
        return { success:true, message:data.message};

    } catch (error) {
        //console.log(error);
        if (error.response) {
        // El servidor respondió con un código de error
        //console.log(error.response.data.errors);
        return { success: false, errors: error.response.data.errors };
    }else if (error.request) {
        // La solicitud fue realizada pero no se recibió respuesta
        return { success: false, message: 'Error de conexión con el servidor' };
        } else {
        // Ocurrió un error durante la configuración de la solicitud
        return { success: false, message: 'Error al realizar la solicitud' };
        }
  }
};

export const loginRequest = async ( {correo, password} ) => {

    try {
        const response = await clienteAxios.post(URL_API_LOGIN, { correo, password }, );
        //console.log(response.data.otherDetails)
        return { success:true, data:response.data };
    
    } catch (error) {
        //console.log(error.response.data.message)
         if (error.response) {
        // El servidor respondió con un código de error
        //console.log(error.response.data.message);
        return { success: false, errors: error.response.data.message };
    }else if (error.request) {
        // La solicitud fue realizada pero no se recibió respuesta
        return { success: false, message: 'Error de conexión con el servidor' };
        } else {
        // Ocurrió un error durante la configuración de la solicitud
        return { success: false, message: 'Error al realizar la solicitud' };
        }
    }

}
