let csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    let botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for (let i = 0; i < botonesEliminarItem.length; i++) {
        let button = botonesEliminarItem[i];
        button.addEventListener('click', eliminarItemCarrito);
    }

    let botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for (let i = 0; i < botonesSumarCantidad.length; i++) {
        let button = botonesSumarCantidad[i];
        button.addEventListener('click', sumarCantidad);
    }

    let botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for (let i = 0; i < botonesRestarCantidad.length; i++) {
        let button = botonesRestarCantidad[i];
        button.addEventListener('click', restarCantidad);
    }

    let botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for (let i = 0; i < botonesAgregarAlCarrito.length; i++) {
        let button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarItemAlCarrito);
    }

    document.querySelector('.btn-pagar').addEventListener('click', pagarClicked);
}

function pagarClicked() {
    // Verificar si el carrito está vacío antes de redirigir
    let carritoItems = document.querySelectorAll('.carrito-item');
    if (carritoItems.length === 0) {
        alert("No hay elementos en el carrito para proceder al pago.");
        return;
    }

    // Recorrer los elementos del carrito y preparar los datos a enviar a detalleCompra
    let itemsParaDetalle = [];
    carritoItems.forEach(item => {
        let titulo = item.querySelector('.carrito-item-titulo').innerText;
        let cantidad = parseInt(item.querySelector('.carrito-item-cantidad').value);
        itemsParaDetalle.push({ titulo: titulo, cantidad: cantidad });
    });

    // Realizar la redirección a detalleCompra con los datos necesarios
    window.location.href = "/detalleCompra/";

    // Opcional: Limpiar el carrito después de pagar
    limpiarCarrito();
}

function agregarItemAlCarrito(event) {
    let button = event.currentTarget;
    let item = button.closest('.item');
    if (!item) {
        console.error('No se encontró el elemento .item asociado al botón');
        return;
    }
    let productoId = button.getAttribute('data-id');
    let titulo = item.querySelector('.titulo-item').innerText;
    let precio = item.querySelector('.precio-item').innerText;
    let imagenSrc = item.querySelector('.img-item').src;
    let talla = item.querySelector(`#talla-${productoId}`).value;

    fetch(`/agregar_al_carrito/${productoId}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify({ talla: talla })
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('La respuesta de red no fue exitosa.');
    }).then(data => {
        if (data.success) {
            // No mostrar alerta al agregar al carrito
            agregarItemAlCarritoDOM(titulo, precio, imagenSrc);
            hacerVisibleCarrito();
        } else {
            alert(data.message);
        }
    }).catch(error => {
        console.error('Hubo un problema con la operación de fetch:', error);
    });
}

function hacerVisibleCarrito() {
    let carrito = document.querySelector('.carrito');
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    let items = document.querySelector('.contenedor-items');
    items.style.width = '60%';
}

function agregarItemAlCarritoDOM(titulo, precio, imagenSrc) {
    let itemsCarrito = document.querySelector('.carrito-items');

    // Verificar si el item ya está en el carrito
    let nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for (let i = 0; i < nombresItemsCarrito.length; i++) {
        if (nombresItemsCarrito[i].innerText.trim() === titulo.trim()) {
            // Si el item ya está en el carrito, no hacer nada
            return;
        }
    }

    // Crear el nuevo item de carrito
    let item = document.createElement('div');
    item.classList.add('carrito-item');
    let itemCarritoContenido = `
        <img src="${imagenSrc}" width="80px" alt="">
        <div class="carrito-item-detalles">
            <span class="carrito-item-titulo">${titulo}</span>
            <div class="selector-cantidad">
                <i class="fa-solid fa-minus restar-cantidad"></i>
                <input type="number" value="1" min="1" class="carrito-item-cantidad">
                <i class="fa-solid fa-plus sumar-cantidad"></i>
            </div>
            <span class="carrito-item-precio">${precio}</span>
        </div>
        <button class="btn-eliminar">
            <i class="fa-solid fa-trash"></i>
        </button>
    `;
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.appendChild(item);

    // Agregar event listeners a los botones del nuevo item
    item.querySelector('.btn-eliminar').addEventListener('click', eliminarItemCarrito);
    item.querySelector('.restar-cantidad').addEventListener('click', restarCantidad);
    item.querySelector('.sumar-cantidad').addEventListener('click', sumarCantidad);

    actualizarTotalCarrito();
}

function sumarCantidad(event) {
    let buttonClicked = event.target;
    let selector = buttonClicked.closest('.selector-cantidad');
    let cantidadInput = selector.querySelector('.carrito-item-cantidad');
    let cantidadActual = parseInt(cantidadInput.value);
    cantidadActual++;
    cantidadInput.value = cantidadActual;

    actualizarTotalCarrito();
}

function restarCantidad(event) {
    let buttonClicked = event.target;
    let selector = buttonClicked.closest('.selector-cantidad');
    let cantidadInput = selector.querySelector('.carrito-item-cantidad');
    let cantidadActual = parseInt(cantidadInput.value);
    cantidadActual--;
    if (cantidadActual >= 1) {
        cantidadInput.value = cantidadActual;
        actualizarTotalCarrito();
    }
}

function eliminarItemCarrito(event) {
    let buttonClicked = event.target;
    let item = buttonClicked.closest('.carrito-item');
    if (!item) {
        return;
    }

    let productoId = item.getAttribute('data-producto-id');  // Obtener el ID del producto

    if (!productoId) {
        console.error('No se encontró el atributo data-producto-id en el elemento .carrito-item');
        return;
    }

    fetch(`/eliminar_del_carrito/${productoId}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
        },
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('La respuesta de red no fue exitosa.');
    }).then(data => {
        if (data.success) {
            // Eliminar visualmente el elemento del carrito
            item.remove();
            // Actualizar el total del carrito después de eliminar el elemento
            actualizarTotalCarrito();
            ocultarCarrito(); // Opcional: Ocultar el carrito si está vacío
        } else {
            alert(data.message);  // Mostrar mensaje de error si no se pudo eliminar
        }
    }).catch(error => {
        console.error('Hubo un problema con la operación de fetch:', error);
    });
}


function ocultarCarrito() {
    let carritoItems = document.querySelector('.carrito-items');
    if (!carritoItems || carritoItems.childElementCount === 0) {
        let carrito = document.querySelector('.carrito');
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';

        let items = document.querySelector('.contenedor-items');
        if (items) {
            items.style.width = '100%';
        }
    }
}

function actualizarTotalCarrito() {
    let carritoItems = document.querySelectorAll('.carrito-item');
    let total = 0;
    carritoItems.forEach(item => {
        let precioElemento = item.querySelector('.carrito-item-precio');
        let precio = parseFloat(precioElemento.innerText.replace('$', ''));
        let cantidadItem = parseInt(item.querySelector('.carrito-item-cantidad').value);
        total += precio * cantidadItem;
    });
    total = Math.round(total * 100) / 100;

    let carritoPrecioTotal = document.querySelector('.carrito-precio-total');
    if (carritoPrecioTotal) {
        carritoPrecioTotal.innerText = '$' + total.toFixed(2);
    }
}

function limpiarCarrito() {
    let carritoItems = document.querySelector('.carrito-items');
    while (carritoItems.firstChild) {
        carritoItems.removeChild(carritoItems.firstChild);
    }
    actualizarTotalCarrito();
}
