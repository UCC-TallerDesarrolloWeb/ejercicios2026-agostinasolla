# 🍨 Gelato Pampa — Ejercicio de JavaScript

Tenés una heladería con el HTML y el CSS ya listos y una "base de datos" en JSON. Tu laburo es programar la lógica en `app.js`: mostrar los sabores, filtrarlos, armar el pedido, calcular totales con descuentos y sacar estadísticas.

## Qué vas a practicar

- Arrays: `.map`, `.filter`, `.find`, `.reduce`, `.sort`, `.some`, `.every`, `.flatMap`
- Funciones flecha (todo el archivo está escrito con ellas)
- Destructuring, spread (`...`), optional chaining (`?.`) y `??`
- Template literals para generar HTML
- `fetch` con `async/await`
- Delegación de eventos

## Estructura

```
heladeria-js/
├── index.html          # Estructura de la página (no hace falta tocarla)
├── styles.css          # Estilos (no hace falta tocarlos)
├── app.js              # ← ACÁ TRABAJÁS: tiene 10 TODO para completar
├── app.solucion.js     # Solución de referencia (no la mires antes de intentarlo)
└── data/
    └── db.json         # La "base de datos"
```

## Cómo correrlo

`app.js` lee `data/db.json` con `fetch`, y los navegadores bloquean `fetch` si abrís el HTML con doble clic (`file://`). Necesitás un servidor local. Cualquiera de estas opciones sirve, parado en la carpeta del proyecto:

```bash
# Opción 1: Python
python3 -m http.server 5500

# Opción 2: Node
npx serve .
```

Después abrí `http://localhost:5500` (o el puerto que te indique `serve`). También podés usar la extensión **Live Server** en Cursor o VS Code.

Si ves el cartel "No pudimos cargar la carta", casi seguro es por no estar usando un servidor.

## La base de datos (`data/db.json`)

| Clave | Qué contiene |
|---|---|
| `heladeria` | `nombre`, `eslogan`, `moneda` |
| `promociones` | Descuentos por cantidad de bolas: `{ nombre, minimoBolas, porcentaje }` |
| `sabores` | `{ id, nombre, categoria, precio, stock, vegano, sinTacc, color, descripcion }` |
| `pedidos` | Historial: `{ id, cliente, fecha, items: [{ saborId, cantidad }] }` |

Ojo: el navegador **no puede escribir** en `db.json`. Cuando confirmás un pedido, el stock y el historial cambian solo en memoria y se pierden al recargar. Eso es normal (hay un bonus para resolverlo).

## Paso a paso

Hacé los TODO en orden y probá en el navegador después de cada uno. Abrí la consola (F12) para ver errores.

### TODO 1 — Cargar los datos
Completá `cargarDatos` con `fetch` y `await`. Guardá `heladeria`, `sabores`, `pedidos` y `promociones` en `estado`.
**Para verificar:** en la consola escribí `estado` y fijate que tenga 16 sabores.
> `console.log(estado)` dentro de `init`, después del `await cargarDatos()`, también sirve.

### TODO 2 — Encabezado y categorías
- `renderEncabezado`: nombre y eslogan en el hero.
- `obtenerCategorias`: categorías sin repetir (`.map` + `new Set` + spread).
- `renderCategorias`: llenar el `<select>` con `.map().join("")`.
**Para verificar:** el título dice "Gelato Pampa" y el select tiene 4 categorías.

### TODO 3 — Filtrar y ordenar
Completá `filtrarSabores` encadenando `.filter()` y terminando con `.sort()` sobre una copia.
**Para verificar (cuando termines el TODO 4):** buscar "choc" deja 3 sabores; tildar "Solo veganos" deja 5; ordenar por "Precio: mayor a menor" pone primero al mascarpone.

### TODO 4 — Dibujar el catálogo
- `cantidadEnCarrito(id)` con `.find()` y `?.` / `??`.
- `tarjetaSabor(sabor)` devuelve el HTML de una tarjeta (la estructura está en el comentario).
- `renderCatalogo()` junta todo con `.map(tarjetaSabor).join("")` y actualiza el contador.
**Para verificar:** aparecen 16 tarjetas, los sabores sin stock tienen el botón deshabilitado y los filtros ya funcionan.

