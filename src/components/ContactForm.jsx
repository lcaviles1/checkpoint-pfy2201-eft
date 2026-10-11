import { useRef, useState } from 'react';
import { validarContacto } from '../utils/validacion.js';
import Field from './Field.jsx';
import Icon from './Icon.jsx';
const VACIO = { nombre: '', email: '', mensaje: '' };
export default function ContactForm() {
  const [datos, setDatos] = useState(VACIO);
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);
  const formulario = useRef(null);
  function cambiar(e) {
    const { name, value } = e.target;
    setDatos(actual => ({ ...actual, [name]: value }));
    setEnviado(false);
    if (errores[name]) setErrores(actual => ({ ...actual, [name]: undefined }));
  }
  function enviar(e) {
    e.preventDefault();
    const fallos = validarContacto(datos);
    setErrores(fallos);
    setEnviado(false);
    if (Object.keys(fallos).length) {
      formulario.current.elements[Object.keys(fallos)[0]].focus();
      return;
    }
    // Sin servidor: confirmación local, sin enviar ni guardar información personal.
    setEnviado(true);
    setDatos(VACIO);
  }
  const inputProps = name => ({
    id: `contacto-${name}`, name, value: datos[name], onChange: cambiar, required: true,
    'aria-invalid': Boolean(errores[name]),
    'aria-describedby': [errores[name] && `contacto-${name}-error`, name === 'mensaje' && 'contacto-mensaje-ayuda'].filter(Boolean).join(' ') || undefined,
    className: `form-control ${errores[name] ? 'is-invalid' : ''}`
  });
  return <section id="contacto" className="contact-section" aria-labelledby="titulo-contacto"><div className="container contact-grid">
    <div><p className="eyebrow">ESTAMOS DEL OTRO LADO</p><h2 id="titulo-contacto">Hablemos de<br/>tu próxima partida.</h2><p className="section-description">¿Tienes una pregunta sobre el catálogo?<br/>Escribe al administrador de la tienda.</p><div className="contact-detail"><span className="contact-icon"><Icon name="mail" size={26}/></span><div><p>Contacto de la tienda</p><span>Completa el formulario para validar tu consulta.</span></div></div><p className="demo-note">Demostración académica: el formulario valida los datos y muestra una confirmación local. No envía correos ni guarda mensajes.</p></div>
    <form ref={formulario} onSubmit={enviar} noValidate className="contact-form">
      <div className="row"><div className="col-md-6"><Field id="contacto-nombre" label="Nombre" error={errores.nombre}><input {...inputProps('nombre')} autoComplete="name" maxLength={80} placeholder="Tu nombre"/></Field></div><div className="col-md-6"><Field id="contacto-email" label="Correo electrónico" error={errores.email}><input {...inputProps('email')} type="email" autoComplete="email" maxLength={254} placeholder="nombre@correo.cl"/></Field></div></div>
      <Field id="contacto-mensaje" label="Mensaje" error={errores.mensaje} hint={`${datos.mensaje.length}/1000 caracteres · mínimo 10`}><textarea {...inputProps('mensaje')} rows={5} maxLength={1000} placeholder="Cuéntanos en qué podemos ayudarte"/></Field>
      <button className="btn btn-lime" type="submit">Enviar consulta <Icon name="arrow"/></button>
      {Object.values(errores).some(Boolean) && <p role="alert" className="form-summary">Revisa los campos indicados antes de continuar.</p>}
      {enviado && <div className="alert alert-success mt-3 mb-0" role="status"><Icon name="check"/> Datos validados correctamente. Consulta procesada en modo demostración; no se envió ningún correo.</div>}
    </form>
  </div></section>;
}
