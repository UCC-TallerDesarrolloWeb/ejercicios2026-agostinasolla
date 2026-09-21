/**
 * Conversion de unidades de metros, pies, yardas y pulgadas
 * @method convertirunidades
 * @param {string} Id - Id del elemento input en el html
 * @param {number} valor - valor ingresado por el usuario
 */

convertirunidades = (id, valor) => {
    let metro, pulgada, pie, yarda;
    valor = valor.replace(",",".");

    if (isNaN(valor)){
        alert("Se ingreso un valor incorrecto: " + id);
        metro = " ";
        pie = " ";
        pulgada = " ";
        yarda = " ";
        
    }
    else if (id === "metro"){
        metro = valor;
        pulgada = valor*39; 
        pie = valor*3.2804;
        yarda = valor*1.09361;
    }
    else if (id == "pulgada"){
        pulgada = valor;
        metro = valor*0.0254;
        pie = valor*0.08333;
        yarda = valor*0.0277;
    }
    else if (id == "pie"){
        pie = valor;
        pulgada = valor*12;
        metro = valor*0.304;
        yarda = valor*0.333;
    }
    else if (id == "yarda"){
        yarda = valor;
        pulgada = valor*36;
        metro = valor*0.914;
        pie = valor*3;
    }
    document.getElementById("metro").value = Math.round(metro*100)/100;
    document.getElementById("pie").value = Math.round(pie*100)/100;
    document.getElementById("pulgada").value = pulgada.toFixed(2);
    document.getElementById("yarda").value = yarda.toFixed(2);
}


function convertirGr(id){
    let grad, rad;

    if(id == "grados"){
        grad = document.getElementById("grados").value;
        rad = grad * Math.PI/180; 
    }
    else{ 
        rad = document.getElementById("radianes").value;
        grad = rad * 180/Math.PI;
    }
    document.getElementById("grados").value = grad;
    document.getElementById("radianes").value = rad;
}

/**
 * Mostrar u ocultar div segun seleccion del usuario
 * @method mostrarocultar
 * @param {string} valor - Valor del Id del radio button seleccionado
*/
mostrarocultar = (valor) => {
    const displayDiv = valor === "val_mostrar" ? 'block': 'none';
    document.getElementById("undiv").style.display = displayDiv;
    /** 
    if (valor === "val_mostrar"){
        document.getElementById("unDiv").style.display = "block";
    }
    else{
        document.getElementById("unDiv").style.display = "none";
    }
*/
}

/**
 * Calcula la suma de dos valores ingresados por el usuario
 * @method calcularsum()
 */
calcularSum = () =>{
    let sum1, sum2;
    sum1 = number(document.getElementById("num1").value);
    sum2 = number(document.getElementById("num2").value);
    document.getElementById("totalS").value = sum1 + sum2
}
