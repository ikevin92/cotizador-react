import { MARCA_DESCUENTO } from '../constants';

export const obtenerDiferenciaYear = (year) => new Date().getFullYear() - year;

export const calcularMarca = (marca) => MARCA_DESCUENTO[marca];

export const calcularPlan = (plan) => (plan === '1' ? 1.2 : 1.5);

export const formatearDinero = (cantidad = 0) => {
  return cantidad.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};
