let estiloGlobal = 0;

// Creo boton para alternar estilos
var alternar = document.createElement('button');
    alternar.type = 'button';
    alternar.id = 'alternar';
    alternar.textContent = 'Alternar';
    alternar.className = 'btn';
    alternar.style.height='7vh';
    alternar.style.width='30vh';

alternar.onclick = function() {
    alterno();
};

divBtns2.appendChild(alternar); // Agrego boton alternar

// Creo botón aleatorio
var aleatorio = document.createElement('button');
    aleatorio.type = 'button';
    aleatorio.id = 'aleatorio';
    aleatorio.textContent = '';
    aleatorio.className = 'btn';
    aleatorio.style.height='7vh';
    aleatorio.style.width='30vh';

    aleatorio.onclick = function() {
        var valorRandom = Math.floor(Math.random()*3); // genero un random entre 0 y 2.
        caseSwitch(valorRandom); 
    };

divBtns2.appendChild(aleatorio); // Agrego boton aleatorio

// Creo botón recordar
var recordar = document.createElement('button');
    recordar.type = 'button';
    recordar.id = 'onoff';
    recordar.value ='Off';
    recordar.textContent = 'Recordar';
    recordar.className = 'btn';
    recordar.style.height='7vh';
    recordar.style.width='30vh';
    recordar.style.backgroundColor='green';

    recordar.onclick = function() {
        onoff(); // funcion para cambiar el estado de Recordar
    };

divBtns2.appendChild(recordar); // Agrego boton recordar 

// creo select options

var arrayText = ["Default","Retro","Futuro","Sin estilo"]; // array de nombres
var arrayValue = [0,1,2,3]; // array de valores

//Creo y agrego un elemento select
var selectList = document.createElement("select");
selectList.id = "mySelect";
selectList.style.width = '30vh';
selectList.style.height = '7vh';
divBtns2.appendChild(selectList); // Agrego select


//Creo y agrego las opciones 
for (var i = 0; i < arrayValue.length; i++) {
    var option = document.createElement("option");
    option.value = arrayValue[i];
    option.text = arrayText[i];
    selectList.appendChild(option);// agrego las opciones en el Select
}

selectList.onclick = function(){
    var valorSeleccionado = parseInt(selectList.value, 10); // convierto string en en entero base 10
    caseSwitch(valorSeleccionado);// decodifico el estilo
}

//Creo input radio
var formulario = document.createElement('form');
formulario.name = "MyForm";
divBtns2.appendChild(formulario); // creo un formulario que va a contener los inputs
arrayText.forEach((genederValue, i) => { // utilizo el mismo array que en el selectList
   var labelValue = document.createElement('label');
   labelValue.innerHTML = genederValue;
   labelValue.className = "labelInput";
   var inputValue = document.createElement('input'); // vreo input
   inputValue.type = "radio"; // el iput es tipo radio
   inputValue.name = 'EstiloRadio'; // agrupo los inputs con el mismo nombre 
   inputValue.value = i;
   inputValue.id = "C"+i;
   formulario.appendChild(labelValue); // inserto label dentro del formulario
   formulario.appendChild(inputValue); // inserto input tipo radio dentro del formulario
});

formulario.onclick = function(){
    var radVal = parseInt(document.MyForm.EstiloRadio.value,10);
    caseSwitch(radVal);// decodifico el estilo
}


// funcion para modificar el estado de guardar o no los estilos en LocalStorage
function onoff(){
    currentvalue = document.getElementById('onoff').value; // leo el estado en el doc. HTML
    if(currentvalue == "Off"){ // si el boton esta en off, entonces lo cambio por el opuesto, cambio el color del boton y guardo el estado en Local storage
        document.getElementById("onoff").value="On"; //cambio el valor en el documento HTML
        document.getElementById("onoff").style.backgroundColor='red' // cambio el color del boton
        localStorage.setItem('rec', "On"); // cambio el estado en localstorage
    }else{ // el valor esta en on, entonces cambio a off cambio el color del boton y guardo en Localstorage
        document.getElementById("onoff").value="Off"; //cambio el valos en el HTML
        document.getElementById("onoff").style.backgroundColor='green'// cambio el color del boton
        localStorage.setItem('rec', "Off"); // cambio el estado en localstorage
    }
}


