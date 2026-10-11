import { CATEGORIAS } from '../data/videojuegos.js';
import Icon from './Icon.jsx';
export default function Filters({ categoria, busqueda, orden, onCategoria, onBusqueda, onOrden }) {
  return <div className="catalog-controls">
    <div className="category-filters" role="group" aria-label="Filtrar por categoría">
      {['Todos', ...CATEGORIAS].map(item => <button key={item} type="button" className={`btn category-chip ${categoria === item ? 'active' : ''}`} aria-pressed={categoria === item} onClick={() => onCategoria(item)}>{item}</button>)}
    </div>
    <div className="search-sort">
      <div className="search-box"><Icon name="search"/><label className="visually-hidden" htmlFor="buscar">Buscar videojuegos por nombre</label><input id="buscar" className="form-control" type="search" placeholder="Buscar un videojuego" value={busqueda} onChange={e => onBusqueda(e.target.value)} maxLength={80}/></div>
      <div><label className="visually-hidden" htmlFor="orden">Ordenar videojuegos</label><select id="orden" className="form-select" value={orden} onChange={e => onOrden(e.target.value)}><option value="destacados">Orden original</option><option value="precio-asc">Precio: menor a mayor</option><option value="precio-desc">Precio: mayor a menor</option><option value="nombre">Nombre: A a Z</option></select></div>
    </div>
  </div>;
}
