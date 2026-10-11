import { useState } from 'react';
import Icon from './Icon.jsx';
export default function Navbar({ cantidadCarrito, onOpenCart }) {
  const [abierto, setAbierto] = useState(false);
  const cerrar = () => setAbierto(false);
  return <header className="site-header">
    <nav className="navbar navbar-expand-md container" aria-label="Navegación principal">
      <a className="navbar-brand brand" href="#inicio" onClick={cerrar}><span className="brand-symbol" aria-hidden="true">C<span>·</span></span>checkpoint<span className="brand-dot">.</span></a>
      <button className="navbar-toggler" type="button" aria-controls="navegacion" aria-expanded={abierto} aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setAbierto(!abierto)}><span className="menu-lines" aria-hidden="true">☰</span></button>
      <div id="navegacion" className={`collapse navbar-collapse ${abierto ? 'show' : ''}`}>
        <ul className="navbar-nav ms-auto align-items-md-center">
          <li className="nav-item"><a className="nav-link" href="#inicio" onClick={cerrar}>Inicio</a></li>
          <li className="nav-item"><a className="nav-link" href="#catalogo" onClick={cerrar}>Videojuegos</a></li>
          <li className="nav-item"><a className="nav-link" href="#contacto" onClick={cerrar}>Contacto</a></li>
          <li className="nav-item"><a className="nav-link" href="#gestion" onClick={cerrar}>Gestión</a></li>
          <li className="nav-item"><button className="btn cart-trigger" onClick={() => { cerrar(); onOpenCart(); }}><Icon name="cart"/>Carrito<span className="cart-count">{cantidadCarrito}</span></button></li>
        </ul>
      </div>
    </nav>
  </header>;
}
