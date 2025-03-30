function showHide(text = "") {
    const texto = document.getElementById('texto');
    
    if (text !== "") {
        texto.style.display = 'block';  // Exibe o texto
        texto.innerHTML = text;  // Altera o conteúdo do texto
    } else {
        texto.style.display = 'none';  // Esconde o texto
        texto.innerHTML = "";  // Limpa o conteúdo
    }
}
