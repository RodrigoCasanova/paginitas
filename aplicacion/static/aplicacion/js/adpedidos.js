$(document).ready(function() {
    let currentOrderId;

    $('.edit-btn').click(function() {
      currentOrderId = $(this).data('id');
      let $row = $('tr[data-id="' + currentOrderId + '"]');
      let username = $row.find('td:nth-child(2)').text();
      let products = $row.find('td:nth-child(3)').text();
      let address = $row.find('td:nth-child(4)').text();
      let status = $row.find('.status').text();

      $('#orderId').val(currentOrderId);
      $('#username').val(username);
      $('#products').val(products);
      $('#address').val(address);
      $('#status').val(status);

      $('#editModal').modal('show');
    });

    $('.save-btn').click(function() {
      let orderId = $('#orderId').val();
      let username = $('#username').val();
      let products = $('#products').val();
      let address = $('#address').val();
      let status = $('#status').val();
    
      // Validar que ningún campo esté vacío
      if (username.trim() === '' || products.trim() === '' || address.trim() === '' || status.trim() === '') {
        alert('Por favor completa todos los campos.');
        return;
      }
    
      let $row = $('tr[data-id="' + orderId + '"]');
      $row.find('td:nth-child(2)').text(username);
      $row.find('td:nth-child(3)').text(products);
      $row.find('td:nth-child(4)').text(address);
      $row.find('.status').text(status).removeClass().addClass('status').addClass(status);
    
      console.log("Guardar cambios para el pedido con ID: " + orderId);
    
      $('#editModal').modal('hide');
    });
    
    $('.delete-btn').click(function() {
      currentOrderId = $(this).closest('tr').data('id');
      $('#deleteModal').modal('show');
    });

    $('.confirm-delete-btn').click(function() {
      let orderId = currentOrderId;

      $('tr[data-id="' + orderId + '"]').remove();

      $('#deleteModal').modal('hide');
    });
  });