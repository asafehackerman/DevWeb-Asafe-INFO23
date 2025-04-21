const flexContainer = document.querySelector('.flexbox'); // Seleciona o contêiner flex

const directionSelect = document.querySelector('.select-direction'); // Seleciona o seletor de Flex Direction
const justifySelect = document.querySelector('.select-justify'); // Seleciona o seletor de Justify Content
const alignSelect = document.querySelector('.select-align'); // Seleciona o seletor de Align Items

const sizeInput = document.querySelector('input[type="text"]'); // Seleciona o input de tamanho

const squares = document.querySelectorAll('.flex-square1, .flex-square2, .flex-square3'); // Seleciona todos os quadrados

const squareFormat = document.querySelector('.square-format'); // Seleciona o formato de quadrado
const circleFormat = document.querySelector('.circle-format'); // Seleciona o formato de círculo

const violetColor = document.querySelector('.violet'); // Seleciona a cor violeta
const redColor = document.querySelector('.red'); // Seleciona a cor vermelha
const blueColor = document.querySelector('.blue'); // Seleciona a cor azul
const whiteColor = document.querySelector('.white'); // Seleciona a cor branco
const orangeColor = document.querySelector('.orange'); // Seleciona a cor laranja
const greenColor = document.querySelector('.green'); // Seleciona a cor green

function changeColor(id) {
    document.querySelectorAll('.squares1 div, .squares2 div').forEach((colorDiv) => {
        colorDiv.style.border = 'none'; // tira a borda de todos na div squares1 e squares2
    });

    squares.forEach((square) => {
        if (id === "1") {
            square.style.backgroundColor = "violet";
            squareFormat.style.backgroundColor = "violet";
            circleFormat.style.backgroundColor = "violet";
            document.getElementById(id).style.border = "2px solid black"; 
        } else if (id === "2") {
            square.style.backgroundColor = "red";
            squareFormat.style.backgroundColor = "red";
            circleFormat.style.backgroundColor = "red";
            document.getElementById(id).style.border = "2px solid black";
        } else if (id === "3") {
            square.style.backgroundColor = "blue";
            squareFormat.style.backgroundColor = "blue";
            circleFormat.style.backgroundColor = "blue";
            document.getElementById(id).style.border = "2px solid black";
        } else if (id === "4") {
            square.style.backgroundColor = "white";
            squareFormat.style.backgroundColor = "white";
            circleFormat.style.backgroundColor = "white";
            document.getElementById(id).style.border = "2px solid black";
        } else if (id === "5") {
            square.style.backgroundColor = "orange";
            squareFormat.style.backgroundColor = "orange";
            circleFormat.style.backgroundColor = "orange";
            document.getElementById(id).style.border = "2px solid black";
        } else if (id === "6") {
            square.style.backgroundColor = "green";
            squareFormat.style.backgroundColor = "green";
            circleFormat.style.backgroundColor = "green";
            document.getElementById(id).style.border = "2px solid black";
        }
    });
}


function changeFormat(id) { // Função para mudar o formato dos quadrados de acordo
    document.querySelectorAll('.formats div').forEach((format) => {
        format.style.border = 'none'; // tira a borda de todos na div formats
    });    
    
    squares.forEach((square) => {
        if (id === "circle") {
            square.style.borderRadius = "50%"; // Torna o quadrado em círculo
        } else if (id === "square") {
            square.style.borderRadius = "0%"; // Torna o quadrado em forma de quadrado
        } document.getElementById(id).style.border = "2px solid black"; // aplica borda no selecionado
    });
}

sizeInput.addEventListener('input', () => { // muda o tamanho dos quadrados de acordo com o valor do input
    const size = sizeInput.value + 'px';
  
    squares.forEach((square) => {
      square.style.width = size;
      square.style.height = size;
    });
});

directionSelect.addEventListener('change', () => {
    flexContainer.style.flexDirection = directionSelect.value.toLowerCase(); // Altera o Flex Direction de acordo
});

justifySelect.addEventListener('change', () => {
    flexContainer.style.justifyContent = justifySelect.value.toLowerCase(); // Altera o Justify Content de acordo
});

alignSelect.addEventListener('change', () => {
    flexContainer.style.alignItems = alignSelect.value.toLowerCase(); // Altera o Align Items de acordo
});