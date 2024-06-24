document.addEventListener('DOMContentLoaded', function () {
    // Cargar datos del carrito desde localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    let tablaBody = document.querySelector('tbody');
    tablaBody.innerHTML = ''; // Limpiar la tabla antes de agregar los nuevos items

    carrito.forEach((item, index) => {
        let fila = document.createElement('tr');
        fila.innerHTML = `
            <td><img src="${item.imagenSrc}" alt="${item.titulo}" class="product-image"></td>
            <td>${item.titulo}</td>
            <td class="quantity-control">
                <button class="decrement" onclick="decrementQuantity(${index})">-</button>
                <span class="quantity">${item.cantidad}</span>
                <button class="increment" onclick="incrementQuantity(${index})">+</button>
            </td>
            <td>${item.precio}</td>
            <td class="total-clp">${calculateTotalItem(item.precio, item.cantidad)}</td>
            <td><button class="delete" onclick="deleteRow(${index})"><i class="fas fa-trash"></i></button></td>
        `;
        tablaBody.appendChild(fila);
    });

    updateTotalCartPrice();

    document.getElementById('comprobarEnvio').addEventListener('click', function (event) {
        event.preventDefault();
        let totalPrecio = document.getElementById('totalPrice').innerText;
        localStorage.setItem('totalPrecio', totalPrecio); // Almacenar totalPrecio en localStorage

        // Redirigir a la página de Envio
        window.location.href = "/Envio/"; // Ruta relativa o URL absoluta según tu configuración
    });

    // ...
});

// Función para aumentar la cantidad
function incrementQuantity(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito[index].cantidad = parseInt(carrito[index].cantidad) + 1; // Asegurar conversión a número
    updateCartItem(carrito, index);
}

// Función para disminuir la cantidad
function decrementQuantity(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad = parseInt(carrito[index].cantidad) - 1; // Asegurar conversión a número
        updateCartItem(carrito, index);
    }
}

// Función para actualizar el precio total del artículo
function updateTotalPrice(row, item) {
    let quantity = parseInt(row.querySelector('.quantity').textContent);
    let price = parseFloat(item.precio.replace('$', '').replace(/\./g, '').replace(',', '.'));
    let totalPrice = quantity * price;
    row.querySelector('.total-clp').textContent = '$' + totalPrice.toLocaleString('es-CL', { minimumFractionDigits: 0 });
}

// Función para actualizar el artículo en localStorage
function updateCartItem(carrito, index) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    let row = document.querySelectorAll('tbody tr')[index];
    let item = carrito[index];
    row.querySelector('.quantity').textContent = item.cantidad;
    updateTotalPrice(row, item);
    updateTotalCartPrice();
}

// Función para eliminar una fila del carrito
function deleteRow(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    document.querySelectorAll('tbody tr')[index].remove();
    updateTotalCartPrice();
}

// Función para calcular el total del artículo
function calculateTotalItem(precio, cantidad) {
    let precioNum = parseFloat(precio.replace('$', '').replace(/\./g, '').replace(',', '.'));
    let total = precioNum * cantidad;
    return '$' + total.toLocaleString('es-CL', { minimumFractionDigits: 0 });
}

// Función para actualizar el precio total del carrito
function updateTotalCartPrice() {
    let totalPrice = 0;
    let rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => {
        let priceString = row.querySelector('.total-clp').textContent.trim();
        let price = parseFloat(priceString.replace('$', '').replace(/\./g, '').replace(',', '.'));
        totalPrice += price;
    });
    document.getElementById('totalPrice').textContent = '$' + totalPrice.toLocaleString('es-CL', { minimumFractionDigits: 0 });
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