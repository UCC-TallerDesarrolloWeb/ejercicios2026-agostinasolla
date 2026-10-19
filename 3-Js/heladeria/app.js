"use strict";

/* ==========================================================
   HELADERÍA — Ejercicio de JavaScript

   Completá cada "TODO" en orden (están numerados del 1 al 10).
   Lo que NO tiene TODO ya viene hecho: leelo para entender cómo
   se conecta todo, pero no hace falta que lo cambies.

   Vas a practicar: arrays, funciones flecha, .map, .filter,
   .find, .reduce, .sort, .some, .every, .flatMap, spread,
   destructuring, template literals y async/await.
   ========================================================== */

const RUTA_DB = "data/db.json";

/* ---------- Estado de la app (YA HECHO) ----------
   sabor  = { id, nombre, categoria, precio, stock, vegano, sinTacc, color, descripcion }
   carrito = [ { id, cantidad } ]            <- guarda solo el id y la cantidad
   pedido = { id, cliente, fecha, items: [ { saborId, cantidad } ] }
*/
const estado = {
  heladeria: null,
  sabores: [],
  pedidos: [],
  promociones: [],
  carrito: [],
  filtros: { texto: "", categoria: "todas", vegano: false, sinTacc: false, orden: "nombre" },
};

/* ---------- Referencias al DOM (YA HECHO) ---------- */
const $ = (selector) => document.querySelector(selector);

const els = {
  nombre: $("#nombre-heladeria"),
  eslogan: $("#eslogan"),
  formFiltros: $("#filtros"),
  buscador: $("#buscador"),
  categoria: $("#filtro-categoria"),
  vegano: $("#filtro-vegano"),
  sinTacc: $("#filtro-sin-tacc"),
  orden: $("#orden"),
  contador: $("#contador-resultados"),
  lista: $("#lista-sabores"),
  carrito: $("#carrito-items"),
  subtotal: $("#subtotal"),
  descuento: $("#descuento"),
  total: $("#total"),
  btnFinalizar: $("#btn-finalizar"),
  btnVaciar: $("#btn-vaciar"),
  mensaje: $("#mensaje-pedido"),
  estadisticas: $("#estadisticas"),
};

/* ---------- Utilidades (YA HECHAS) ---------- */
const formatearPrecio = (numero) =>
  numero.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });

const mostrarMensaje = (texto) => {
  els.mensaje.textContent = texto;
};

/* ==========================================================
   TODO 1 — Cargar los datos (fetch + async/await)
   Leé RUTA_DB con fetch y guardá en `estado`:
   heladeria, sabores, pedidos y promociones.
   Si la respuesta no está ok (respuesta.ok), lanzá un Error.
   Pista: const respuesta = await fetch(RUTA_DB); await respuesta.json()
   ========================================================== */
const cargarDatos = async () => {
  // TODO 1
};

/* ==========================================================
   TODO 2 — Encabezado y categorías
   a) renderEncabezado: poné el nombre y el eslogan en els.nombre y els.eslogan.
   b) obtenerCategorias: devolvé un array con las categorías SIN repetir.
      Pista: .map() para sacar las categorías y new Set(...) con spread [...].
   c) renderCategorias: por cada categoría creá un <option value="...">...</option>
      con .map() + .join(""), y agregalas al select (dejá la opción "todas").
   ========================================================== */
const renderEncabezado = () => {
  // TODO 2a
};

const obtenerCategorias = () => {
  // TODO 2b
  return [];
};

const renderCategorias = () => {
  // TODO 2c
};

/* ==========================================================
   TODO 3 — Filtrar y ordenar (.filter, .includes, .sort)
   filtrarSabores debe devolver un array NUEVO con los sabores que cumplan:
     - el nombre incluye el texto buscado (ignorando mayúsculas)
     - la categoría coincide (o es "todas")
     - si "vegano" está tildado, solo veganos
     - si "sinTacc" está tildado, solo sin TACC
   Después ordenalos según estado.filtros.orden:
     "nombre" | "precio-asc" | "precio-desc" | "stock"
   Pistas:
     - Desestructurá: const { texto, categoria, vegano, sinTacc, orden } = estado.filtros;
     - .sort() MUTA el array: ordená una copia ([...array]).
     - Para nombres usá a.nombre.localeCompare(b.nombre, "es").
     - Podés guardar los comparadores en un objeto: { nombre: (a, b) => ..., ... }
   ========================================================== */
const filtrarSabores = () => {
  // TODO 3
  return estado.sabores;
};

