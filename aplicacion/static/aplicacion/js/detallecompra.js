document.addEventListener('DOMContentLoaded', function() {
    let csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    function checkCartEmpty() {
        let carritoItems = document.querySelectorAll('.fila-item');
        let btnEnvio = document.querySelector('.btn-envio');
        if (carritoItems.length === 0) {
            btnEnvio.classList.add('disabled');
        } else {
            btnEnvio.classList.remove('disabled');
        }
    }

    document.querySelector('.btn-envio').addEventListener('click', function(event) {
        if (this.classList.contains('disabled')) {
            event.preventDefault();
            alert('El carrito está vacío. No puede proceder al envío.');
        }
    });

    let botonesEliminar = document.querySelectorAll('.btn-eliminar');
    botonesEliminar.forEach(function(btn) {
        btn.addEventListener('click', function() {
            let itemId = btn.getAttribute('data-id');
            eliminarItemCarrito(itemId, csrfToken);
        });
    });

    let botonesRestarCantidad = document.querySelectorAll('.restar-cantidad');
    botonesRestarCantidad.forEach(function(btn) {
        btn.addEventListener('click', function() {
            let itemId = btn.closest('.fila-item').getAttribute('id').split('-')[1];
            actualizarCantidad(itemId, -1, csrfToken);
        });
    });

    let botonesSumarCantidad = document.querySelectorAll('.sumar-cantidad');
    botonesSumarCantidad.forEach(function(btn) {
        btn.addEventListener('click', function() {
            let itemId = btn.closest('.fila-item').getAttribute('id').split('-')[1];
            actualizarCantidad(itemId, 1, csrfToken);
        });
    });

    function eliminarItemCarrito(itemId, csrfToken) {
        fetch(`/eliminar_del_carrito/${itemId}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
        }).then(response => {
            if (response.ok) {
                document.getElementById(`item-${itemId}`).remove();
                actualizarTotalCarrito();
                checkCartEmpty();
            } else {
                throw new Error('Error al eliminar el elemento del carrito');
            }
        }).catch(error => {
            console.error('Hubo un problema con la operación de eliminar:', error);
        });
    }

    function actualizarCantidad(itemId, cantidadDelta, csrfToken) {
        let inputCantidad = document.querySelector(`#item-${itemId} .input-cantidad`);
        let nuevaCantidad = parseInt(inputCantidad.value) + cantidadDelta;
        if (nuevaCantidad < 1) {
            nuevaCantidad = 1; // No permitir cantidades negativas
        }
        inputCantidad.value = nuevaCantidad;

        fetch(`/actualizar_cantidad/${itemId}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            body: JSON.stringify({ 'cantidad': nuevaCantidad }),
        }).then(response => {
            if (!response.ok) {
                throw new Error('Error al actualizar la cantidad del producto');
            }
            actualizarTotalCarrito();
        }).catch(error => {
            console.error('Hubo un problema con la operación de actualizar cantidad:', error);
        });
    }

    function actualizarTotalCarrito() {
        let carritoItems = document.querySelectorAll('.fila-item');
        let total = 0;
        carritoItems.forEach(item => {
            let precioUnitario = parseFloat(item.querySelector('.precio-unitario').innerText.replace('$', ''));
            let cantidad = parseInt(item.querySelector('.input-cantidad').value);
            let subtotal = precioUnitario * cantidad;
            total += subtotal;
            item.querySelector('.precio-total').innerText = `$${subtotal.toFixed(2)}`;
        });
        document.querySelector('.total-carrito').innerText = `$${total.toFixed(2)}`;
        checkCartEmpty();
    }

    // Inicialmente verificar el estado del carrito
    checkCartEmpty();
});
