// Fuente local de datos: un objeto JavaScript indexado por identificador.
export const CATEGORIAS = ['Acción', 'Aventura', 'Carreras', 'RPG', 'Simulación', 'Estrategia'];
export const PORTADAS = {
  orbital: 'assets/images/orbital.svg', forest: 'assets/images/forest.svg',
  neon: 'assets/images/neon.svg', astral: 'assets/images/astral.svg',
  island: 'assets/images/island.svg', abyss: 'assets/images/abyss.svg',
  tactic: 'assets/images/tactic.svg', rally: 'assets/images/rally.svg'
};
export const catalogoVideojuegos = {
  orbital: { id: 'orbital', nombre: 'Orbital Drift', categoria: 'Acción', precio: 24990,
    descripcion: 'Pilotea entre anillos planetarios, esquiva meteoritos y recupera el último puesto de la galaxia.',
    imagen: PORTADAS.orbital, plataforma: 'PC', etiqueta: 'Destacado' },
  forest: { id: 'forest', nombre: 'Bosque de Bruma', categoria: 'Aventura', precio: 18990,
    descripcion: 'Sigue el río, descubre senderos ocultos y encuentra la luz que protege un bosque olvidado.',
    imagen: PORTADAS.forest, plataforma: 'PC', etiqueta: '' },
  neon: { id: 'neon', nombre: 'Neon Circuit', categoria: 'Carreras', precio: 22990,
    descripcion: 'Domina las curvas de una ciudad nocturna y lleva tu vehículo hasta la meta bajo luces de neón.',
    imagen: PORTADAS.neon, plataforma: 'PC', etiqueta: 'Nuevo' },
  astral: { id: 'astral', nombre: 'Reino Astral', categoria: 'RPG', precio: 29990,
    descripcion: 'Reúne a tu equipo, explora fortalezas y decide el destino de un reino guiado por las estrellas.',
    imagen: PORTADAS.astral, plataforma: 'PC', etiqueta: '' },
  island: { id: 'island', nombre: 'Isla Pixel', categoria: 'Simulación', precio: 14990,
    descripcion: 'Construye tu refugio, cultiva a tu ritmo y transforma una pequeña isla en tu lugar favorito.',
    imagen: PORTADAS.island, plataforma: 'PC', etiqueta: '' },
  abyss: { id: 'abyss', nombre: 'Eco del Abismo', categoria: 'Aventura', precio: 19990,
    descripcion: 'Desciende a cavernas de cristal y resuelve los misterios que una antigua expedición dejó atrás.',
    imagen: PORTADAS.abyss, plataforma: 'PC', etiqueta: 'Nuevo' },
  tactic: { id: 'tactic', nombre: 'Táctica Cero', categoria: 'Estrategia', precio: 16990,
    descripcion: 'Cada movimiento cuenta. Planifica rutas, controla el tablero y supera desafíos por turnos.',
    imagen: PORTADAS.tactic, plataforma: 'PC', etiqueta: '' },
  rally: { id: 'rally', nombre: 'Ruta Salvaje', categoria: 'Carreras', precio: 21990,
    descripcion: 'Recorre montañas al atardecer, ajusta tu coche y conquista rutas que pondrán a prueba tu manejo.',
    imagen: PORTADAS.rally, plataforma: 'PC', etiqueta: '' }
};
export const juegosIniciales = Object.values(catalogoVideojuegos);
