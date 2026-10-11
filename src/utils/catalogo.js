import { CATEGORIAS, PORTADAS } from '../data/videojuegos.js';

export const normalizar = (texto) => String(texto).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
export const formatoPrecio = (valor) => new Intl.NumberFormat('es-CL', {
  style: 'currency', currency: 'CLP', maximumFractionDigits: 0
}).format(valor);

// Las operaciones devuelven arreglos nuevos; nunca modifican el estado original.
export function filtrarJuegos(juegos, categoria, busqueda, orden) {
  const consulta = normalizar(busqueda);
  const resultado = juegos.filter(juego =>
    (categoria === 'Todos' || juego.categoria === categoria) && normalizar(juego.nombre).includes(consulta));
  if (orden === 'precio-asc') resultado.sort((a, b) => a.precio - b.precio);
  if (orden === 'precio-desc') resultado.sort((a, b) => b.precio - a.precio);
  if (orden === 'nombre') resultado.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
  return resultado;
}

export function esJuegoValido(juego) {
  return juego && typeof juego.id === 'string' && juego.id.length > 0 &&
    typeof juego.nombre === 'string' && juego.nombre.trim().length >= 3 && juego.nombre.length <= 80 &&
    CATEGORIAS.includes(juego.categoria) && Number.isSafeInteger(juego.precio) &&
    juego.precio > 0 && juego.precio <= 9999999 &&
    typeof juego.descripcion === 'string' && juego.descripcion.trim().length >= 10 && juego.descripcion.length <= 300 &&
    Object.values(PORTADAS).includes(juego.imagen) && juego.plataforma === 'PC';
}

export function cargarCatalogo(almacenamiento, iniciales) {
  try {
    const texto = almacenamiento.getItem('checkpoint-catalogo-v1');
    if (texto === null) return iniciales;
    const datos = JSON.parse(texto);
    if (!Array.isArray(datos) || !datos.every(esJuegoValido) || new Set(datos.map(j => j.id)).size !== datos.length) return iniciales;
    return datos; // Un catálogo vacío también es un estado válido.
  } catch { return iniciales; }
}
