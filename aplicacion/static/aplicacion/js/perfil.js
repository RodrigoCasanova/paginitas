document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("editar-btn").addEventListener("click", function () {
        let inputs = document.querySelectorAll(".form-control");
        inputs.forEach(function (input) {
            input.removeAttribute("disabled");
        });
        document.getElementById("editar-btn").classList.add("d-none");
        document.getElementById("guardar-btn").classList.remove("d-none");
        document.getElementById("cancelar-btn").classList.remove("d-none");
        document.getElementById("cambiar-contraseña-btn").classList.remove("d-none"); // Mostrar botón de Cambiar Contraseña
        document.getElementById("password-fields").style.display = "none"; // Ocultar campos de contraseña
    });

    document.getElementById("cambiar-contraseña-btn").addEventListener("click", function () {
        document.getElementById("password-fields").style.display = "block"; // Mostrar campos de contraseña
    });

    document.getElementById("avatar").addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById("avatar-preview").src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    document.getElementById("guardar-btn").addEventListener("click", function () {
        let inputs = document.querySelectorAll(".form-control");
        inputs.forEach(function (input) {
            input.setAttribute("disabled", "disabled");
        });
        document.getElementById("editar-btn").classList.remove("d-none");
        document.getElementById("guardar-btn").classList.add("d-none");
        document.getElementById("cancelar-btn").classList.add("d-none");
        document.getElementById("cambiar-contraseña-btn").classList.add("d-none"); // Ocultar botón de Cambiar Contraseña
        document.getElementById("password-fields").style.display = "none"; // Ocultar campos de contraseña
    });

    document.getElementById("cancelar-btn").addEventListener("click", function () {
        let inputs = document.querySelectorAll(".form-control");
        inputs.forEach(function (input) {
            input.setAttribute("disabled", "disabled");
        });
        document.getElementById("editar-btn").classList.remove("d-none");
        document.getElementById("guardar-btn").classList.add("d-none");
        document.getElementById("cancelar-btn").classList.add("d-none");
        document.getElementById("cambiar-contraseña-btn").classList.add("d-none"); // Ocultar botón de Cambiar Contraseña
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
                let inputs = document.querySelectorAll(".form-control");
                inputs.forEach(function (input) {
                    input.setAttribute("disabled", "disabled");
                });
                document.getElementById("editar-btn").classList.remove("d-none");
                document.getElementById("guardar-btn").classList.add("d-none");
                document.getElementById("cancelar-btn").classList.add("d-none");
                document.getElementById("cambiar-contraseña-btn").classList.add("d-none"); // Ocultar botón de Cambiar Contraseña
                document.getElementById("password-fields").style.display = "none"; // Ocultar campos de contraseña
            }
        };
        xhr.send(formData);
    });
});
