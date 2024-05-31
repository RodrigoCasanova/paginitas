$(document).ready(function () {
    $.getJSON('https://ipapi.co/json/')
        .done(function (data) {

            $('#locationData').html(`
            <p>Ubicación: ${data.city}, ${data.region}, ${data.country}</p>
            <p>Zona Horaria: ${data.timezone}</p>
        `);
        })
        .fail(function (error) {
            console.error('Error al obtener los datos de geolocalización:', error);
            $('#locationData').html('<p>Error al obtener la ubicación.</p>');
        });
});

