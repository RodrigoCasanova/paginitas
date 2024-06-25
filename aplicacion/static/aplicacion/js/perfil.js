document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("editar-btn").addEventListener("click", function () {
        let inputs = document.querySelectorAll(".form-control");
        inputs.forEach(function (input) {
            input.removeAttribute("disabled");
        });
        document.getElementById("editar-btn").classList.add("d-none");
        document.getElementById("guardar-btn").classList.remove("d-none");
        document.getElementById("cancelar-btn").classList.remove("d-none");
        document.getElementById("password-fields").style.display = "block"; // Mostrar campos de contraseña si es necesario
    });

    document.getElementById("guardar-btn").addEventListener("click", function () {
        document.getElementById("perfil-form").submit(); // Enviar el formulario
    });

    document.getElementById("cancelar-btn").addEventListener("click", function () {
        let inputs = document.querySelectorAll(".form-control");
        inputs.forEach(function (input) {
            input.setAttribute("disabled", "disabled");
        });
        document.getElementById("editar-btn").classList.remove("d-none");
        document.getElementById("guardar-btn").classList.add("d-none");
        document.getElementById("cancelar-btn").classList.add("d-none");
        document.getElementById("password-fields").style.display = "none"; // Ocultar campos de contraseña
    });

    document.getElementById("perfil-form").addEventListener("submit", function (event) {
        event.preventDefault();
        let formData = new FormData(this);
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "guardar_perfil.php");
        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log("Perfil guardado exitosamente.");
                document.getElementById("exito-msg").classList.remove("d-none"); // Mostrar mensaje de éxito
                setTimeout(function () {
                    document.getElementById("exito-msg").classList.add("d-none"); // Ocultar mensaje de éxito después de cierto tiempo
                }, 3000); // 3000 milisegundos = 3 segundos

                let inputs = document.querySelectorAll(".form-control");
                inputs.forEach(function (input) {
                    input.setAttribute("disabled", "disabled");
                });
                document.getElementById("editar-btn").classList.remove("d-none");
                document.getElementById("guardar-btn").classList.add("d-none");
                document.getElementById("cancelar-btn").classList.add("d-none");
                document.getElementById("password-fields").style.display = "none"; // Ocultar campos de contraseña
            }
        };
        xhr.send(formData);
    });
});
