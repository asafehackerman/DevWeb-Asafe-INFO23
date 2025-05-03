google.charts.load('current', {
  packages: ['corechart', 'geochart', 'table']
});

document.addEventListener('DOMContentLoaded', function () {
  google.charts.setOnLoadCallback(() => {
    drawChart(); // gráfico de barras
    drawPieChart(); // novo gráfico de pizza
    drawTable1(); // tabela 1
    drawTable2(); // tabela 2

    var modal = document.getElementById('exampleModal');
    modal.addEventListener('shown.bs.modal', function () {
      drawRegionsMap(); // gráfico de mapa
    });
  });
});

// Função para o gráfico de pizza
function drawPieChart() {
  var data = google.visualization.arrayToDataTable([
    ['Conceito', 'Quantidade'],
    ['A', 189],
    ['B', 228],
    ['C', 211],
    ['D', 187]
  ]);

  var options = {
    is3D: true
  };

  var chart = new google.visualization.PieChart(document.getElementById('piechart'));
  chart.draw(data, options);
}

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Bimestre', 'Frequência (%)'],
    ['1º BIM', 91],
    ['2º BIM', 79],
    ['3º BIM', 87.5],
    ['4º BIM', 68],
  ]);

  var options = {
    legend: { position: 'none' },
    hAxis: {
      minValue: 0,
      maxValue: 100,
      format: 'decimal',
      title: 'Frequência (%)'
    },
    vAxis: {
      title: 'Bimestre'
    },
    bar: { groupWidth: '80%' }
  };

  var chart = new google.visualization.BarChart(document.getElementById('dual_x_div'));
  chart.draw(data, options);
}

// Gráfico de mapa
function drawRegionsMap() {
  var data = google.visualization.arrayToDataTable([
    ['País', 'Frequência'],
    ['Brazil', 600],
    ['United States', 450],
    ['Germany', 300],
    ['Argentina', 150],
    ['Canada', 0]
  ]);

  var options = {};

  var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
  chart.draw(data, options);
}

function drawTable1() {
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Componente Curricular');
  data.addColumn('number', 'Frequência (%)');
  data.addRows([
    ['Artes', 89.5],
    ['Biologia', 92.2],
    ['Desenvolvimento Web', 78.5],
    ['Engenharia de Software', 92.2],
    ['Geografia', 95.8]
  ]);

  var table = new google.visualization.Table(document.getElementById('table_div1'));
  table.draw(data, {
    showRowNumber: false,
    width: '100%',
    height: '100%'
  });
}

function drawTable2() {
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Conceitos');
  data.addColumn('number', 'Qtde Total');
  data.addRows([
    ['A', 189],
    ['B', 228],
    ['C', 211],
    ['D', 187]
  ]);

  var table = new google.visualization.Table(document.getElementById('table_div2'));
  table.draw(data, {
    showRowNumber: false,
    width: '100%',
    height: '100%'
  });
}

// Adicione este código ao seu script.js
let charts = [];

function initChart() {
  charts.forEach(chart => {
    chart.clearChart();
  });
  
  // Suas funções de desenho de gráficos aqui...
  charts = [chart1, chart2, chart3]; // Adicione todas as instâncias de gráficos
}

// Redimensiona os gráficos ao mudar o tamanho da tela
window.addEventListener('resize', () => {
  if(charts.length > 0) {
    charts.forEach(chart => {
      chart.draw();
    });
  }
});

google.charts.setOnLoadCallback(initChart);