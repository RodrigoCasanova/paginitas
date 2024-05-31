function cargarDatos() {
         
    let pedidoId = "1";
    let usuario = "Usuario 1";
    let productos = "Camiseta Colo Colo 2024, Camiseta Argentina Messi";
    let direccion = "Concepcion, Paicavi 3280";

  
    document.getElementById("idCliente").value = pedidoId;
    document.getElementById("nombreCliente").value = usuario;
    document.getElementById("productos").value = productos;
    document.getElementById("direccionCliente").value = direccion;
}

function generarFactura() {
    // Obtener los valores de los campos
    let idCliente = document.getElementById("idCliente").value.trim();
    let nombreCliente = document.getElementById("nombreCliente").value.trim();
    let direccionCliente = document.getElementById("direccionCliente").value.trim();
    let productos = document.getElementById("productos").value.trim();

    // Verificar que todos los campos estén completados
    if (idCliente === "" || nombreCliente === "" || direccionCliente === "" || productos === "") {
        alert("Por favor, complete todos los campos antes de generar la factura.");
        return; // Detener la ejecución si algún campo está vacío
    }

    // Aquí puedes escribir el código para generar la factura y enviarla
    // Por ejemplo, puedes enviar los datos a un servidor para procesar la factura
    // y luego mostrar una confirmación al usuario

    let factura = "Factura\n\n";
    factura += "Número Id: " + idCliente + "\n";
    factura += "Nombre Cliente: " + nombreCliente + "\n";
    factura += "Dirección: " + direccionCliente + "\n";
    factura += "Productos: " + productos;

  
    let ventanaFactura = window.open("", "_blank");
    ventanaFactura.document.write("<pre>" + factura + "</pre>");
}