### TODO 5 — Operaciones del carrito
`agregarAlCarrito`, `cambiarCantidad`, `quitarDelCarrito` y `vaciarCarrito`. Todas modifican `estado.carrito` y terminan con `actualizarVista()`.
Reglas: no se puede superar el stock, y si la cantidad llega a 0 el sabor sale del carrito.
**Para verificar:** al tocar "Agregar" en un sabor con stock 5, después del quinto clic el botón pasa a "Sin stock".

### TODO 6 — Totales
- `detalleCarrito`: `.map` con spread para sumar `cantidad` y `subtotal` al sabor.
- `calcularTotales`: `.reduce` para subtotal y bolas, y elegir la mejor promoción.
**Para verificar:** 6 bolas de Dulce de leche granizado = $ 13.200 − 10% = **$ 11.880**. Con 12 bolas aplica 15%.

### TODO 7 — Dibujar el carrito
`renderCarrito` muestra los items, los totales y deshabilita los botones cuando el carrito está vacío.
**Para verificar:** los botones `+`, `−` y `✕` funcionan (el código de eventos ya está hecho).

### TODO 8 — Confirmar el pedido
`finalizarPedido` descuenta stock, agrega el pedido al historial, vacía el carrito y muestra el resumen.
**Para verificar:** después de confirmar, el "Quedan N" de las tarjetas baja y aparece el mensaje con el total.

### TODO 9 — Estadísticas
Siete funciones chiquitas, cada una con un método de array distinto (`reduce`, `filter`, `every`, `flatMap`, etc.).
**Valores esperados con los datos originales:**

| Estadística | Resultado |
|---|---|
| Precio promedio | $ 2.175 |
| Sabor más caro | Mascarpone con frutos del bosque ($ 2.600) |
| Por categoría | Dulces de leche 3, Chocolates 3, Cremas 6, Frutales 4 |
| Sin stock | Súper dulce de leche, Maracuyá |
| ¿Frutales veganos? | Sí |
| Ingresos de pedidos cargados | $ 57.800 |
| Top 3 más pedidos | Dulce de leche granizado (5), Frambuesa (4), Chocolate amargo (3) |

### TODO 10 — Dibujar las estadísticas
Armá un array de pares `[titulo, valor]` y convertilo en HTML con `.map` + `tarjetaStat`.
**Para verificar:** el "Panel del día" muestra 8 tarjetas y se actualiza solo al confirmar un pedido.

## Checklist final

- [ ] No hay errores en la consola
- [ ] Los 4 filtros se pueden combinar entre sí
- [ ] No se puede pedir más que el stock disponible
- [ ] El descuento se aplica y se muestra con el porcentaje
- [ ] Al confirmar, cambian el stock, el historial y las estadísticas
- [ ] No usaste ningún `for` ni `while` (todo con métodos de array)

## Bonus para seguir

1. **Persistencia:** guardá `estado.carrito` en `localStorage` y restauralo al cargar la página.
2. **Cliente:** agregá un input con el nombre del cliente y usalo en `finalizarPedido` en vez de "Mostrador".
3. **Historial:** mostrá la lista de pedidos con cliente, fecha y total, usando `.map` y `.reduce`.
4. **Más estadísticas:** ventas por categoría, el día con más ingresos (agrupá por `fecha`), o el cliente que más gastó.
5. **Combos:** sumá una promoción "3 sabores veganos distintos" y usá `.some` / `.every` para validarla.
6. **Un servidor de verdad:** reemplazá el JSON por [json-server](https://github.com/typicode/json-server) para poder guardar los pedidos con `fetch` y `POST`.

## Si te trabás

1. Mirá la consola del navegador: casi siempre dice en qué línea falló.
2. Poné `console.log` dentro del `.map` o `.reduce` para ver qué recibe cada vuelta.
3. Recordá que `.sort()` **modifica** el array original y `.map` / `.filter` devuelven uno nuevo.
4. Si seguís sin salir, mirá solo la función que te trabó en `app.solucion.js`. Para probar la solución completa, cambiá en `index.html` el `<script src="app.js">` por `<script src="app.solucion.js">`.
