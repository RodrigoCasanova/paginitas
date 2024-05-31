const ciudadesPorRegion = {
    "Arica y Parinacota": ["Arica", "Putre"],
    "Tarapacá": ["Iquique", "Alto Hospicio"],
    "Antofagasta": ["Antofagasta", "Calama", "Tocopilla"],
    "Atacama": ["Copiapó", "Vallenar", "Chañaral"],
    "Coquimbo": ["La Serena", "Coquimbo", "Ovalle"],
    "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué"],
    "Metropolitana de Santiago": ["Santiago", "Maipú", "Puente Alto"],
    "Libertador General Bernardo O'Higgins": ["Rancagua", "Rengo", "San Fernando"],
    "Maule": ["Talca", "Curicó", "Linares"],
    "Ñuble": ["Chillán", "Chillán Viejo", "San Carlos"],
    "Biobío": ["Concepción", "Talcahuano", "Chillán"],
    "La Araucanía": ["Temuco", "Angol", "Victoria"],
    "Los Ríos": ["Valdivia", "La Unión", "Río Bueno"],
    "Los Lagos": ["Puerto Montt", "Osorno", "Puerto Varas"],
    "Aysén del General Carlos Ibáñez del Campo": ["Coyhaique", "Puerto Aysén", "Chile Chico"],
    "Magallanes y de la Antártica Chilena": ["Punta Arenas", "Puerto Natales", "Porvenir"]
};

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

function mostrarAlerta(region, ciudad, direccion) {
    let alertaExistente = document.getElementById('alerta');
    if (alertaExistente) {
        alertaExistente.remove();
    }
    let alerta = document.createElement('div');
    alerta.id = 'alerta';
    alerta.classList.add('alerta');
    alerta.innerHTML = `
        <p>Tu pedido será enviado a la región de ${region}, ciudad de ${ciudad}, a la dirección: ${direccion}. El pedido estaria llegando en 5 días.</p>
        <button class="boton" onclick="irAPagar()">Ir a Pagar</button>
    `;
    document.body.appendChild(alerta);
    scrollToAlerta(); // Llamar a la función de desplazamiento
}
function validarEmail(input) {
var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar correo electrónico
if (!regex.test(input.value)) {
    document.getElementById('email-error').innerText = "Por favor, introduce un correo electrónico válido.";
    input.classList.add('error-input');
} else {
    document.getElementById('email-error').innerText = "";
    input.classList.remove('error-input');
}
}

document.getElementById('email').addEventListener('input', function() {
validarEmail(this);
});
function validarTelefono(input) {
    let regex = /^\d+$/; // Expresión regular que permite solo números
    if (!regex.test(input.value)) {
        input.value = input.value.replace(/[^\d]/g, ''); // Limpiar el campo si se ingresa algo que no es número
    }
}

document.getElementById('telefono').addEventListener('input', function () {
    validarTelefono(this); // Llamar a la función de validación cuando se ingrese algo en el campo de teléfono
});


document.getElementById('telefono').addEventListener('input', function () {
    validarTelefono(this); // Llamar a la función de validación cuando se ingrese algo en el campo de teléfono
});

document.getElementById('formularioEnvio').addEventListener('submit', function (event) {
    event.preventDefault();

    let nombre = document.getElementById('nombre').value;
    let email = document.getElementById('email').value;
    let telefono = document.getElementById('telefono').value;
    let region = document.getElementById('region').value;
    let ciudad = document.getElementById('ciudad').value;
    let direccion = document.getElementById('direccion').value;

    if (nombre && email && telefono && region && ciudad && direccion) {
        mostrarAlerta(region, ciudad, direccion);
    } else {
        alert('Por favor, completa todos los campos del formulario.');
    }
});
function irAPagar() {
    window.location.href = 'pago.html';
}
function scrollToAlerta() {
    const alertaElement = document.getElementById("alerta");
    alertaElement.scrollIntoView({ behavior: "smooth" });
}