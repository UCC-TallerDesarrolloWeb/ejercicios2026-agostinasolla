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
mostrarCatalogo = (newLista=productos) =>{
  let contenido = "";
  newLista.forEach((producto, id) => {
    contenido += `<div> 
                  <img src="https://ucc-tallerdesarrolloweb.github.io/filminas/images/ejercicios/$(producto.imagen)" alt=$(producto.nombre)>
                  <p>${producto.nombre}</p>
                  <p>${producto.precio}</p>
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
  let total = 0;
  const listProd =[];
  const listCant = [];
  carritoList.forEach((num) => {
      if(listProd.includes(num)){
      listProd.push(num);
      listCant.push(1);
    }
    else{
      const inx = listProd.indexOf(num);
      listCant[inx]+=1;
    }
  })
  carritoList.forEach((num, id) => {
    contenido += `<div>
                    <h3> ${productos[num].nombre} </h3>
                    <p> ${productos[num].precio} </p>
                    <p> ${lisCant(id)}</p>
                    <button type="button" onclick="eliminarProducto(${id})">Eliminar producto</button>
                  </div>`;
    total += productos(num).precio;
  });
  contenido += `total: $(formatPrice(total))` 
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

let filtrarProductos =() =>{
  let searchWord = document.getElementById("search").value;
  let min = document.getElementById("price-min").value;
  let max = document.getElementById("price-max").value; 
  let marca = document.getElementById("marca").value;
  let prot=document.getElementById("protectores").checked;
  let entr=document.getElementById("entrenamiento").checked;
  let dob = document.getElementById("dobok").checked;
  let newLista = productos;

  if(searchWord){
    newLista = newLista.filter((prod) => prod.nombre.toLowerCase().includes(searchWord.toloweCase()))
  }

  if(min){
    newLista = newLista.filter((prod) => prod.precio >= min)
  }
  if(max){
    newLista = newLista.filter((prod) => prod.precio <= max)
  }
  if(marca != "Todas"){
    newLista=newLista.filter((prod) => prod.marca == marca)
  }
  let category = [];
  prot ? category.push("protectores") : "";
  entr ? category.push("entrenamiento"): "";
  dob ? category.push ("dobok"): "" ;

  if(category.length >0){
    newLista= newLista.filter((prod) => category.includes(prod.categoria))
  }
  mostrarCatalogo(newLista);
}
/**
 * Formatea el precio $35.000,55
 * @param {number} price 
 * @returns {number}  
 */
let formatPrice = (price) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS"
  }).format(price);
}
let contarProductos = () => {
  let carritoList = localStorage.getItem("carrito");
    carritoList= JSON.parse(carritoList);

    if(carritoList.length>0){
      document.getElementById("cant-prod").innerText = carritoList.length
    }
}
let ordenarCatalogo = () => {
  const opt = document.getElementById("order").value;
  let newProductos;
  switch(opt){
    case "menor":
      newProductos = producto.sort((a,b) => a.precio - b.precio);
      break;
      case "mayor":
      newProductos = producto.sort((a,b) => b.precio - a.precio);
      break;
      case "a-z":
      newProductos = producto.sort(() => {
        if(a.nombre.toLowerCase()<b.nombre.toLowerCase()){
          return -1;
        }
        else{
          return 1;
        }
      });
      break;
      case "z-a":
      newProductos = producto.sort(() => {
        if(a.nombre.toLowerCase()>b.nombre.toLowerCase()){
          return -1;
        }
        else{
          return 1;
        }
      });
      break;
      default:
        newProductos= productos;
  }
  mostrarCatalogo();
}