
function ex01() {

    const form = document.querySelector('#form01')
    const input = form.querySelector('input[name="in_01"]').value
    alert(input)
    form.reset()
}

function resolve01() {
    function media() {
        let soma = 0;
        for (i in arguments) {
            soma += arguments[i];
        }
        var media = soma / i;
        return media;
    }
}



