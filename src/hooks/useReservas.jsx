import { useContext } from 'react';
import { ReservasContext } from '../context/ReservasProvider';

export const useReservas = () => {

    return useContext(ReservasContext);
}