"use strict";

/* ==========================================================
   HELADERÍA — SOLUCIÓN
   Intentá resolver el ejercicio solo antes de mirar esto.
   Para probarla: en index.html cambiá  <script src="app.js">
   por  <script src="app.solucion.js">
   ========================================================== */

const RUTA_DB = "data/db.json";

const estado = {
  heladeria: null,
  sabores: [],
  pedidos: [],
  promociones: [],
  carrito: [],
  filtros: { texto: "", categoria: "todas", vegano: false, sinTacc: false, orden: "nombre" },
};

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

const formatearPrecio = (numero) =>
  numero.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });

const mostrarMensaje = (texto) => {
  els.mensaje.textContent = texto;
};

/* ---------- 1. Cargar datos ---------- */
const cargarDatos = async () => {
  const respuesta = await fetch(RUTA_DB);
  if (!respuesta.ok) throw new Error(`No se pudo leer ${RUTA_DB} (${respuesta.status})`);
  const db = await respuesta.json();

  estado.heladeria = db.heladeria;
  estado.sabores = db.sabores;
  estado.pedidos = db.pedidos;
  estado.promociones = db.promociones;
};

/* ---------- 2. Encabezado y categorías ---------- */
const renderEncabezado = () => {
  els.nombre.textContent = estado.heladeria.nombre;
  els.eslogan.textContent = estado.heladeria.eslogan;
  document.title = estado.heladeria.nombre;
};

const obtenerCategorias = () => [...new Set(estado.sabores.map((sabor) => sabor.categoria))];

const renderCategorias = () => {
  const opciones = obtenerCategorias()
    .map((categoria) => `<option value="${categoria}">${categoria}</option>`)
    .join("");
  els.categoria.innerHTML = `<option value="todas">Todas las categorías</option>${opciones}`;
};

/* ---------- 3. Filtrar y ordenar ---------- */
const comparadores = {
  nombre: (a, b) => a.nombre.localeCompare(b.nombre, "es"),
  "precio-asc": (a, b) => a.precio - b.precio,
  "precio-desc": (a, b) => b.precio - a.precio,
  stock: (a, b) => b.stock - a.stock,
};

const filtrarSabores = () => {
  const { texto, categoria, vegano, sinTacc, orden } = estado.filtros;
  const busqueda = texto.trim().toLowerCase();

  return estado.sabores
    .filter((s) => s.nombre.toLowerCase().includes(busqueda))
    .filter((s) => categoria === "todas" || s.categoria === categoria)
    .filter((s) => !vegano || s.vegano)
    .filter((s) => !sinTacc || s.sinTacc)
    .sort(comparadores[orden]); // filter ya devolvió un array nuevo, así que no mutamos el estado
};

/* ---------- 4. Catálogo ---------- */
const cantidadEnCarrito = (id) => estado.carrito.find((item) => item.id === id)?.cantidad ?? 0;

const tarjetaSabor = (sabor) => {
  const disponible = sabor.stock - cantidadEnCarrito(sabor.id);
  const agotado = disponible <= 0;
  const etiquetas = [sabor.vegano && "Vegano", sabor.sinTacc && "Sin TACC"]
    .filter(Boolean)
    .map((etiqueta) => `<li>${etiqueta}</li>`)
    .join("");

  return `
    <article class="sabor ${agotado ? "sabor--agotado" : ""}">
      <div class="sabor__bola" style="--color: ${sabor.color}" aria-hidden="true"></div>
      <h3>${sabor.nombre}</h3>
      <p class="sabor__desc">${sabor.descripcion}</p>
      <ul class="etiquetas">${etiquetas}</ul>
      <div class="sabor__pie">
        <strong>${formatearPrecio(sabor.precio)}</strong>
        <button class="btn" data-accion="agregar" data-id="${sabor.id}" ${agotado ? "disabled" : ""}>
          ${agotado ? "Sin stock" : "Agregar"}
        </button>
      </div>
      <small class="sabor__stock">Quedan ${Math.max(disponible, 0)}</small>
    </article>`;
};

