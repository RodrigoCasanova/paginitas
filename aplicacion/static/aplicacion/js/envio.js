// Función para cargar ciudades según la región seleccionada
function cargarCiudades() {
    const regionSeleccionada = document.getElementById("region").value;
    const ciudadDropdown = document.getElementById("ciudad");
    ciudadDropdown.innerHTML = '<option value="">Selecciona una ciudad</option>';
    const ciudades = ciudadesPorRegion[regionSeleccionada];
    if (ciudades) {
        ciudades.forEach(ciudad => {
            const opcion = document.createElement("option");
            opcion.text = ciudad;
            opcion.value = ciudad;
            ciudadDropdown.add(opcion);
        });
    }
}

// Validación y carga de datos del carrito
document.addEventListener('DOMContentLoaded', function () {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    let detalleCompra = document.getElementById('detalleCompra');
    let totalCompra = 0;

    carrito.forEach(item => {
        let productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');

        productoDiv.innerHTML = `
            <div>
                <img src="${item.imagenSrc}" alt="${item.titulo}" class="product-image">
                <span>${item.titulo}</span>
            </div>
            <div>
                <span>Cantidad: ${item.cantidad}</span>
            </div>
        `;

        detalleCompra.appendChild(productoDiv);
        totalCompra += parseFloat(item.precio.replace('$', '').replace(/\./g, '').replace(',', '.')) * item.cantidad;
    });

    document.getElementById('totalCompra').textContent = '$' + totalCompra.toLocaleString('es-CL', { minimumFractionDigits: 0 });

    document.getElementById('region').addEventListener('change', cargarCiudades);
});

// Evento para validar el formulario de envío
document.getElementById('formularioEnvio').addEventListener('submit', function (event) {
    event.preventDefault();

    let nombre = document.getElementById('nombre').value;
    let email = document.getElementById('email').value;
    let telefono = document.getElementById('telefono').value;
    let region = document.getElementById('region').value;
    let ciudad = document.getElementById('ciudad').value;
    let direccion = document.getElementById('direccion').value;

    if (nombre && email && telefono && region && ciudad && direccion) {
        let datosEnvio = {
            nombre: nombre,
            email: email,
            telefono: telefono,
            region: region,
            ciudad: ciudad,
            direccion: direccion
        };

        sessionStorage.setItem('datosEnvio', JSON.stringify(datosEnvio));
        mostrarAlerta(region, ciudad, direccion);
    } else {
        alert('Por favor, completa todos los campos del formulario.');
    }
});

// Función para mostrar la alerta de envío comprobado
function mostrarAlerta(region, ciudad, direccion) {
    let alerta = document.getElementById('alerta');
    alerta.style.display = 'block';
    alerta.innerHTML = `<strong>Envío comprobado:</strong> ${region}, ${ciudad}, ${direccion} su pedido llegaria en 5 dias`;
}

// Mapa de ciudades por región
const ciudadesPorRegion = {
    "Arica y Parinacota": ["Arica", "Putre"],
    "Tarapacá": ["Iquique", "Alto Hospicio", "Pozo Almonte"],
    "Antofagasta": ["Antofagasta", "Calama", "Mejillones"],
    "Atacama": ["Copiapó", "Caldera", "Chañaral"],
    "Coquimbo": ["La Serena", "Coquimbo", "Ovalle"],
    "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué"],
    "Metropolitana de Santiago": ["Santiago", "Puente Alto", "Las Condes"],
    "Libertador General Bernardo O'Higgins": ["Rancagua", "San Fernando", "Pichilemu"],
    "Maule": ["Talca", "Curicó", "Linares"],
    "Ñuble": ["Chillán", "San Carlos", "Bulnes"],
    "Biobío": ["Concepción", "Los Ángeles", "Talcahuano"],
    "La Araucanía": ["Temuco", "Villarrica", "Angol"],
    "Los Ríos": ["Valdivia", "La Unión", "Río Bueno"],
    "Los Lagos": ["Puerto Montt", "Osorno", "Castro"],
    "Aysén del General Carlos Ibáñez del Campo": ["Coyhaique", "Puerto Aysén", "Chile Chico"],
    "Magallanes y de la Antártica Chilena": ["Punta Arenas", "Puerto Natales", "Porvenir"]
};
    function validateForm() {
        // Validar formulario de envío
        var formEnvio = document.getElementById('formularioEnvio');
        if (!formEnvio.checkValidity()) {
            formEnvio.reportValidity();
            return;
        }

        // Validar formulario de pago
        var formPago = document.getElementById('formularioPago');
        if (!formPago.checkValidity()) {
            formPago.reportValidity();
            return;
        }

        // Mostrar alerta si los formularios no están completos
        var alertaFormularios = document.getElementById('alertaFormularios');
        alertaFormularios.style.display = 'none'; // Ocultar la alerta si ya está mostrada

        // Si ambos formularios son válidos, habilitar el botón "Confirmar Pedido"
        var confirmarPedidoBtn = document.getElementById('confirmarPedidoBtn');
        confirmarPedidoBtn.disabled = false;

        // Aquí podrías agregar más lógica, como enviar el formulario o realizar alguna acción adicional
    }