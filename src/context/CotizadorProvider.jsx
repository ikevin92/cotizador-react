/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';
import {
  calcularMarca,
  calcularPlan,
  formatearDinero,
  obtenerDiferenciaYear,
} from '../helpers';

const CotizadorContext = createContext();

const CotizadorProvider = ({ children }) => {
  const [datos, setDatos] = useState({
    marca: '',
    year: '',
    plan: '',
  });

  const [error, setError] = useState(null);
  const [resultado, setResultado] = useState(0);
  const [cargando, setCargando] = useState(false);

  const handleChangeDatos = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const cotizarSeguro = () => {
    setCargando(true);
    // una base
    let resultado = 2000;

    // Obtener diferencia de años
    const diferencia = obtenerDiferenciaYear(datos.year);

    // hay que restar el 3% por cada año
    resultado -= (diferencia * 3 * resultado) / 100;

    // Americano 15%
    // Europeo 30%
    // Asiático 5%
    resultado *= calcularMarca(datos.marca);

    // Básico 20%
    // Completo 50%
    resultado *= calcularPlan(datos.plan);

    // Formatear dinero
    resultado = formatearDinero(resultado);

    setTimeout(() => {
      setResultado(resultado);
      setCargando(false);
    }, 3000);
  };

  return (
    <CotizadorContext.Provider
      value={{
        datos,
        error,
        resultado,
        cargando,
        handleChangeDatos,
        setError,
        cotizarSeguro,
      }}
    >
      {children}
    </CotizadorContext.Provider>
  );
};

export { CotizadorProvider };

export default CotizadorContext;
