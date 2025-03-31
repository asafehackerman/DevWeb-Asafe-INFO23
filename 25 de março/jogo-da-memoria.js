function showHide(text = "") {
    const texto = document.getElementById('texto');
    
    if (text !== "") {
        texto.style.display = 'block';
        texto.innerHTML = text;
    } else {
        texto.style.display = 'none';
    }
}