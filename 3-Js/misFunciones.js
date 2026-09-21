/**
 * Conversion de unidades de metros, pies, yardas y pulgadas
 * @method convertirunidades
 * @param {string} Id - Id del elemento input en el html
 * @param {number} valor - valor ingresado por el usuario
 */

function convertirunidades(id, valor){
    if (isNaN(valor)){
        alert("Se ingreso un valor incorrecto: " + id);
        document.getElementById("pulgada").value = " "; 
        document.getElementById("pie").value = " ";
        document.getElementById("yarda").value = " ";
    }
    else if (id === "metro"){
        document.getElementById("pulgada").value = valor*39; 
        document.getElementById("pie").value = valor*3.2804;
        document.getElementById("yarda").value = valor*1.90361;
    }
    else if (id == "pulgada"){
        document.getElementById("metro").value = valor*0.0254;
        document.getElementById("pie").value = valor*0.08333;
        document.getElementById("yarda").value = valor*0.0277;
    }
    else if (id == "pie"){
        document.getElementById("pulgada").value = valor*12;
        document.getElementById("metro").value = valor*0.304;
        document.getElementById("yarda").value = valor*0.333;
    }
    else if (id == "yarda"){
        document.getElementById("pulgada").value = valor*36;
        document.getElementById("metro").value = valor*0.914;
        document.getElementById("pie").value = valor*3;
    }
}


function convertirGr(id){
    let grad, rad;

    if(id == "grados"){
        grad = document.getElementById("grados").value;
        rad = grad * Math.pI/180; 
    }
    else{ 
        rad = document.getElementById("radianes").value;
        grad = rad * 180/Math.PI;
    }
    document.getElementById("grados").value = grad;
    document.getElementById("radianes").value = rad;
}
