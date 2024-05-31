function mostrarFormulario() {
    let formulario = document.getElementById("formularioContainer");
    if (formulario.style.display === "" || formulario.style.display === "none") {
        formulario.style.display = "block";
    } else {
        formulario.style.display = "none";
    }
}

function agregarCamiseta() {
    let nombre = document.getElementById('nombre').value;
    let precio = document.getElementById('precio').value;

    // Verificar si el nombre y el precio están presentes
    if (nombre.trim() === '' || precio.trim() === '') {
        alert('Por favor ingresa tanto el nombre como el precio de la camiseta.');
        return; // Salir de la función si falta alguno de los campos
    }

    let imagen = document.getElementById('imagen').files[0];
    let imagenURL = URL.createObjectURL(imagen);

    let nuevaCamiseta = {
        nombre: nombre,
        precio: precio,
        imagen: imagenURL
    };
    camisetas.push(nuevaCamiseta);
    mostrarCamisetas();
    document.getElementById('formularioCamiseta').reset();
    let formulario = document.getElementById("formularioContainer");
    formulario.style.display = "none";
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


function eliminarCamisetaDesdeFormulario() {
    let index = document.getElementById("editIndex").value;
    camisetas.splice(index, 1);
    mostrarCamisetas();
    cancelarEdicion();
}

function guardarEdicion() {
    let index = document.getElementById("editIndex").value;
    let nuevoNombre = document.getElementById("editNombre").value;
    let nuevoPrecio = document.getElementById("editPrecio").value;

    // Verificar si el nuevo nombre y el nuevo precio están presentes
    if (nuevoNombre.trim() === '' || nuevoPrecio.trim() === '') {
        alert('Por favor, asegúrate de ingresar tanto el nombre como el precio de la camiseta.');
        return; // Salir de la función si falta alguno de los campos
    }

    // Eliminar el signo negativo del precio, si lo hay
    nuevoPrecio = nuevoPrecio.replace('-', '');

    camisetas[index].nombre = nuevoNombre;
    camisetas[index].precio = '$' + nuevoPrecio; // Agregar el símbolo de dólar
    mostrarCamisetas();
    cancelarEdicion();
}


function cancelarEdicion() {
    document.getElementById("formularioEditar").style.display = "none";
}

function mostrarCamisetas() {
    let contenedorItems = document.getElementById("contenedorItems");
    contenedorItems.innerHTML = "";

    camisetas.forEach(function (camiseta, index) {
        let itemHTML = `
                <div class="item">
                    <span class="titulo-item">${camiseta.nombre}</span>
                    <img src="${camiseta.imagen}" alt="" class="img-item">
                    <span class="precio-item">${camiseta.precio}</span>
                    <button class="boton-item" onclick="mostrarFormularioEdicion(${index})">Editar</button>
                </div>
            `;
        contenedorItems.innerHTML += itemHTML;
    });
}

window.onload = function () {
    mostrarCamisetas();
};

document.getElementById("precio").addEventListener("input", function(event) {
    let input = event.target.value;
    if (input.startsWith("-")) {
        event.target.value = input.slice(1); // Eliminar el signo negativo
    }
});
