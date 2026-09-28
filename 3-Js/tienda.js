const productos = [
  {
    nombre: "Cabezal Sparring",
    description: "Cabezal de Sparring.",
    categoria: "Protectores",
    marca: "Gran Marc",
    talle: ["1", "2", "3"],
    precio: 35000,
    web: "https://www.granmarctiendaonline.com.ar/productos/cabezal-cerrado/",
    imagen: "cabezal-cerrado.webp",
  },
  {
    nombre: "Dobok Dan",
    description: "Bobok aprobado para torneos internacionales.",
    categoria: "Dobok",
    marca: "Daedo",
    talle: ["1", "2", "3", "4", "5", "6", "7", "8"],
    precio: 115000,
    web: "https://www.daedo.com/products/taitf-10813",
    imagen: "dobok.webp",
  },
  {
    nombre: "Escudo de Potencia",
    description: "Escudo de potencia para entrenamientos.",
    categoria: "Entrenamiento",
    marca: "Gran Marc",
    talle: ["s/talle"],
    precio: 51700,
    web: "https://www.granmarctiendaonline.com.ar/productos/escudo-de-potencia-grande/",
    imagen: "escudo-potencia.webp",
  },
  {
    nombre: "Par de focos redondos",
    description: "Par de focos de 25cm x 25cm para hacer entrenamiento.",
    categoria: "Entrenamiento",
    marca: "Gran Marc",
    talle: ["s/talle"],
    precio: 15000,
    web: "https://www.granmarctiendaonline.com.ar/productos/foco-con-dedos/",
    imagen: "foco-con-dedos.webp",
  },
  {
    nombre: "Guantes 10 onzas",
    description:
      "Guantes de Sparring de 10 onzas habilitados para torneos internacionales",
    categoria: "Protectores",
    marca: "Daedo",
    talle: ["s/talle"],
    precio: 35000,
    web: "https://www.daedo.com/products/pritf-2020",
    imagen: "protectores-manos.webp",
  },
  {
    nombre: "Protectores Pie",
    description: "Protectores de Pie habilitados para torneos internacionales",
    categoria: "Protectores",
    marca: "Daedo",
    talle: ["XXS", "XS", "S", "M", "L", "XL"],
    precio: 35000,
    web: "https://www.daedo.com/collections/collection-itf-gloves/products/pritf-2022",
    imagen: "protectores-manos.webp",
  },
];

/**
 * Mostrar un modal con el detalle de producto
 * @method mostrarModal
 */
mostrarModal = (num) =>{
  document.getElementById("nombre-producto").innerText =productos(num).nombre;
  document.getElementById("descripcion-producto").innerText = productos(num).descripcion;
  document.getElementById("modal").style.display = 'block';
}

/**
 * Cerrar un modal con el detalle de producto
 * @method cerrarrModal
 */
cerrarModal = () =>{
  document.getElementById("modal").style.display = 'none';
}

/**
 * Mostrar catalogo de prodcutos
 * @method mostrarCatalogo()
 */
mostrarCatalogo = () =>{
  let contenido = "";
  productos.forEach((producto) => {
    contenido += `<div> 
                  <img src="https://ucc-tallerdesarrolloweb.github.io/filminas/images/ejercicios/$(producto.imagen)" alt=$(producto.nombre)>
                  <p>Cabezal cerrado</p>
                  <button type="button" onclick="mostrarModal(${id})">Ver detalle del producto</button>
                  <button type="button" onclick="agregarAlCarrito(${id})">Agregar al carrito</button>
                </div>`
  });
}
/**
 * Agregar prductos al carrito
 * @method agregarAlCarrito
 * @param {number} num -id del producto 
 */

agregarAlCarrito = (num) => {
  let carritoList = localStorage.getItem("carrito");
  console.log(carritoList);
  if(carritoList==[] || carritoList==null){
    carritoList = [];
  }
  else{
    carritoList = JSON.parse(carritoList);
  }
  carritoList.push(num)
  console.log(carritoList);
  localStorage.setItem("carrito", JSON.stringify(carritoList));
}
/**
 * Mostrar dinamicamente los productos que estan en el localStorage
 * @method mostrarCarrito
 */
mosrtarCarrito = () =>{
  let carritoList = localStorage.getItem("carrito");
  let contenido = "";

  if(carritoList==null){
    contenido=`<div>Su carrito de compras esta vacio</div>`
  }
  else{

  carritoList=JSON.parse(carritoList);
  carritoList.forEach((num, id) => {
    contenido += `<div>
                    <h3> ${productos[num].nombre} </h3>
                    <p> ${productos[num].precio} </h3>
                    <button type="button" onclick="eliminarProducto(${id})">Eliminar producto</button>
                  </div>`;
  });
  contenido += `<button type="button" onclick="vaciarCarrito()">vaciar carrito </button>`
}

  document.getElementById("carrito").innerHTML = contenido;

}
/**
 * Vaciar el carrito de compras eliminando el contenido del localStorage
 * @method vaciarCarrito()
 * 
 */
let vaciarCarrito = () => {
    localStorage.removeItem("carrito");
    window.location.reload();
  }
  /**
   * Elimina un producto puntual del localStorage
   * @param {number} id - Id del array del LocalStorage
   */

  let eliminarProducto = () => {
    let carritoList = localStorage.getItem("carrito");
    carritoList= JSON.parse(carritoList);
    carritoList.splice(id,1);

    if(carritoList.length >0){
    localStorage.setItem("carrito", JSON.stringify(carritoList));
    window.location.reload();
    }
    else{
localStorage.removeItem("carrito");
    }
  }