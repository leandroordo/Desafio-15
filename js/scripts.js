function onValorChanged(inputElement) {
  //Se dispara cuando cambia el valor escrito en el input
  inputElement.value = inputElement.value.trim();

  if (isValidNumber(inputElement.value)) {
    inputElement.classList.remove("error");
  } else {
    inputElement.classList.add("error");
  }
}

//Para las operaciones, mando la función que debeje ejecutarse
//como parámetro a la función doOperacion
function doSumar() {
  doOperacion((a, b) => a + b);
}

function doRestar() {
  doOperacion((a, b) => a - b);
}

function doMultiplicar() {
  doOperacion((a, b) => a * b);
}

function doDividir() {
  doOperacion((a, b) => {
    if (b === 0) return null;
    return a / b;
  });
}

function doOperacion(operacionFunction) {
  const validationResult = areValidNumbers();

  if (validationResult) {
    setResultado(
      operacionFunction(
        validationResult.primerValor,
        validationResult.segundoValor
      )
    );
  } else {
    setResultado(null);
  }
}

function areValidNumbers() {
  const inputPrimerValor = document.getElementById("primerValor");
  const inputSegundoValor = document.getElementById("segundoValor");

  if (!inputPrimerValor.value) {
    inputPrimerValor.value = "0";
  }
  if (!inputSegundoValor.value) {
    inputSegundoValor.value = "0";
  }

  if (
    isValidNumber(inputPrimerValor.value) &&
    isValidNumber(inputSegundoValor.value)
  ) {
    return {
      primerValor: +inputPrimerValor.value,
      segundoValor: +inputSegundoValor.value,
    };
  } else return null;
}

const isValidNumber = (value) => /^-?\d*(\.\d+)?$/.test(value);

function setResultado(valor) {
  const divResultado = document.getElementById("resultado");
  divResultado.innerHTML = valor ?? "";

  //Achicar el font-size según el largo del textbox
  if (valor) {
    var className = "";

    if (valor.toString().length >= 20) className = "font-size-1";
    else if (valor.toString().length >= 17) className = "font-size-2";
    else if (valor.toString().length >= 15) className = "font-size-3";
    else className = "font-size-4";

    divResultado.classList.remove(
      "font-size-1",
      "font-size-2",
      "font-size-3",
      "font-size-4"
    );
    divResultado.classList.add(className);
  }
}
