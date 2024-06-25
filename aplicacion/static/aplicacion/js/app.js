let carritoVisible = false;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    // Event listeners para botones de eliminar item
    let botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for (let i = 0; i < botonesEliminarItem.length; i++) {
        let button = botonesEliminarItem[i];
        button.addEventListener('click', eliminarItemCarrito);
    }

    // Event listeners para botones de sumar cantidad
    let botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for (let i = 0; i < botonesSumarCantidad.length; i++) {
        let button = botonesSumarCantidad[i];
        button.addEventListener('click', sumarCantidad);
    }

    // Event listeners para botones de restar cantidad
    let botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for (let i = 0; i < botonesRestarCantidad.length; i++) {
        let button = botonesRestarCantidad[i];
        button.addEventListener('click', restarCantidad);
    }

    // Event listeners para botones de agregar al carrito
    let botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for (let i = 0; i < botonesAgregarAlCarrito.length; i++) {
        let button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }

    // Event listener para el botón de pagar
    document.querySelector('.btn-pagar').addEventListener('click', pagarClicked);
}

function agregarAlCarritoClicked(event) {
    console.log('Botón Agregar al Carrito clickeado');
    let button = event.target;
    let item = button.parentElement;
    let titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    let precio = item.getElementsByClassName('precio-item')[0].innerText;
    let imagenSrc = item.getElementsByClassName('img-item')[0].src;

    agregarItemAlCarrito(titulo, precio, imagenSrc);

    hacerVisibleCarrito();
}

function agregarItemAlCarrito(titulo, precio, imagenSrc, talla) {
    let itemsCarrito = document.querySelector('.carrito-items');

    // Crear el nuevo item de carrito
    let item = document.createElement('div');
    item.classList.add('carrito-item');
    let itemCarritoContenido = `
        <img src="${imagenSrc}" width="80px" alt="">
        <div class="carrito-item-detalles">
            <span class="carrito-item-titulo">${titulo}</span>
            <div class="selector-cantidad">
                <i class="fa-solid fa-minus restar-cantidad"></i>
                <input type="text" value="1" class="carrito-item-cantidad" disabled>
                <i class="fa-solid fa-plus sumar-cantidad"></i>
            </div>
            <div class="carrito-precio-info">
                <span class="carrito-item-precio">${precio}</span>
                <span class="carrito-item-subtotal">${precio}</span> <!-- Subtotal oculto -->
            </div>
        </div>
        <form method="post" action="{% url 'eliminar_del_carrito' item.id %}">
            <button type="submit" class="btn-eliminar">Eliminar</button>
        </form>
    `;
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.appendChild(item);

    // Agregar event listeners a los botones del nuevo item
    item.querySelector('.btn-eliminar').addEventListener('click', eliminarItemCarrito);
    item.querySelector('.restar-cantidad').addEventListener('click', restarCantidad);
    item.querySelector('.sumar-cantidad').addEventListener('click', sumarCantidad);

    actualizarTotalCarrito(); // Actualizar el total del carrito después de agregar un artículo
}

function eliminarItemCarrito(event) {
    let buttonClicked = event.target.closest('.carrito-item');
    buttonClicked.remove();  // Elimina solo el ítem específico
    actualizarTotalCarrito();
    ocultarCarrito(); // Verifica si el carrito necesita ser ocultado
}

function sumarCantidad(event) {
    let buttonClicked = event.target;
    let selector = buttonClicked.parentElement;
    let cantidadActual = parseInt(selector.querySelector('.carrito-item-cantidad').value);
    cantidadActual++;
    selector.querySelector('.carrito-item-cantidad').value = cantidadActual;
    actualizarTotalCarrito();
}

function restarCantidad(event) {
    let buttonClicked = event.target;
    let selector = buttonClicked.parentElement;
    let cantidadActual = parseInt(selector.querySelector('.carrito-item-cantidad').value);
    cantidadActual--;
    if (cantidadActual >= 1) {
        selector.querySelector('.carrito-item-cantidad').value = cantidadActual;
        actualizarTotalCarrito();
    }
}

function actualizarTotalCarrito() {
    let carritoItems = document.querySelectorAll('.carrito-item');
    let total = 0;
    carritoItems.forEach(item => {
        let precioElemento = item.querySelector('.carrito-item-precio');
        let precio = parseFloat(precioElemento.innerText.replace('$', ''));
        let cantidadItem = parseInt(item.querySelector('.carrito-item-cantidad').value);
        let subtotal = precio * cantidadItem;
        total += subtotal;

        // Actualizar el subtotal mostrado en el DOM
        item.querySelector('.carrito-item-subtotal').innerText = '$' + subtotal.toFixed(0);
    });
    total = Math.round(total * 100) / 100;

    document.querySelector('.carrito-total').innerHTML = `<strong>Total:</strong> $${total.toFixed(0)}`;
}

function ocultarCarrito() {
    let carritoItems = document.getElementsByClassName('carrito-items')[0];
    if (carritoItems.childElementCount === 0) { // Verifica si hay ítems en el carrito
        let carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;

        let items = document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}

function hacerVisibleCarrito() {
    carritoVisible = true;
    let carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    let items = document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
}

function pagarClicked() {
    let carritoItems = document.getElementsByClassName('carrito-items')[0];
    let items = carritoItems.getElementsByClassName('carrito-item');
    let carrito = [];

    for (let item of items) {
        let titulo = item.querySelector('.carrito-item-titulo').innerText;
        let cantidad = item.querySelector('.carrito-item-cantidad').value;
        let precio = item.querySelector('.carrito-item-precio').innerText;
        let imagenSrc = item.querySelector('img').src;

        carrito.push({
            titulo,
            cantidad,
            precio,
            imagenSrc
        });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Navegar a la página de detalles de compra
    window.location.href = "{% url 'detalleCompra' %}";
}

// Escuchar eventos de clic en botones para agregar al carrito
