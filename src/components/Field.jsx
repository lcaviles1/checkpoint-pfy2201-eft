// Componente reutilizable con etiquetas y errores asociados mediante ARIA.
export default function Field({ id, label, error, hint, children, className = '' }) {
  return <div className={`mb-3 ${className}`}><label htmlFor={id} className="form-label">{label}</label>{children}{hint && <div id={`${id}-ayuda`} className="form-text">{hint}</div>}{error && <div id={`${id}-error`} className="invalid-feedback d-block">{error}</div>}</div>;
}
