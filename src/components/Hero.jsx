import Icon from './Icon.jsx';
export default function Hero() {
  return <section id="inicio" className="hero" aria-labelledby="titulo-inicio">
    <div className="container hero-grid">
      <div className="hero-copy">
        <p className="eyebrow"><span className="status-dot"/> PARA QUIENES QUIEREN SEGUIR JUGANDO</p>
        <h1 id="titulo-inicio">Tu próxima<br/>aventura <span>empieza aquí.</span></h1>
        <p className="hero-description">Nuevos mundos, grandes historias y una partida más.<br className="d-none d-lg-block"/> Encuentra tu próximo videojuego en Checkpoint.</p>
        <a className="btn btn-lime" href="#catalogo">Explorar videojuegos <Icon name="arrow"/></a>
        <div className="hero-footnote"><Icon name="game" size={18}/><span>Juegos para PC</span><span className="small-separator"/><span>Precios en pesos chilenos</span></div>
      </div>
      <div className="hero-art">
        <img src="assets/images/orbital.svg" width="800" height="500" alt="Nave espacial sobre montañas y un planeta con anillos" fetchPriority="high"/>
        <div className="feature-caption"><div><span className="feature-label">EXPLORA OTRO UNIVERSO</span><p>Orbital Drift</p></div><a className="feature-arrow" href="#catalogo" aria-label="Ver Orbital Drift en el catálogo"><Icon name="arrow" size={24}/></a></div>
        <span className="art-index" aria-hidden="true">01 / 08</span>
      </div>
    </div>
  </section>;
}
