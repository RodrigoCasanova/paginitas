$(document).ready(function(){
    // Obtener indicadores económicos
    $.get('https://mindicador.cl/api')
    .done(function(data) {
        let indicatorsContent = '';
        indicatorsContent += '<div class="card"><div class="card-header">Dólar</div><div class="card-body">' + data.dolar.valor + ' CLP</div></div>';
        indicatorsContent += '<div class="card"><div class="card-header">Euro</div><div class="card-body">' + data.euro.valor + ' CLP</div></div>';
        indicatorsContent += '<div class="card"><div class="card-header">UF</div><div class="card-body">' + data.uf.valor + ' CLP</div></div>';
        indicatorsContent += '<div class="card"><div class="card-header">UTM</div><div class="card-body">' + data.utm.valor + ' CLP</div></div>';
        $('#indicators-content').html(indicatorsContent);
    })
    .fail(function() {
        $('#indicators-content').html('<p>No se pudieron cargar los indicadores económicos.</p>');
    });
});