const renderCatalogo = () => {
  const sabores = filtrarSabores();
  els.contador.textContent = `${sabores.length} sabor${sabores.length === 1 ? "" : "es"}`;
  els.lista.innerHTML = sabores.length
    ? sabores.map(tarjetaSabor).join("")
    : `<p class="vacio">No hay sabores con esos filtros. Probá sacar alguno.</p>`;
};

/* ---------- 5. Carrito ---------- */
const agregarAlCarrito = (id) => {
  const sabor = estado.sabores.find((s) => s.id === id);
  if (!sabor) return;

  if (cantidadEnCarrito(id) >= sabor.stock) {
    mostrarMensaje(`No queda más stock de ${sabor.nombre}.`);
    return;
  }

  const item = estado.carrito.find((i) => i.id === id);
  if (item) {
    item.cantidad++;
  } else {
    estado.carrito.push({ id, cantidad: 1 });
  }

  mostrarMensaje("");
  actualizarVista();
};

const cambiarCantidad = (id, delta) => {
  const item = estado.carrito.find((i) => i.id === id);
  const sabor = estado.sabores.find((s) => s.id === id);
  if (!item || !sabor) return;

  const nueva = item.cantidad + delta;
  if (nueva <= 0) return quitarDelCarrito(id);
  if (nueva > sabor.stock) {
    mostrarMensaje(`No queda más stock de ${sabor.nombre}.`);
    return;
  }

  item.cantidad = nueva;
  mostrarMensaje("");
  actualizarVista();
};

const quitarDelCarrito = (id) => {
  estado.carrito = estado.carrito.filter((item) => item.id !== id);
  actualizarVista();
};

const vaciarCarrito = () => {
  estado.carrito = [];
  mostrarMensaje("");
  actualizarVista();
};

/* ---------- 6. Totales ---------- */
const detalleCarrito = () =>
  estado.carrito.map(({ id, cantidad }) => {
    const sabor = estado.sabores.find((s) => s.id === id);
    return { ...sabor, cantidad, subtotal: sabor.precio * cantidad };
  });

const calcularTotales = () => {
  const items = detalleCarrito();
  const subtotal = items.reduce((acc, item) => acc + item.subtotal, 0);
  const bolas = items.reduce((acc, item) => acc + item.cantidad, 0);

  const promo =
    estado.promociones
      .filter((p) => bolas >= p.minimoBolas)
      .sort((a, b) => b.porcentaje - a.porcentaje)[0] ?? null;

  const descuento = promo ? Math.round((subtotal * promo.porcentaje) / 100) : 0;

  return { subtotal, bolas, promo, descuento, total: subtotal - descuento };
};

/* ---------- 7. Render del carrito ---------- */
const itemCarrito = ({ id, nombre, precio, cantidad, subtotal }) => `
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
  </li>`;

const renderCarrito = () => {
  const items = detalleCarrito();
  const { subtotal, promo, descuento, total } = calcularTotales();

  els.carrito.innerHTML = items.length
    ? items.map(itemCarrito).join("")
    : `<li class="vacio">Todavía no elegiste sabores.</li>`;

  els.subtotal.textContent = formatearPrecio(subtotal);
  els.descuento.textContent = promo
    ? `−${formatearPrecio(descuento)} (${promo.porcentaje}%)`
    : formatearPrecio(0);
  els.total.textContent = formatearPrecio(total);

  els.btnFinalizar.disabled = items.length === 0;
  els.btnVaciar.disabled = items.length === 0;
};

const actualizarVista = () => {
  renderCatalogo();
  renderCarrito();
};

