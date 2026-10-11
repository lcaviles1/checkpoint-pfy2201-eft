import { CATEGORIAS } from '../data/videojuegos.js';
import { normalizar } from './catalogo.js';

export function validarContacto({ nombre, email, mensaje }) {
  const errores = {};
  const nombreLimpio = nombre.trim();
  if (nombreLimpio.length < 2 || nombreLimpio.length > 80 || !/^[\p{L}\p{M}][\p{L}\p{M} .'-]*$/u.test(nombreLimpio)) {
    errores.nombre = 'Ingresa un nombre de 2 a 80 caracteres, usando letras.';
  }
  if (email.trim().length > 254 || !/^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/.test(email.trim())) {
    errores.email = 'Ingresa un correo válido, por ejemplo nombre@correo.cl.';
  }
  if (mensaje.trim().length < 10 || mensaje.trim().length > 1000) {
    errores.mensaje = 'Escribe un mensaje de 10 a 1000 caracteres.';
  }
  return errores;
}

export function validarNuevoJuego(datos, juegos) {
  const errores = {};
  if (datos.nombre.trim().length < 3 || datos.nombre.trim().length > 80) errores.nombre = 'El nombre debe tener entre 3 y 80 caracteres.';
  else if (juegos.some(j => normalizar(j.nombre) === normalizar(datos.nombre))) errores.nombre = 'Ya existe un videojuego con ese nombre.';
  if (!CATEGORIAS.includes(datos.categoria)) errores.categoria = 'Selecciona una categoría válida.';
  const precio = Number(datos.precio);
  if (!datos.precio.trim() || !Number.isSafeInteger(precio) || precio < 1 || precio > 9999999) errores.precio = 'Ingresa un precio entero entre $1 y $9.999.999.';
  if (datos.descripcion.trim().length < 10 || datos.descripcion.trim().length > 300) errores.descripcion = 'La descripción debe tener entre 10 y 300 caracteres.';
  return errores;
}
