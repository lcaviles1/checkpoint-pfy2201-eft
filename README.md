# Checkpoint

Tienda de videojuegos para PC desarrollada por **Lucas Avilés** para la Evaluación Final Transversal de Desarrollo Frontend I, **PFY2201**. Permite explorar un catálogo, filtrar juegos, gestionar productos y validar consultas de contacto.

Los ocho videojuegos, precios e ilustraciones son ficticios. El sitio es una demostración de frontend: no procesa pagos y el formulario no envía correos a un servidor.

## Abrir la versión lista para usar

1. Descomprime la entrega completa.
2. Abre **`dist/index.html`** en un navegador moderno.
3. Conserva la carpeta `assets` junto a ese archivo: contiene JavaScript, CSS, imágenes y las licencias de las dependencias.

Esta versión compilada funciona sin conexión a Internet y no necesita instalar Node.js. React y Bootstrap se incluyen localmente, sin CDN. Para una persistencia consistente del catálogo entre sesiones, se recomienda usar el servidor local: algunos navegadores limitan el almacenamiento cuando una página se abre mediante `file://`.

## Instalar y ejecutar el código fuente

Requisitos: **Node.js 22 o superior** y npm. La instalación inicial de dependencias requiere conexión a Internet.

Desde una terminal ubicada en la carpeta raíz del proyecto:

```sh
npm ci
npm run dev
```

Abre **http://127.0.0.1:5173**. Detén el servidor con `Ctrl+C`.

Los cambios en los archivos React se recompilan automáticamente; recarga la página para verlos. Si modificas CSS, imágenes o HTML, reinicia el servidor para que se copien los recursos actualizados. Si el puerto 5173 está ocupado, detén el otro servidor antes de ejecutar el comando.

## Compilar y ejecutar pruebas

```sh
npm test
npm run build
```

`npm test` ejecuta pruebas de filtrado, ordenación, validación y recuperación del almacenamiento mediante el ejecutor integrado de Node.js. `npm run build` genera nuevamente la carpeta `dist` a partir del código fuente. No hace falta instalar dependencias para abrir una compilación ya incluida.

## Usar la tienda

- **Navegación:** Inicio, Videojuegos, Contacto y Gestión enlazan a las secciones de la página. En pantallas pequeñas, el botón de menú permite desplegar los enlaces.
- **Catálogo:** cada tarjeta incluye ilustración, nombre, descripción, categoría, plataforma y precio en pesos chilenos.
- **Filtros:** selecciona una categoría y escribe un nombre en el buscador. Ambos filtros se combinan; la búsqueda ignora mayúsculas y acentos. Puedes ordenar por precio o por nombre. Si no hay resultados, utiliza “Limpiar filtros”.
- **Carrito:** usa el botón `+` de una tarjeta. Abre “Carrito” para modificar cantidades, retirar juegos y ver el total. Cada título admite hasta 99 unidades. El carrito dura durante la sesión de la página y se vacía al recargar. No hay un proceso de pago.
- **Contacto:** completa nombre, correo y mensaje. El nombre admite de 2 a 80 caracteres; el correo debe tener un formato válido; el mensaje debe tener de 10 a 1000 caracteres. Los errores aparecen junto al campo correspondiente y el foco se mueve al primer error. Una consulta válida produce una confirmación local y limpia el formulario; no se envía ni almacena el mensaje.
- **Gestión:** despliega “Gestión de videojuegos”. Ingresa nombre, categoría, precio entero positivo, descripción e ilustración para agregar un producto. Los nombres duplicados se rechazan. El nuevo juego aparece en el catálogo y se limpian los filtros para que sea visible.
- **Eliminar:** selecciona el icono de papelera de un juego y confirma. El producto se retira del catálogo y del carrito.
- **Restaurar:** “Restaurar inicial” pide confirmación y recupera los ocho juegos originales. También vacía el carrito.

Los cambios del catálogo se guardan en `localStorage` bajo la clave `checkpoint-catalogo-v1`. Solo afectan al navegador y al origen donde se realizaron; no se sincronizan con otros dispositivos. Si el almacenamiento está bloqueado, el sitio sigue funcionando y avisa que los cambios se perderán al recargar. Ante datos guardados inválidos, se recupera el catálogo inicial. El panel de gestión es demostrativo y no incluye autenticación.

## Organización del código

```text
public/
  index.html                 HTML de entrada con idioma, metadatos y acceso al contenido
  assets/images/             Ilustraciones SVG originales y favicon
src/
  main.jsx                   Punto de entrada y montaje de React en el DOM
  App.jsx                    Estado compartido, persistencia y coordinación por props
  components/
    Navbar.jsx               Navegación responsiva y acceso al carrito
    Hero.jsx                 Presentación de la tienda
    Filters.jsx              Categoría, búsqueda y orden
    GameList.jsx              Lista dinámica y estado sin resultados
    GameCard.jsx              Tarjeta reutilizable de un videojuego
    CartDialog.jsx            Carrito accesible con cantidades y total
    ContactForm.jsx           Formulario y validación de consultas
    CatalogManager.jsx        Altas, bajas y restauración del catálogo
    Field.jsx                Etiqueta y errores reutilizables
    Icon.jsx                 Iconos SVG reutilizables
    Footer.jsx               Pie de página y autoría
  data/videojuegos.js         Objeto JavaScript con el catálogo inicial
  utils/catalogo.js          Filtrado, formato de precio y recuperación de datos
  utils/validacion.js         Reglas de contacto y nuevos productos
  styles.css                 Estilos propios, Flexbox y CSS Grid
scripts/build.mjs            Compilación y servidor local con esbuild
tests/funcionalidad.test.js   Pruebas automatizadas de lógica
dist/                        Sitio compilado listo para abrir
package.json                 Dependencias, requisitos y comandos
package-lock.json            Versiones exactas para instalación reproducible
```

## Implementación

React mantiene el catálogo, los filtros y el carrito mediante `useState`. `App` entrega datos y funciones a los componentes por **props**. `GameList` recorre el arreglo filtrado y genera `GameCard` con claves únicas; React crea y actualiza los elementos del DOM al cambiar el estado. `useMemo` deriva los resultados visibles y `useEffect` guarda el catálogo localmente.

La estructura utiliza `header`, `nav`, `main`, `section`, `article` y `footer`. Bootstrap 5 aporta la barra de navegación, tarjetas, formularios, botones y grilla responsiva. Los estilos propios complementan la grilla con **Flexbox** y **CSS Grid**. El menú se controla con estado React, por lo que no requiere JavaScript adicional de Bootstrap.

La navegación funciona con teclado, los campos tienen etiquetas y errores asociados, los estados relevantes se anuncian mediante regiones ARIA y el carrito usa un diálogo nativo que admite cierre con Escape. Se respetan las preferencias de movimiento reducido. Las tarjetas pasan de cuatro columnas en escritorio a dos en tabletas y una en móviles pequeños.

## Dependencias y recursos

- React y React DOM **19.3.0**: componentes y actualización del DOM.
- Bootstrap **5.3.8**: componentes visuales y diseño responsivo.
- esbuild **0.28.2**: empaquetado de JSX y servidor de desarrollo.

Las licencias de las dependencias se conservan en `dist/assets/licenses.txt` y `dist/assets/app.js.LEGAL.txt`. Las ilustraciones del catálogo y los iconos son recursos SVG propios del proyecto.

Referencias técnicas: [React](https://react.dev/learn), [Bootstrap 5](https://getbootstrap.com/docs/5.3/) y [esbuild](https://esbuild.github.io/api/).
