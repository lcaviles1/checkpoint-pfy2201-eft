import { useEffect, useMemo, useState } from 'react';
import { juegosIniciales } from './data/videojuegos.js';
import { cargarCatalogo, filtrarJuegos } from './utils/catalogo.js';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Filters from './components/Filters.jsx';
import GameList from './components/GameList.jsx';
import ContactForm from './components/ContactForm.jsx';
import CatalogManager from './components/CatalogManager.jsx';
import CartDialog from './components/CartDialog.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [juegos, setJuegos] = useState(() => {
    try { return cargarCatalogo(window.localStorage, juegosIniciales); }
    catch { return juegosIniciales; }
  });
  const [categoria, setCategoria] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');
  const [orden, setOrden] = useState('destacados');
  const [carrito, setCarrito] = useState([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [notificacion, setNotificacion] = useState('');
  const [sinPersistencia, setSinPersistencia] = useState(false);

  useEffect(() => {
    try { window.localStorage.setItem('checkpoint-catalogo-v1', JSON.stringify(juegos)); setSinPersistencia(false); }
    catch { setSinPersistencia(true); }
  }, [juegos]);
  useEffect(() => {
    if (!notificacion) return;
    const temporizador = setTimeout(() => setNotificacion(''), 3500);
    return () => clearTimeout(temporizador);
  }, [notificacion]);

  const visibles = useMemo(() => filtrarJuegos(juegos, categoria, busqueda, orden), [juegos, categoria, busqueda, orden]);
  const items = carrito.map(item => ({ ...item, juego: juegos.find(j => j.id === item.id) })).filter(item => item.juego);
  const cantidad = items.reduce((total, item) => total + item.cantidad, 0);
  function limpiarFiltros() { setCategoria('Todos'); setBusqueda(''); setOrden('destacados'); }
  function agregarCarrito(id) {
    const juego = juegos.find(j => j.id === id);
    const existente = carrito.find(item => item.id === id);
    if (!juego) return;
    if (existente?.cantidad >= 99) { setNotificacion('Puedes agregar hasta 99 unidades por videojuego.'); return; }
    setCarrito(actual => actual.some(item => item.id === id) ? actual.map(item => item.id === id ? { ...item, cantidad: Math.min(99, item.cantidad + 1) } : item) : [...actual, { id, cantidad: 1 }]);
    setNotificacion(`${juego.nombre} se agregó al carrito.`);
  }
  function cambiarCantidad(id, cambio) {
    setCarrito(actual => actual.map(item => item.id === id ? { ...item, cantidad: Math.min(99, item.cantidad + cambio) } : item).filter(item => item.cantidad > 0));
  }
  function agregarJuego(juego) {
    setJuegos(actual => [...actual, juego]);
    limpiarFiltros();
  }
  function eliminarJuego(id) {
    setJuegos(actual => actual.filter(juego => juego.id !== id));
    setCarrito(actual => actual.filter(item => item.id !== id));
  }
  function restaurar() { setJuegos(juegosIniciales); setCarrito([]); limpiarFiltros(); }

  return <>
    <Navbar cantidadCarrito={cantidad} onOpenCart={() => setCarritoAbierto(true)}/>
    <main id="contenido">
      <Hero/>
      <section id="catalogo" className="catalog-section container" aria-labelledby="titulo-catalogo">
        <div className="section-heading"><div><p className="eyebrow">ELIGE TU SIGUIENTE MUNDO</p><h2 id="titulo-catalogo">Descubre el catálogo<span>.</span></h2></div><span className="catalog-platform">PC · EDICIÓN DIGITAL</span></div>
        <Filters categoria={categoria} busqueda={busqueda} orden={orden} onCategoria={setCategoria} onBusqueda={setBusqueda} onOrden={setOrden}/>
        <GameList juegos={visibles} total={juegos.length} onAddCart={agregarCarrito} onResetFilters={limpiarFiltros}/>
      </section>
      <ContactForm/>
      <CatalogManager juegos={juegos} onAdd={agregarJuego} onDelete={eliminarJuego} onRestore={restaurar}/>
      {sinPersistencia && <p className="container storage-warning" role="status">El almacenamiento local no está disponible. Puedes usar la tienda; los cambios del catálogo durarán hasta cerrar o recargar la página.</p>}
    </main>
    <Footer/>
    <CartDialog abierto={carritoAbierto} items={items} onClose={() => setCarritoAbierto(false)} onChangeQuantity={cambiarCantidad}/>
    <div className={`toast-notice ${notificacion ? 'visible' : ''}`} role="status" aria-live="polite">{notificacion}</div>
  </>;
}
