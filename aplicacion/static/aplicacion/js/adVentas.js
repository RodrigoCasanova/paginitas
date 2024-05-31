const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [{
      label: 'Ventas de Productos',
      data: [1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300], // Datos de ventas ajustados
      backgroundColor: 'rgba(54, 162, 235, 0.5)', // Cambio el color del gráfico a un azul más claro
      borderColor: 'rgba(54, 162, 235, 1)', // Cambio el color del borde del gráfico a un azul más claro
      borderWidth: 1
    }]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: '#fff' // Cambio el color del texto del eje Y a blanco
          }
        },
        x: {
          ticks: {
            color: '#fff' // Cambio el color del texto de los meses a blanco
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: '#fff' // Cambio el color del texto de la leyenda a blanco
          }
        }
      }
    }
  };
// Inicializar el gráfico
 let myChart = new Chart(
    document.getElementById('ventasChart'),
    config
  );
  function incrementQuantity(input) {
    let quantityInput = input.parentNode.querySelector('.quantity-input');
    let currentValue = parseInt(quantityInput.value);
    quantityInput.value = currentValue + 1;
    updateTotalPrice(input);
}
