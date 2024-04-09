function runObserver(){
    setValueListener();

    var observer = new MutationObserver(function(mutations) {  
    mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
            setValueListener();
            setCurrencyListeners();
        }
    });
    });

    observer.observe(document.getElementById("tableBody"), {
    attributes: true, 
    childList: true,
    subtree: true,
    characterData: true 
    });
}

function setValueListener(){
    $("#tableBody input").on('change', function(e) {
        calculateRows();
    });
}

function formatoMoneda(v1){
    return "$ " + new Intl.NumberFormat("es-CL").format(parseFloat(v1).toFixed(2));
}

function formatoPorcentaje(v1){
    return new Intl.NumberFormat("es-CL").format(parseFloat(v1).toFixed(2)) + " %";
}

function valorDolarReal(){
    valor = 0;
    try{
        var value= $.ajax({ 
            url: 'https://mindicador.cl/api/', 
            async: false,
            timeout: 3000
        }).responseText;
        obj = JSON.parse(value);
        valor = parseFloat(obj.dolar.valor.toString().replace(".",","));
    }catch(error){
        console.log("No se pudo obtener el valor de la UF");
    }
    return valor;
}

function valorUFReal(){
    valor = 0;
    try{
        var value= $.ajax({ 
            url: 'https://mindicador.cl/api/', 
            async: false,
            timeout: 3000
        }).responseText;
        obj = JSON.parse(value);
        valor = parseFloat(obj.uf.valor.toString().replace(".",","));
    }catch(error){
        console.log("No se pudo obtener el valor de la UF");
    }
    return valor;
}

var currency = 'CLP' 

function setCurrencyListeners(){
    var currencyInputs = document.querySelectorAll('input[type="currency"]')

    currencyInputs.forEach(function(currencyInput) {
        currencyInput.value = localStringToNumber(currencyInput.value);
        onBlur({target:currencyInput})

        currencyInput.addEventListener('focus', onFocus)
        currencyInput.addEventListener('blur', onBlur)
    });
}

function localStringToNumber(s){
  return parseFloat(String(s).replace(/[^0-9,-]+/g,"").replace(",","."))
}

function onFocus(e){
    try{
        var value = e.target.value;
        e.target.value = String(localStringToNumber(String(value))).replace(".",",")
    }catch(error){
        console.log("No hay valor para convertir.")
    }

}

function onBlur(e){
    try{
        var value = e.target.value
        e.target.value = "$ " + new Intl.NumberFormat("es-CL").format(parseFloat(value.replace(",",".")))
    }catch(error){
        console.log("No hay valor para convertir.")
    }
  
}

function copyleft(){
    console.log("JS/HTML Level 2");
}