// funcion para guardar los estados si y solo si el botón recordar esta en on

function guardo(Referencia, valorSelector){
    var rec = localStorage.getItem('rec'); // leo estado de botón
    if (rec == "On") { // si es distinto de off (es on)
        document.getElementById('estilos').href = Referencia; // si esta On cambio href 
        localStorage.setItem('Estilo', Referencia); //guardo en localStorage
        localStorage.setItem('valueSelect', valorSelector)// guardo el valor del selctor

        selectList.selectedIndex= parseInt(valorSelector); //aplico en el Select
        document.getElementById("C"+ valorSelector).checked = true;
    } else{
        document.getElementById('estilos').href = Referencia; // si esta Off cambio href sólamente

    }
}

function alterno(){
    estiloGlobal++;
    if (estiloGlobal >=3 ){
        estiloGlobal = 0;
    }
    caseSwitch(estiloGlobal);
}

function caseSwitch(valorEstilo){
    estiloGlobal = valorEstilo; // la correlatividad siempre es desde el valor actual, por lo tanto actualizo estiloGlobal
    switch (valorEstilo){ // el switch traduce el valor dandom a uno de los estilos. Default no debería suceder nunca
        case 0:
            guardo('./css/estilos.css',0);// Llamo a la funcion guardo
        break;

        case 1:
            guardo('./css/estilos-retro.css',1);// Llamo a la funcion guardo
        break;

        case 2:
            guardo('./css/estilos-futuro.css',2);// Llamo a la funcion guardo
        break;

        default:
            guardo('',3);// Llamo a la funcion guardo (es sin estilos y solo se da si se pasa desde el selectList)
        break;
    }
}

// actualizo estado del boton y del localStorage 

if ( "Estilo" in localStorage) { // Si el key Estilo existe, entonces aplico el estilo guardado 
    var estilo = localStorage.getItem('Estilo'); // leo estilo
    var rec = localStorage.getItem('rec'); // leo estado de botón
    var valorSelect = localStorage.getItem('valueSelect'); // cargo Value Select
  
        document.getElementById('estilos').href = estilo; // si esta On cambio href por el estado guardado
        selectList.selectedIndex = parseInt(valorSelect,10); // actualizo indice del selectList
       document.getElementById("C"+valorSelect).checked = true;  // actualizo valor del input Radio

  
 } else {  // si no existe  lo creo y guardo por defecto Original y pongo rec en off
    localStorage.setItem('Estilo', "./css/estilos.css"); //setero href por defecto
    localStorage.setItem('valueSelect', 0); // inicilaizo el value del select
    localStorage.setItem('rec', "Off"); // pongo rec en off en storage
    document.getElementById("onoff").value="Off"; // seteo en documento HTML en off
    document.getElementById("onoff").style.backgroundColor='green' // pongo el boton en off
 }


 if ( "rec" in localStorage) { // si existe el valor leo estado de recording y se lo paso al boton recordar

    var rect = localStorage.getItem('rec'); // leo estado de botón
    document.getElementById("onoff").value = rect; // le paso el dato guardado

    if (rect == "On") {
        document.getElementById("onoff").style.backgroundColor='red'
    }else{
        document.getElementById("onoff").style.backgroundColor='green'
    }

} else { 
      // si no existe el valor creo en local storage el modo off, creo Estilo y aplico los datos por defecto.
      localStorage.setItem('Estilo', "./css/estilos.css");
      localStorage.setItem('valueSelect', '0'); // inicilaizo el value del select
      localStorage.setItem('rec', "Off");
      document.getElementById("onoff").value="Off";
      document.getElementById("onoff").style.backgroundColor='green'
} 

