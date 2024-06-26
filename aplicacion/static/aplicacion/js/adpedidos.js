// adpedidos.js

$(document).ready(function () {
  // Eliminar pedido
  $('.delete-btn').on('click', function () {
      var orderId = $(this).data('id');
      if (confirm('¿Estás seguro de que deseas eliminar este pedido?')) {
          $.ajax({
              url: `/eliminar_pedido/${orderId}/`,
              type: 'DELETE',
              headers: { 'X-CSRFToken': getCookie('csrftoken') },
              success: function (result) {
                  location.reload(); // Recarga la página para ver los cambios
              }
          });
      }
  });

  // Manejar la edición del pedido
  $('.edit-btn').on('click', function () {
      var orderId = $(this).data('id');
      // Obtener los datos del pedido y llenar el modal de edición
      $.get(`/obtener_pedido/${orderId}/`, function (data) {
          $('#orderId').val(data.id);
          $('#username').val(data.usuario);
          $('#products').val(data.productos);
          $('#address').val(data.direccion);
          $('#status').val(data.estado);
      });
  });

  // Guardar cambios de edición
  $('.save-btn').on('click', function () {
      var orderId = $('#orderId').val();
      $.ajax({
          url: `/editar_pedido/${orderId}/`,
          type: 'POST',
          data: {
              estado: $('#status').val(),  // Solo envía el campo de estado
              csrfmiddlewaretoken: getCookie('csrftoken')  // Asegúrate de incluir el token CSRF
          },
          headers: { 'X-CSRFToken': getCookie('csrftoken') },
          success: function (result) {
              $('#editModal').modal('hide'); // Oculta el modal de edición
              location.reload(); // Recarga la página para ver los cambios
          }
      });
  });

  // Función para obtener el valor del token CSRF desde las cookies
  function getCookie(name) {
      var cookieValue = null;
      if (document.cookie && document.cookie !== '') {
          var cookies = document.cookie.split(';');
          for (var i = 0; i < cookies.length; i++) {
              var cookie = cookies[i].trim();
              // Busca el token CSRF por su nombre
              if (cookie.substring(0, name.length + 1) === (name + '=')) {
                  cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                  break;
              }
          }
      }
      return cookieValue;
  }
});
