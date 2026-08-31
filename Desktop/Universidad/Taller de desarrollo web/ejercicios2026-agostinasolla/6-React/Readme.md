## Unidad 6: Frameworks de JavaScript: React, Vue y Angular

### Ejercicio: Instalación de React Usando Vite
1. Ejecutar el siguiente comando para inicializar el proyecto:
```bash
npm create vite@latest
```
2. Colocar un nombre al proyecto
3. Seleccionar el framework: React
4. Seleccionar el lenguaje: JavaScript
5. Ingresar a la carpeta creada `cd nombre-proyecto`
6. Ejecutar `npm install`
7. Ejecutar `npm run dev`
8. Ingresar a localhost:5173

### Ejercicio: Login Básico

1. Crear un archivo Login.jsx similar al siguiente:
2. Al presionar Ingresar, si el usuario y password es 'admin', mostrar por consola "Login OK", sino "Login Incorrecto".
3. Hacer una versión básica con css tradicional
4. A la altura del package ejecutar npm install sass --save-dev
4. Crear una carpeta de styles dentro de src
5. Adaptar el estilo al uso de SASS

### Ejercicio: Redirección de Rutas
1. Ejecutar npm install react-router-dom
2. Si el login es exitoso redireccionar a "/actividades"
3. Use la siguiente información para crear una pantalla donde se pueda mostrar adecuadamente

### Ejercicio: Outlet

1. Crear un componente de Header, donde haya un menú de navegación con: Home, Login, Actividades
2. Crear un componente de Footer
3. Crear un layout que renderice Header, Main, Footer. El contenido de main puede variar acorde se selecicone /login o /actividades o /Home.
4. En la página de actividades, mostrar el botón de inscripción solo si el usuario está logueado.
5. Si el usuario está logueado, mostrar en Header el botón de Logout.

### Ejercicio: Estructura del Proyecto

1. Dentro de la carpeta src cree 3 subcarpetas:
- components
- pages
- styles
2. Re-organice los archivos en las carpetas correspondientes
3. Modifique los imports y verifique que la página funciona correctamente.
4. Modifique vite.config.js para mejorar los imports usando alias

### Ejercicio: Imágenes
1. Dentro de public crea una carpeta de home y guarda 2 imágenes
2. Dentro de assets crea una carpeta de home y guarda 2 imágenes
3. En la Home reemplaza el texto por una estructura de 4 cards, cada una con una imágen y el título de la actividad.

### Ejercicio: Children

1. Cree un componente Card que permita mostrar las actividades del gym El mismo debe recibir: título, subtítulo e información en un children.
2. Separe la "data" en un archivo separado para mantener el orden de los componentes.