/* ---------- 8. Confirmar pedido ---------- */
const finalizarPedido = () => {
  if (estado.carrito.length === 0) return;

  const { total } = calcularTotales();
  const resumen = detalleCarrito()
    .map(({ cantidad, nombre }) => `${cantidad} × ${nombre}`)
    .join(", ");

  estado.sabores = estado.sabores.map((sabor) => {
    const item = estado.carrito.find((i) => i.id === sabor.id);
    return item ? { ...sabor, stock: sabor.stock - item.cantidad } : sabor;
  });

  estado.pedidos.push({
    id: estado.pedidos.length + 1,
    cliente: "Mostrador",
    fecha: new Date().toISOString().slice(0, 10),
    items: estado.carrito.map(({ id, cantidad }) => ({ saborId: id, cantidad })),
  });

  estado.carrito = [];
  mostrarMensaje(`Pedido confirmado: ${resumen}. Total ${formatearPrecio(total)}.`);
  actualizarVista();
  renderEstadisticas();
};

/* ---------- 9. Estadísticas ---------- */
const precioPromedio = () =>
  estado.sabores.reduce((acc, s) => acc + s.precio, 0) / estado.sabores.length;

const saborMasCaro = () =>
  estado.sabores.reduce((max, s) => (s.precio > max.precio ? s : max));

const saboresPorCategoria = () =>
  estado.sabores.reduce(
    (acc, s) => ({ ...acc, [s.categoria]: (acc[s.categoria] ?? 0) + 1 }),
    {}
  );

const nombresSinStock = () =>
  estado.sabores
    .filter((s) => s.stock === 0)
    .map((s) => s.nombre)
    .join(", ");

const todosLosFrutalesSonVeganos = () =>
  estado.sabores.filter((s) => s.categoria === "Frutales").every((s) => s.vegano);

const ingresosPedidos = () =>
  estado.pedidos
    .flatMap((pedido) => pedido.items)
    .reduce((acc, { saborId, cantidad }) => {
      const sabor = estado.sabores.find((s) => s.id === saborId);
      return acc + (sabor ? sabor.precio * cantidad : 0);
    }, 0);

const rankingPedidos = () => {
  const porSabor = estado.pedidos
    .flatMap((pedido) => pedido.items)
    .reduce((acc, { saborId, cantidad }) => ({ ...acc, [saborId]: (acc[saborId] ?? 0) + cantidad }), {});

  return Object.entries(porSabor)
    .map(([id, cantidad]) => ({
      nombre: estado.sabores.find((s) => s.id === Number(id))?.nombre ?? "Sabor desconocido",
      cantidad,
    }))
    .sort((a, b) => b.cantidad - a.cantidad)
    .slice(0, 3);
};

const tarjetaStat = (titulo, valor) => `
  <article class="stat">
    <h3>${titulo}</h3>
    <p>${valor}</p>
  </article>`;

/* ---------- 10. Render de estadísticas ---------- */
const renderEstadisticas = () => {
  const masCaro = saborMasCaro();

  const categorias = Object.entries(saboresPorCategoria())
    .map(([categoria, cantidad]) => `${categoria}: ${cantidad}`)
    .join(", ");

  const ranking = rankingPedidos()
    .map(({ nombre, cantidad }, i) => `${i + 1}. ${nombre} (${cantidad})`)
    .join("<br>");

  const tarjetas = [
    ["Sabores en carta", estado.sabores.length],
    ["Precio promedio por bola", formatearPrecio(precioPromedio())],
    ["Sabor más caro", `${masCaro.nombre} (${formatearPrecio(masCaro.precio)})`],
    ["Sabores por categoría", categorias],
    ["Los más pedidos", ranking],
    ["Sin stock", nombresSinStock() || "Ninguno"],
    ["Ingresos de los pedidos cargados", formatearPrecio(ingresosPedidos())],
    ["¿Todos los frutales son veganos?", todosLosFrutalesSonVeganos() ? "Sí" : "No"],
  ];

  els.estadisticas.innerHTML = tarjetas.map(([titulo, valor]) => tarjetaStat(titulo, valor)).join("");
};

/* ---------- Eventos ---------- */
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

/* ---------- Arranque ---------- */
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
