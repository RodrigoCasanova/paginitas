// Función para aumentar la cantidad
function incrementQuantity(input) {
    let quantityInput = input.parentNode.querySelector('.quantity-input');
    let currentValue = parseInt(quantityInput.value);
    quantityInput.value = currentValue + 1;
    updateTotalPrice(input);
}

// Función para disminuir la cantidad
function decrementQuantity(input) {
    let quantityInput = input.parentNode.querySelector('.quantity-input');
    let currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
        updateTotalPrice(input);
    }
}

// Función para actualizar el precio total
function updateTotalPrice(input) {
    let row = input.parentNode.parentNode;
    let quantity = parseInt(row.querySelector('.quantity-input').value);
    let price = parseFloat(row.querySelectorAll('td')[3].textContent.replace('$', '').replace('.', '').replace(',', '.'));
    let totalPrice = quantity * price;
    row.querySelector('.total-clp').textContent = '$' + totalPrice.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    updateTotalCartPrice();
}

// Función para actualizar el precio total del carrito
function updateTotalCartPrice() {
    let totalPrice = 0;
    let rows = document.querySelectorAll('tbody tr');
    rows.forEach(function (row) {
        let price = parseFloat(row.querySelector('.total-clp').textContent.replace('$', '').replace('.', '').replace(',', '.'));
        totalPrice += price;
    });
    document.getElementById('totalPrice').textContent = '$' + totalPrice.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

// Función para eliminar una fila
function deleteRow(icon) {
    let row = icon.parentNode.parentNode;
    row.parentNode.removeChild(row);
    updateTotalCartPrice();
}

// Función para aplicar el descuento
function applyDiscount() {
    let discountCodeInput = document.getElementById('discountCode');
    let applyDiscountBtn = document.getElementById('applyDiscountBtn');

    // Validar si el campo de código de descuento ya está deshabilitado
    if (discountCodeInput.disabled) {
        alert('Ya has aplicado un código de descuento.');
        return;
    }

    let discountCode = discountCodeInput.value;
    
    // Validar el código de descuento
    if (discountCode === 'ELMASGRANDE') {
        let totalPrice = parseFloat(document.getElementById('totalPrice').textContent.replace('$', '').replace('.', '').replace(',', '.'));
        let discountedPrice = totalPrice * 0.7; // Aplicar descuento del 30%
        document.getElementById('totalPrice').textContent = '$' + discountedPrice.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

        // Deshabilitar el campo de código de descuento y el botón de aplicación
        discountCodeInput.disabled = true;
        applyDiscountBtn.disabled = true;
    } else {
        alert('Código de descuento inválido');
    }
}