/* ==========================================================
   TODO 4 — Dibujar el catálogo (.map + template literals)
   a) cantidadEnCarrito(id): cuántas bolas de ese sabor hay en el carrito
      (0 si no está). Pista: .find() y el operador ?. con ??
   b) tarjetaSabor(sabor): devuelve el HTML de UNA tarjeta. Usá esta estructura:

      <article class="sabor ${agotado ? "sabor--agotado" : ""}">
        <div class="sabor__bola" style="--color: ${sabor.color}" aria-hidden="true"></div>
        <h3>${sabor.nombre}</h3>
        <p class="sabor__desc">${sabor.descripcion}</p>
        <ul class="etiquetas"> ...un <li> por etiqueta ("Vegano", "Sin TACC")... </ul>
        <div class="sabor__pie">
          <strong>${formatearPrecio(sabor.precio)}</strong>
          <button class="btn" data-accion="agregar" data-id="${sabor.id}" ${agotado ? "disabled" : ""}>
            ${agotado ? "Sin stock" : "Agregar"}
          </button>
        </div>
        <small class="sabor__stock">Quedan ${disponible}</small>
      </article>

      disponible = stock - lo que ya está en el carrito. agotado = disponible <= 0.
      Pista para las etiquetas: [sabor.vegano && "Vegano", sabor.sinTacc && "Sin TACC"]
      .filter(Boolean).map(...).join("")
   c) renderCatalogo: usá filtrarSabores() y .map(tarjetaSabor).join("") para llenar
      els.lista. Actualizá els.contador ("3 sabores" / "1 sabor"). Si no hay
      resultados, mostrá <p class="vacio">No hay sabores con esos filtros. Probá sacar alguno.</p>
   ========================================================== */
const cantidadEnCarrito = (id) => {
  // TODO 4a
  return 0;
};

const tarjetaSabor = (sabor) => {
  // TODO 4b
  return "";
};

const renderCatalogo = () => {
  // TODO 4c
};

/* ==========================================================
   TODO 5 — Operaciones del carrito (.find, .filter, push)
   a) agregarAlCarrito(id):
      - buscá el sabor (.find). Si no existe, salí.
      - si ya hay tanta cantidad en el carrito como stock, mostrá un mensaje
        (mostrarMensaje) y salí.
      - si el sabor ya está en el carrito sumale 1; si no, hacé push({ id, cantidad: 1 }).
      - al final llamá a actualizarVista().
   b) cambiarCantidad(id, delta): suma o resta `delta` a la cantidad.
      - si queda en 0 o menos, quitá el sabor del carrito.
      - si supera el stock, mostrá un mensaje y no cambies nada.
   c) quitarDelCarrito(id): reemplazá estado.carrito por uno nuevo SIN ese id (.filter).
   d) vaciarCarrito(): dejá el carrito en [].
   Todas terminan con actualizarVista().
   ========================================================== */
const agregarAlCarrito = (id) => {
  // TODO 5a
};

const cambiarCantidad = (id, delta) => {
  // TODO 5b
};

const quitarDelCarrito = (id) => {
  // TODO 5c
};

const vaciarCarrito = () => {
  // TODO 5d
};

/* ==========================================================
   TODO 6 — Totales (.map con spread + .reduce)
   a) detalleCarrito(): devuelve un array con los datos completos de cada item:
        { ...sabor, cantidad, subtotal }   (subtotal = precio * cantidad)
      Pista: .map() sobre estado.carrito y .find() en estado.sabores.
   b) calcularTotales(): devuelve { subtotal, bolas, promo, descuento, total }
      - subtotal: suma de los subtotales (.reduce)
      - bolas: suma de las cantidades (.reduce)
      - promo: la promoción de MAYOR porcentaje cuyo minimoBolas <= bolas
               (o null si ninguna aplica). Pista: .filter + .sort + [0]
      - descuento: subtotal * porcentaje / 100, redondeado (Math.round). 0 si no hay promo.
      - total: subtotal - descuento
   ========================================================== */
const detalleCarrito = () => {
  // TODO 6a
  return [];
};

const calcularTotales = () => {
  // TODO 6b
  return { subtotal: 0, bolas: 0, promo: null, descuento: 0, total: 0 };
};

/* ==========================================================
   TODO 7 — Dibujar el carrito
   renderCarrito debe:
   - llenar els.carrito con un <li> por item (.map + .join). Estructura:

       <li class="item">
         <div class="item__info">
           <strong>${nombre}</strong>
           <span>${formatearPrecio(precio)} c/u</span>
         </div>
         <div class="item__controles">
           <button type="button" data-accion="restar" data-id="${id}" aria-label="Restar uno">−</button>
           <span>${cantidad}</span>
           <button type="button" data-accion="sumar" data-id="${id}" aria-label="Sumar uno">+</button>
           <button type="button" data-accion="quitar" data-id="${id}" aria-label="Quitar ${nombre}">✕</button>
         </div>
         <span class="item__subtotal">${formatearPrecio(subtotal)}</span>
       </li>

   - si el carrito está vacío: <li class="vacio">Todavía no elegiste sabores.</li>
   - mostrar subtotal, descuento (con el % si hay promo) y total
   - deshabilitar els.btnFinalizar y els.btnVaciar si el carrito está vacío
   ========================================================== */
const renderCarrito = () => {
  // TODO 7
};

/* ---------- Refresca todo lo visual que depende del carrito (YA HECHO) ---------- */
const actualizarVista = () => {
  renderCatalogo();
  renderCarrito();
};

