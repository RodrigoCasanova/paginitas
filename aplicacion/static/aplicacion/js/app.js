let csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
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
        let cantidad = parseInt(item.querySelector('.carrito-item-cantidad').textContent); // Usar textContent en lugar de value
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
            agregarItemAlCarritoDOM(titulo, precio, imagenSrc, productoId); // Pasar productoId a la función
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

function agregarItemAlCarritoDOM(titulo, precio, imagenSrc, productoId) {
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
    item.setAttribute('data-producto-id', productoId); // Establecer el atributo data-producto-id
    let itemCarritoContenido = `
        <img src="${imagenSrc}" width="80px" alt="">
        <div class="carrito-item-detalles">
            <span class="carrito-item-titulo">${titulo}</span>
            <div class="selector-cantidad">
                <span class="carrito-item-cantidad">1</span> <!-- Mostrar cantidad como texto estático -->
            </div>
            <span class="carrito-item-precio">${precio}</span>
        </div>
    `;
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.appendChild(item);

    // Agregar event listener al botón de eliminar del nuevo item (no se agrega más)

    actualizarTotalCarrito();
}

function eliminarItemCarrito(event) {
    // No necesitas implementar nada aquí porque hemos eliminado el botón de eliminar
}

function actualizarTotalCarrito() {
    let carritoItems = document.querySelectorAll('.carrito-item');
    let total = 0;
    carritoItems.forEach(item => {
        let precioElemento = item.querySelector('.carrito-item-precio');
        let precio = parseFloat(precioElemento.innerText.replace('$', ''));
        let cantidadItem = parseInt(item.querySelector('.carrito-item-cantidad').textContent); // Usar textContent en lugar de value
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
