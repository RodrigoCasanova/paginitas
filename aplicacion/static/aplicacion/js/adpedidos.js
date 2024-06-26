$(document).ready(function() {
    // Cargar estados editados al cargar la página
    var pedidosEstado = JSON.parse(localStorage.getItem('pedidosEstado')) || {};
    $.each(pedidosEstado, function(pedidoId, estado) {
        $('#estadoPedido_' + pedidoId).text(estado);
    });

    // Función para guardar el estado en LocalStorage
    function guardarEstadoLocalStorage(pedidoId, estado) {
        pedidosEstado[pedidoId.toString()] = estado;
        localStorage.setItem('pedidosEstado', JSON.stringify(pedidosEstado));
    }

    // Función para obtener el estado desde LocalStorage
    function obtenerEstadoLocalStorage(pedidoId) {
        return pedidosEstado[pedidoId.toString()];
    }

    // Manejar la apertura del modal de edición
    $('#editModal').on('show.bs.modal', function(event) {
        var button = $(event.relatedTarget);
        var pedidoId = button.data('id');
        var estado = button.data('estado');

        var modal = $(this);
        modal.find('#editPedidoId').val(pedidoId);
        modal.find('#editEstado').val(estado);
    });

    // Manejar el envío del formulario de edición
    $('#editPedidoForm').submit(function(event) {
        event.preventDefault();
        
        var pedidoId = $('#editPedidoId').val();
        var estado = $('#editEstado').val();

        $.ajax({
            url: '/editar_pedido/' + pedidoId + '/',
            method: 'POST',
            data: {
                'estado': estado,
                'csrfmiddlewaretoken': $('input[name="csrfmiddlewaretoken"]').val()
            },
            success: function(response) {
                // Actualizar la interfaz si se guarda correctamente
                $('#estadoPedido_' + pedidoId).text(estado);
                guardarEstadoLocalStorage(pedidoId, estado);
                $('#editModal').modal('hide');
            },
            error: function(response) {
                alert('Error al actualizar el pedido');
            }
        });
    });

    // Manejar la apertura del modal de eliminación
    $('#deleteModal').on('show.bs.modal', function(event) {
        var button = $(event.relatedTarget);
        var pedidoId = button.data('id');
        
        var modal = $(this);
        modal.find('#deletePedidoId').val(pedidoId);
    });

    // Confirmar eliminación
    $('#confirmDeleteBtn').click(function() {
        var pedidoId = $('#deletePedidoId').val();

        $.ajax({
            url: '/eliminar_pedido/' + pedidoId + '/',
            method: 'POST',
            data: {
                'csrfmiddlewaretoken': $('input[name="csrfmiddlewaretoken"]').val()
            },
            success: function(response) {
                // Eliminar la fila de la tabla si se elimina correctamente
                $('#pedido' + pedidoId).remove();
                $('#deleteModal').modal('hide');
            },
            error: function(response) {
                alert('Error al eliminar el pedido');
            }
        });
    });
});