/* ==========================================================
   TODO 8 — Confirmar el pedido
   finalizarPedido():
   - si el carrito está vacío, salí
   - descontá el stock de estado.sabores (.map, devolviendo un sabor nuevo
     con { ...sabor, stock: sabor.stock - cantidad } cuando corresponda)
   - agregá el pedido a estado.pedidos con push:
       { id: <siguiente id>, cliente: "Mostrador", fecha: "AAAA-MM-DD", items: [{ saborId, cantidad }] }
     Pista fecha: new Date().toISOString().slice(0, 10)
   - vaciá el carrito
   - mostrá un mensaje: "Pedido confirmado: 2 × Vainilla, 1 × Limón. Total $ 5.800."
   - actualizá la vista y las estadísticas
   Ojo: guardá el resumen y el total ANTES de vaciar el carrito.
   ========================================================== */
const finalizarPedido = () => {
  // TODO 8
};

/* ==========================================================
   TODO 9 — Estadísticas (reduce, flatMap, some, every...)
   Cada función devuelve un valor; renderEstadisticas los muestra.
   a) precioPromedio(): promedio de precio de todos los sabores (.reduce).
   b) saborMasCaro(): el objeto sabor con mayor precio (.reduce).
   c) saboresPorCategoria(): objeto { "Cremas": 5, "Chocolates": 3, ... } (.reduce).
   d) nombresSinStock(): string con los nombres de los sabores con stock 0,
      separados por coma (.filter + .map + .join).
   e) todosLosFrutalesSonVeganos(): true/false (.filter + .every).
   f) ingresosPedidos(): plata total de todos los pedidos cargados.
      Pista: estado.pedidos.flatMap((p) => p.items) y luego .reduce, buscando
      el precio de cada sabor con .find.
   g) rankingPedidos(): los 3 sabores más pedidos como [{ nombre, cantidad }, ...]
      de mayor a menor. Pista: flatMap + reduce a un objeto { saborId: cantidad },
      luego Object.entries, .map, .sort y .slice(0, 3).
   ========================================================== */
const precioPromedio = () => 0;               // TODO 9a
const saborMasCaro = () => ({ nombre: "-", precio: 0 }); // TODO 9b
const saboresPorCategoria = () => ({});       // TODO 9c
const nombresSinStock = () => "";             // TODO 9d
const todosLosFrutalesSonVeganos = () => false; // TODO 9e
const ingresosPedidos = () => 0;              // TODO 9f
const rankingPedidos = () => [];              // TODO 9g

const tarjetaStat = (titulo, valor) => `
  <article class="stat">
    <h3>${titulo}</h3>
    <p>${valor}</p>
  </article>`;

/* ==========================================================
   TODO 10 — Dibujar las estadísticas
   Armá un array de pares [titulo, valor] usando las funciones del TODO 9 y
   convertilo en HTML con .map(([titulo, valor]) => tarjetaStat(titulo, valor)).join("").
   Tarjetas sugeridas:
     "Sabores en carta", "Precio promedio por bola", "Sabor más caro",
     "Sabores por categoría", "Los más pedidos", "Sin stock",
     "Ingresos de los pedidos cargados", "¿Todos los frutales son veganos?"
   ========================================================== */
const renderEstadisticas = () => {
  // TODO 10
};

/* ---------- Eventos (YA HECHO) ----------
   Fijate cómo usamos "delegación de eventos": un solo listener en document
   y los botones dicen qué hacer con data-accion y data-id. */
const registrarEventos = () => {
  els.formFiltros.addEventListener("submit", (e) => e.preventDefault());

  els.buscador.addEventListener("input", (e) => {
    estado.filtros.texto = e.target.value;
    renderCatalogo();
  });
  els.categoria.addEventListener("change", (e) => {
    estado.filtros.categoria = e.target.value;
    renderCatalogo();
  });
  els.vegano.addEventListener("change", (e) => {
    estado.filtros.vegano = e.target.checked;
    renderCatalogo();
  });
  els.sinTacc.addEventListener("change", (e) => {
    estado.filtros.sinTacc = e.target.checked;
    renderCatalogo();
  });
  els.orden.addEventListener("change", (e) => {
    estado.filtros.orden = e.target.value;
    renderCatalogo();
  });

  const acciones = {
    agregar: (id) => agregarAlCarrito(id),
    sumar: (id) => cambiarCantidad(id, 1),
    restar: (id) => cambiarCantidad(id, -1),
    quitar: (id) => quitarDelCarrito(id),
  };

  document.addEventListener("click", (e) => {
    const boton = e.target.closest("[data-accion]");
    if (!boton) return;
    acciones[boton.dataset.accion]?.(Number(boton.dataset.id));
  });

  els.btnVaciar.addEventListener("click", vaciarCarrito);
  els.btnFinalizar.addEventListener("click", finalizarPedido);
};

/* ---------- Arranque (YA HECHO) ---------- */
const init = async () => {
  try {
    await cargarDatos();
    renderEncabezado();
    renderCategorias();
    registrarEventos();
    actualizarVista();
    renderEstadisticas();
  } catch (error) {
    els.lista.innerHTML = `
      <p class="vacio">No pudimos cargar la carta. ¿Abriste la página con un servidor local
      (y no con doble clic en el archivo)? Detalle: ${error.message}</p>`;
    console.error(error);
  }
};

init();
