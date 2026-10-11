import { useRef, useState } from 'react';
import { CATEGORIAS, PORTADAS } from '../data/videojuegos.js';
import { validarNuevoJuego } from '../utils/validacion.js';
import { formatoPrecio } from '../utils/catalogo.js';
import Field from './Field.jsx';
import Icon from './Icon.jsx';
const VACIO = { nombre: '', categoria: 'Acción', precio: '', descripcion: '', portada: 'orbital' };
export default function CatalogManager({ juegos, onAdd, onDelete, onRestore }) {
  const [datos, setDatos] = useState(VACIO);
  const [errores, setErrores] = useState({});
  const [aviso, setAviso] = useState('');
  const [pendiente, setPendiente] = useState(null);
  const formulario = useRef(null);
  const cambiar = e => { const { name, value } = e.target; setDatos(actual => ({ ...actual, [name]: value })); setErrores(actual => ({ ...actual, [name]: undefined })); setAviso(''); };
  function agregar(e) {
    e.preventDefault();
    const fallos = validarNuevoJuego(datos, juegos);
    setErrores(fallos);
    setAviso('');
    if (Object.keys(fallos).length) { formulario.current.elements[Object.keys(fallos)[0]].focus(); return; }
    const juego = { id: `juego-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, nombre: datos.nombre.trim(), categoria: datos.categoria, precio: Number(datos.precio), descripcion: datos.descripcion.trim(), imagen: PORTADAS[datos.portada], plataforma: 'PC', etiqueta: 'Nuevo' };
    onAdd(juego);
    setAviso(`${juego.nombre} se agregó al catálogo.`);
    setDatos(VACIO);
  }
  const props = name => ({ id: `gestion-${name}`, name, value: datos[name], onChange: cambiar, required: true, className: `form-control ${errores[name] ? 'is-invalid' : ''}`, 'aria-invalid': Boolean(errores[name]), 'aria-describedby': errores[name] ? `gestion-${name}-error` : undefined });
  return <section id="gestion" className="management-section container" aria-labelledby="titulo-gestion">
    <details className="management-details"><summary><div><p className="eyebrow">TU CATÁLOGO, A TU MANERA</p><h2 id="titulo-gestion">Gestión de videojuegos</h2><p>Agrega juegos, elimina títulos o recupera el catálogo inicial.</p></div><span className="management-toggle" aria-hidden="true"><Icon name="plus" size={26}/></span></summary>
      <p className="demo-note">Panel de demostración sin autenticación. Los cambios se guardan en este navegador cuando el almacenamiento local está disponible.</p>
      <div className="row g-5"><div className="col-lg-6"><h3 className="management-title">Agregar un videojuego</h3><form ref={formulario} noValidate onSubmit={agregar}>
        <Field id="gestion-nombre" label="Nombre del videojuego" error={errores.nombre}><input {...props('nombre')} maxLength={80} placeholder="Nombre del nuevo juego"/></Field>
        <div className="row"><div className="col-sm-6"><Field id="gestion-categoria" label="Categoría" error={errores.categoria}><select {...props('categoria')} className={`form-select ${errores.categoria ? 'is-invalid' : ''}`}>{CATEGORIAS.map(c => <option key={c}>{c}</option>)}</select></Field></div><div className="col-sm-6"><Field id="gestion-precio" label="Precio en CLP" error={errores.precio}><input {...props('precio')} type="number" min="1" max="9999999" step="1" placeholder="Ejemplo: 15990"/></Field></div></div>
        <Field id="gestion-descripcion" label="Descripción" error={errores.descripcion}><textarea {...props('descripcion')} rows={3} minLength={10} maxLength={300} placeholder="Describe la experiencia del videojuego"/></Field>
        <Field id="gestion-portada" label="Ilustración"><select id="gestion-portada" name="portada" className="form-select" value={datos.portada} onChange={cambiar}>{Object.keys(PORTADAS).map((p, i) => <option key={p} value={p}>{['Espacio', 'Bosque', 'Ciudad neón', 'Castillo', 'Isla', 'Caverna', 'Tablero', 'Montañas'][i]}</option>)}</select></Field>
        <button className="btn btn-lime" type="submit"><Icon name="plus"/> Agregar al catálogo</button>
      </form></div><div className="col-lg-6"><div className="management-list-title"><h3 className="management-title">Catálogo actual <span>({juegos.length})</span></h3><button className="btn btn-sm btn-outline-light" onClick={() => setPendiente({ tipo: 'restaurar' })}>Restaurar inicial</button></div>
        {pendiente && <div className="alert confirmation" role="alert"><p>{pendiente.tipo === 'restaurar' ? '¿Restaurar los ocho juegos iniciales? Se perderán los cambios del catálogo y se vaciará el carrito.' : `¿Eliminar ${pendiente.juego.nombre} del catálogo? También se retirará del carrito.`}</p><div className="d-flex gap-2"><button className="btn btn-sm btn-danger" onClick={() => { if (pendiente.tipo === 'restaurar') { onRestore(); setAviso('Catálogo inicial restaurado.'); } else { onDelete(pendiente.juego.id); setAviso(`${pendiente.juego.nombre} se eliminó del catálogo.`); } setPendiente(null); }}>Confirmar</button><button className="btn btn-sm btn-outline-light" onClick={() => setPendiente(null)}>Cancelar</button></div></div>}
        <ul className="management-list">{juegos.map(juego => <li key={juego.id}><img src={juego.imagen} alt="" width="64" height="40"/><div><strong>{juego.nombre}</strong><span>{juego.categoria} · {formatoPrecio(juego.precio)}</span></div><button className="btn icon-button" aria-label={`Eliminar ${juego.nombre} del catálogo`} onClick={() => setPendiente({ tipo: 'eliminar', juego })}><Icon name="trash"/></button></li>)}</ul>
        {!juegos.length && <p>El catálogo está vacío. Agrega un juego o restaura los títulos iniciales.</p>}
      </div></div><p className="management-notice" role="status" aria-live="polite">{aviso}</p>
    </details>
  </section>;
}
