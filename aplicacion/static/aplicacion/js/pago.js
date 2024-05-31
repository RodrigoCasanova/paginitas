function validateForm() {
    let cardHolderName = document.getElementById('card-holder-name').value;
    let cardNumber = document.getElementById('card-number').value;
    let expiryDate = document.getElementById('expiry-date').value;
    let cvc = document.getElementById('cvc').value;
    let address = document.getElementById('address').value;

    let dateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    let cardNumberRegex = /^\d+$/; // Expresión regular para permitir solo dígitos

    // Validación para verificar si el número de tarjeta contiene letras
    if (!cardNumber.match(cardNumberRegex)) {
        document.getElementById('error-message').innerHTML = "El número de tarjeta solo puede contener dígitos.";
        document.getElementById('success-message').innerHTML = "";
        return false;
    }

    if (cardHolderName === "" || cardNumber === "" || expiryDate === "" || cvc === "" || address === "") {
        document.getElementById('error-message').innerHTML = "Por favor, llene todos los campos.";
        document.getElementById('success-message').innerHTML = ""; 
        return false;
    } else if (!expiryDate.match(dateRegex)) {
        document.getElementById('error-message').innerHTML = "Por favor, ingrese una fecha de expiración válida (MM/YY).";
        document.getElementById('success-message').innerHTML = "";
        return false;
    } else {
        document.getElementById('success-message').innerHTML = "¡Pago exitoso!";
        document.getElementById('error-message').innerHTML = ""; 
        return true;
    }
}
function validateKeyPress(event) {
    let keyCode = event.keyCode || event.which;
    let isValidKey = (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122) || keyCode === 32;
    if (!isValidKey) {
        event.preventDefault();
    }
}

