// Funcion que devuelve un nombre valido ingresado por el usuario
function ingresarNombre(){
    let nombre = '';
    do {
        nombre = prompt("¿cómo te llamas?");
    } while (nombre == '')
    return nombre
}

// Funcion que imprime un saludo por consola
const saludo = function(nombre){
    console.log("Bienvenido a mi sitio web, " + nombre + "!");
}

console.log("Esta es mi primera pre-entrega");

let nombre = ingresarNombre();

saludo(nombre);

alert("Mi sitio web va a ser un e-commerce, esta entrega es solo una muestra de lo que aprendí en mis primeras clases del curso!");

// Funcion que imprime una n cantidad de elementos de la serie de Fibonacci
function fibonacci(n) {
    let primero = 0, segundo = 1, res = '';
    for (let i = 1; i <= n ; i++){
        res += primero + ' ';
        let siguiente = primero + segundo;
        primero = segundo;
        segundo = siguiente;
    }
    console.log(res);
}

fibonacci(prompt("Ingrese la cantidad de elementos de la serie de Fibonacci: "));

// Funcion para verificar si un numero es par o impar
const esPar = numero => !(numero%2);

let numero = parseInt(prompt("Ingresar un numero (0 para salir)"));
while (numero != 0) {
    if (esPar(numero)){
        console.log("El numero " + numero + " es par.");
    } else {
        console.log("El numero " + numero + " es impar.");
    }
    numero = prompt("Ingresar un numero (0 para salir)");
}


