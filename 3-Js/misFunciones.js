/**
 * Descripción
 * @method Nombre de la función
 * @param Parámetro A
 * @param Parámetro B
 * @return Valor que retorna
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
