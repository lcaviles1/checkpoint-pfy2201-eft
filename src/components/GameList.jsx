import GameCard from './GameCard.jsx';
import Icon from './Icon.jsx';
export default function GameList({ juegos, total, onAddCart, onResetFilters }) {
  return <>
    <p className="result-count" role="status" aria-live="polite">{juegos.length} {juegos.length === 1 ? 'videojuego disponible' : 'videojuegos disponibles'} de {total}</p>
    {juegos.length ? <div className="row g-4 game-grid">{juegos.map(juego => <div key={juego.id} className="col-12 col-sm-6 col-lg-3"><GameCard juego={juego} onAddCart={onAddCart}/></div>)}</div> : <div className="empty-state"><Icon name="search" size={36}/><h3>No encontramos videojuegos</h3><p>Prueba otra búsqueda o categoría. Si vaciaste el catálogo, puedes restaurarlo en Gestión.</p><button className="btn btn-outline-light" onClick={onResetFilters}>Limpiar filtros</button></div>}
  </>;
}
