import test from 'node:test';
import assert from 'node:assert/strict';
import { juegosIniciales } from '../src/data/videojuegos.js';
import { cargarCatalogo, esJuegoValido, filtrarJuegos, normalizar } from '../src/utils/catalogo.js';
import { validarContacto, validarNuevoJuego } from '../src/utils/validacion.js';

const contacto = { nombre: 'Lucas Avilés', email: 'lucas@example.cl', mensaje: 'Quisiera conocer más detalles del catálogo.' };
const nuevo = { nombre: 'Aventura del Sur', categoria: 'Aventura', precio: '15990', descripcion: 'Explora montañas y descubre nuevos senderos.' };

test('el catálogo contiene ocho objetos válidos con identificadores únicos', () => {
  assert.equal(juegosIniciales.length, 8);
  assert.ok(juegosIniciales.every(esJuegoValido));
  assert.equal(new Set(juegosIniciales.map(j => j.id)).size, 8);
});
test('el filtro combina categoría y búsqueda sin distinguir acentos', () => {
  assert.deepEqual(filtrarJuegos(juegosIniciales, 'Estrategia', 'TACTICA', 'destacados').map(j => j.id), ['tactic']);
  assert.equal(filtrarJuegos(juegosIniciales, 'Carreras', 'bosque', 'destacados').length, 0);
  assert.equal(filtrarJuegos(juegosIniciales, 'Todos', '', 'destacados').length, 8);
});
test('la ordenación por precio no modifica el orden del catálogo fuente', () => {
  const ids = juegosIniciales.map(j => j.id);
  const asc = filtrarJuegos(juegosIniciales, 'Todos', '', 'precio-asc');
  const desc = filtrarJuegos(juegosIniciales, 'Todos', '', 'precio-desc');
  assert.equal(asc[0].id, 'island');
  assert.equal(desc[0].id, 'astral');
  assert.deepEqual(juegosIniciales.map(j => j.id), ids);
});
test('los datos de contacto correctos permiten continuar', () => {
  assert.deepEqual(validarContacto(contacto), {});
  assert.deepEqual(validarContacto({ ...contacto, nombre: "Ana María O'Connor" }), {});
});
test('el contacto rechaza campos vacíos, espacios y formatos inválidos', () => {
  for (const datos of [{ nombre: '', email: '', mensaje: '' }, { nombre: '  ', email: 'correo@@dominio.cl', mensaje: '   ' }]) {
    assert.deepEqual(Object.keys(validarContacto(datos)), ['nombre', 'email', 'mensaje']);
  }
  for (const email of ['a@b', '@b.cl', 'a@.cl', 'a b@correo.cl', 'a@b..cl']) assert.ok(validarContacto({ ...contacto, email }).email);
  assert.ok(validarContacto({ ...contacto, nombre: '12345' }).nombre);
});
test('se aplican los límites de longitud del contacto', () => {
  assert.ok(validarContacto({ ...contacto, mensaje: '123456789' }).mensaje);
  assert.equal(validarContacto({ ...contacto, mensaje: '1234567890' }).mensaje, undefined);
  assert.ok(validarContacto({ ...contacto, mensaje: 'a'.repeat(1001) }).mensaje);
  assert.ok(validarContacto({ ...contacto, nombre: 'A'.repeat(81) }).nombre);
});
test('la gestión permite un juego válido y rechaza duplicados con acentos', () => {
  assert.deepEqual(validarNuevoJuego(nuevo, juegosIniciales), {});
  assert.ok(validarNuevoJuego({ ...nuevo, nombre: '  tactica cero  ' }, juegosIniciales).nombre);
  assert.equal(normalizar('  Táctica Cero '), 'tactica cero');
});
test('la gestión rechaza precios negativos, fraccionarios o fuera de rango', () => {
  for (const precio of ['', '0', '-1', '15.5', 'NaN', 'Infinity', '10000000']) assert.ok(validarNuevoJuego({ ...nuevo, precio }, []).precio);
  assert.equal(validarNuevoJuego({ ...nuevo, precio: '1' }, []).precio, undefined);
  assert.equal(validarNuevoJuego({ ...nuevo, precio: '9999999' }, []).precio, undefined);
});
test('la gestión rechaza categorías desconocidas y descripciones incompletas', () => {
  assert.ok(validarNuevoJuego({ ...nuevo, categoria: 'Otro' }, []).categoria);
  assert.ok(validarNuevoJuego({ ...nuevo, descripcion: 'breve' }, []).descripcion);
});
test('se recupera el catálogo vacío guardado sin restaurarlo automáticamente', () => {
  assert.deepEqual(cargarCatalogo({ getItem: () => '[]' }, juegosIniciales), []);
});
test('almacenamiento corrupto o bloqueado permite volver a los datos iniciales', () => {
  for (const texto of ['{incorrecto', '{}', '[null]', JSON.stringify([{ ...juegosIniciales[0], precio: -1 }]), JSON.stringify([{ ...juegosIniciales[0], etiqueta: {} }]), JSON.stringify([juegosIniciales[0], juegosIniciales[0]])]) {
    assert.deepEqual(cargarCatalogo({ getItem: () => texto }, juegosIniciales), juegosIniciales);
  }
  assert.deepEqual(cargarCatalogo({ getItem: () => { throw new Error('Bloqueado'); } }, juegosIniciales), juegosIniciales);
});
