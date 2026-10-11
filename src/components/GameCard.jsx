import { formatoPrecio } from '../utils/catalogo.js';
import Icon from './Icon.jsx';
export default function GameCard({ juego, onAddCart }) {
  return <article className="card game-card h-100">
    <div className="game-cover"><img className="card-img-top" src={juego.imagen} width="800" height="500" loading="lazy" alt={`Ilustración de ${juego.nombre}`}/>{juego.etiqueta && <span className="cover-badge">{juego.etiqueta}</span>}<span className="platform-badge">{juego.plataforma}</span></div>
    <div className="card-body d-flex flex-column"><p className="game-category">{juego.categoria}</p><h3 className="card-title">{juego.nombre}</h3><p className="card-text game-description">{juego.descripcion}</p><div className="game-bottom mt-auto"><div><span className="price-caption">PRECIO</span><p className="game-price">{formatoPrecio(juego.precio)} <span>CLP</span></p></div><button className="btn add-cart" onClick={() => onAddCart(juego.id)} aria-label={`Agregar ${juego.nombre} al carrito`}><Icon name="plus"/><span className="visually-hidden">Agregar al carrito</span></button></div></div>
  </article>;
}
