function mostrarFormulario() {
    let formulario = document.getElementById("formularioContainer");
    if (formulario.style.display === "" || formulario.style.display === "none") {
        formulario.style.display = "block";
    } else {
        formulario.style.display = "none";
    }
}

let camisetas = [
    { nombre: "Camiseta Colo Colo 2024", precio: "$60.000", imagen: "img/coload.webp" },
    { nombre: "Camiseta de Universidad de Chiste", precio: "$1", imagen: "img/udechiste.jpg" },
    { nombre: "Camiseta Argentina Messi", precio: "$60.000", imagen: "img/argentina.jpg" },
    { nombre: "Camiseta de Real Madrid Monicius", precio: "$80.000", imagen: "img/real_madrid.png" },
    { nombre: "Camiseta de Manchester City", precio: "$79.990", imagen: "img/manchester.jpg" },
    { nombre: "Camiseta de Arsenal Gabriel Jesus", precio: "$79.990", imagen: "img/arsenal.jpg" },
    { nombre: "Camiseta de Barcelona", precio: "$79.990", imagen: "img/barca1.jpg" },
    { nombre: "Camiseta de Inter Barella", precio: "$79.990", imagen: "img/inter.jpg" },
    { nombre: "Camiseta de Juventus", precio: "$79.990", imagen: "img/juve.jpg" }
];

function mostrarFormularioEdicion(index) {
    let camiseta = camisetas[index];
    document.getElementById("editNombre").value = camiseta.nombre;
    document.getElementById("editPrecio").value = camiseta.precio.replace('$', ''); // Remover el símbolo de dólar
    document.getElementById("editIndex").value = index;
    document.getElementById("formularioEditar").style.display = "block";
    
    // Desplazarse hacia el formulario de edición
    document.getElementById('formularioEditar').scrollIntoView({ behavior: 'smooth' });
}



function cancelarEdicion() {
    document.getElementById("formularioEditar").style.display = "none";
}




