
import { createContext } from "react";

const CoordenadasContext = createContext({
  coordenadasIniciales: [],
  coordenadasFinales: [],
  setCoordenadasIniciales: () => {},
  setCoordenadasFinales: () => {},
});

export default CoordenadasContext;