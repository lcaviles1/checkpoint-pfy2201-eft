import { useEffect, useRef } from 'react';
import { formatoPrecio } from '../utils/catalogo.js';
import Icon from './Icon.jsx';
export default function CartDialog({ abierto, items, onClose, onChangeQuantity }) {
  const dialogo = useRef(null);
  useEffect(() => {
    if (abierto && !dialogo.current.open) dialogo.current.showModal();
    else if (!abierto && dialogo.current.open) dialogo.current.close();
  }, [abierto]);
  const total = items.reduce((suma, item) => suma + item.juego.precio * item.cantidad, 0);
  return <dialog ref={dialogo} className="cart-dialog" aria-labelledby="titulo-carrito" onCancel={e => { e.preventDefault(); onClose(); }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
    <div className="cart-content"><div className="dialog-header"><h2 id="titulo-carrito">Tu carrito</h2><button className="btn icon-button" aria-label="Cerrar carrito" onClick={onClose}><Icon name="close"/></button></div>
      {!items.length ? <div className="empty-state"><Icon name="cart" size={36}/><h3>Una aventura te espera</h3><p>Agrega un videojuego para comenzar.</p><button className="btn btn-lime" onClick={onClose}>Seguir explorando</button></div> : <><ul className="cart-items">{items.map(({ juego, cantidad }) => <li key={juego.id}><img src={juego.imagen} width="96" height="60" alt=""/><div className="cart-item-info"><h3>{juego.nombre}</h3><p>{formatoPrecio(juego.precio)}</p><div className="quantity-controls"><button className="btn" aria-label={`Quitar una unidad de ${juego.nombre}`} onClick={() => onChangeQuantity(juego.id, -1)}>−</button><span aria-label={`${cantidad} unidades`}>{cantidad}</span><button className="btn" aria-label={`Añadir una unidad de ${juego.nombre}`} disabled={cantidad >= 99} onClick={() => onChangeQuantity(juego.id, 1)}>+</button></div></div><button className="btn icon-button" aria-label={`Retirar ${juego.nombre} del carrito`} onClick={() => onChangeQuantity(juego.id, -cantidad)}><Icon name="trash"/></button></li>)}</ul><div className="cart-total"><span>Total</span><strong>{formatoPrecio(total)} <small>CLP</small></strong></div><p className="demo-note">Carrito de demostración. No se realizan pagos ni compras reales.</p><button className="btn btn-lime w-100" onClick={onClose}>Seguir explorando <Icon name="arrow"/></button></>}
    </div>
  </dialog>;
}
