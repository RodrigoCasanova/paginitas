// detalleCompra.js

$(document).ready(function() {
    // Cargar el carrito al cargar la página
    cargarCarrito();
});

function cargarCarrito() {
    $.ajax({
        url: '/api/carrito/',  // Ajusta la URL según tu endpoint de API para el carrito
        type: 'GET',
        success: function(data) {
            mostrarItemsCarrito(data);
        },
        error: function(error) {
            console.error('Error al cargar el carrito:', error);
        }
    });
}

function mostrarItemsCarrito(items) {
    var tbody = $('#tbody-carrito');
    tbody.empty();  // Vaciar contenido anterior de la tabla

    if (items.length === 0) {
        tbody.append(`
            <tr>
                <td colspan="6">No hay productos en tu carrito.</td>
            </tr>
        `);
    } else {
        items.forEach(function(item) {
            var fila = `
                <tr id="item-${item.id}">
                    <td><img src="${item.imagen}" alt="${item.nombre}" style="width: 100px;"></td>
                    <td>${item.nombre}</td>
                    <td>${item.cantidad}</td>
                    <td>$${item.precio}</td>
                    <td>$${item.total}</td>
                    <td><button onclick="eliminarItem(${item.id})">Eliminar</button></td>
                </tr>
            `;
            tbody.append(fila);
        });
    }

    actualizarTotalCarrito(items);
}

function actualizarTotalCarrito(items) {
    var total = items.reduce(function(acc, item) {
        return acc + item.total;
    }, 0);
    $('#total-precio').text(total.toFixed(2));
}

function eliminarItem(itemId) {
    $.ajax({
        url: `/api/carrito/${itemId}/delete/`,  // Ajusta la URL según tu endpoint de API para eliminar un ítem
        type: 'DELETE',
        success: function(response) {
            $('#item-' + itemId).remove();  // Eliminar la fila del DOM
            cargarCarrito();  // Recargar el carrito después de eliminar
        },
        error: function(error) {
            console.error('Error al eliminar el item:', error);
        }
    });
}

$('#pagar-btn').click(function() {
    // Redirigir a la página de Envío al hacer clic en "Realizar Pago"
    window.location.href = "{% url 'Envio' %}";
});
