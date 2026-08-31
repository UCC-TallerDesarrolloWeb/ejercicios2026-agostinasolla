## Unidad 3: JavaScript y ES6+

### Ejercicio: Propiedades tipográficas

Empleando el template **ej_columnas**, agregue estilo en línea para cambiar:

- Color del texto del título de la página.
- Tamaño de la fuente del título de la noticia.
- Tipo de fuente o letra de toda la página.

### Ejercicio: Incrustado

Empleando el template **ej_columnas**, cambie los estilos en línea por estilos incrustados.

- El título de la página debe estar definido por ID
- El título de la noticia debe estar definido por clase
- El tipo de fuente para toda la página debe estar definido por Tag

### Ejercicio: Estilo con Descendientes

Empleando el template **ej_leyes** y hoja de estilo incrustada, agregue los estilos necesarios para cambiar:

- La primera lista ordenada para visualizarla con números romanos y una tipografía de mayor tamaño (upper-roman).
- La segunda lista ordenada para visualizarla con letras (lower-alpha).


### Ejercicio: Pseudo Clases

Al hipervinculo de la página de ej_columnas, empleando Pseudo clases modifique:

- Link visitado o no visitado con el mismo color
- Al posicionar el mouse arriba del link, modificar el tamaño de la fuente
- Al seleccionar el link, seleccionar BOLD

### Ejercicio: CV

Diseñe un CV y agregue estilos empleando una hoja de estilo incrustada:

- Hacer que el borde de los divs sea visible
- Agregue atributos de margin y padding a los divs
- Agregar color plano a los divs y ponerle opacity
- Agregar una imagen en el primer div y alinee a la izquierda
- Centrar todo el contenido del body.
- Agregar fuentes de google para personalizar la página
- Agregar background al body, que posea gradiente
- Redondear las esquinas de la imagen para dejarla circular.
- Redondear las esquinas de los
- Agregar favicon
- Agregar sombras a los textos y a los títulos
- Agregar sombras a los divs
-Asegúrese de por lo menos incluir un estilo por Tag, por ID y por clase

### Ejercicio: Backgrounds

Cree una página nueva, emplee de fondo la imagen “fondo_mario.jpg” ubicada en la carpeta de “imagenes”. Pruebe los diferentes atributos de background: image, color, origin, position, repeat, size, etc.

### Ejercicio: Position

Empleando el CV trabajado anteriormente, colocar un position fixed al div principal con el nombre y carrera.

### Ejercicio: 2 Columnas

Emplear div con style para lograr que el estilo del texto quede en 2 columnas fluidas. Pruebe

- Forma 1 (CSS2): Float (left, right) y Width (50%) - (para div columna1 y div columna2)
- Forma 2 (CSS3): Column-count y column-gap (para el article)

### Ejercicio: Grid

- Crea un archivo: productos.html
- Puedes usar estilos incrustados u hoja de estilos enlazada
- Debes crear un contenedor main y dentro tarjetas div
- Cada tarjeta debe contener una imagen y un título
- Las imágenes pueden obtenerse de Ejercicios-JavaScript

### Ejercicio: grid-areas

- Emplea grid-container en el body
- Agrega etiquetas semánticas para: cabecera de la página, links de navegación, menú lateral, principal y pie de página.
- cree las clases itemN con el grid-area de cada una.
- Las clases de cabecera, links y footer deben ocupar 4 "columnas imaginarias"
- La clase de aside debe ocupar 1, y la clase de main debe ocupar 3

### Ejercicio: Mejora

Empleando las etiquetas html vistas en clase agrega:
- legend

### Ejercicio: Transitions

- Agregar 2 botones "Catálogo" y "Carrito de Compras" en la sección nav
- Agregar los estilos para que se visualice de la siguiente manera: (el cambio de color de fondo y de padding no debe ser abrupto)
- Reutilice los colores empleando VAR

### Ejercicio: Viewport

Prueba como se ve la página 2-CSS/ej_cv.html con F12 SIN la etiqueta de viewport... Luego agregale la etiqueta y mira que pasa

```
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1">
```

### Ejercicio: Responsive

Empleando Ejercicios-CSS el template ej_instagram, el contenido debe visualizarse:

- Se deben mostrar 3 columnas las imagenes si la pantalla si la pantalla tiene un mínimo de 601px
- Se debe mostrar 1 columna si la pantalla tiene como máximo 600px
- Las imagenes deben ocupar el 100% de su columna

