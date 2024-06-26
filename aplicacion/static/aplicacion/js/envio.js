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
    document.getElementById('formularioEnvio').addEventListener('submit', function (event) {
        event.preventDefault();
    
        let nombre = document.getElementById('nombre').value;
        let email = document.getElementById('email').value;
        let telefono = document.getElementById('telefono').value;
        let region = document.getElementById('region').value;
        let ciudad = document.getElementById('ciudad').value;
        let direccion = document.getElementById('direccion').value;
        let totalCompra = parseFloat(document.getElementById('total').textContent.replace('Total: $', '').replace(',', ''));
    
        // Obtener los productos del carrito desde localStorage
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
        // Crear una lista de productos para enviar al servidor
        let productosOrden = [];
        carrito.forEach(item => {
            productosOrden.push({
                producto_id: item.producto.id,
                cantidad: item.cantidad,
                precio_unitario: parseFloat(item.producto.precio.replace('$', '').replace(/\./g, '').replace(',', '.'))
            });
        });
    
        // Enviar datos al servidor Django
        fetch('/crear_orden/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken'),  // Obtener el token CSRF
            },
            body: JSON.stringify({
                nombre: nombre,
                email: email,
                telefono: telefono,
                region: region,
                ciudad: ciudad,
                direccion: direccion,
                total: totalCompra,
                productos: productosOrden
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error al crear la orden de compra');
            }
        })
        .then(data => {
            console.log(data);  // Manejar la respuesta si es necesario
            localStorage.removeItem('carrito');  // Limpiar el carrito después de la compra
            window.location.href = pagoUrl;  // Redirigir a la página de pago
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ha ocurrido un error al procesar la orden de compra.');
        });
    });
    
    // Función para obtener el valor del token CSRF
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.startsWith(name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
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

// Evento para cargar ciudades cuando cambia la región seleccionada
document.getElementById("region").addEventListener("change", cargarCiudades);

// Llamar a cargarCiudades() al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    cargarCiudades(); // Cargar ciudades inicialmente al cargar la página
});

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
const pagoUrl = document.getElementById('data-url').dataset.pagoUrl;

// Función para redirigir a la página de pago
function irAPagar() {
    window.location.href = pagoUrl;
}