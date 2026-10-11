import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// React crea y actualiza el DOM real desde los componentes y su estado.
const contenedor = document.getElementById('root');
createRoot(contenedor).render(<App/>);
