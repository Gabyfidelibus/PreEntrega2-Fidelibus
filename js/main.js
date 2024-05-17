let contenedor_productos = document.querySelector(".contenedor-productos");
let contenedor_carrito = document.querySelector(".contenedor-carrito");

function agregarProductos(producto) {
    productoHTML = document.createElement("div");
    productoHTML.classList.add("producto");
    productoHTML.setAttribute("id",producto.id);
    productoHTML.innerHTML =   `<h4>Producto: ${producto.nombre}</h4>
                                <b>Precio en pesos: $${producto.precio}</b>
                                <p>Cantidad diponible: ${producto.stock}</p>`;
    contenedor_productos.appendChild(productoHTML);
}

let carrito = [];

const productos =  [{id: "p01", nombre: "iPhone 13", precio: 1000000, stock: 2},
                    {id: "p02", nombre: "iPhone 14", precio: 1500000, stock: 4},
                    {id: "p03", nombre: "iPhone 14 pro", precio: 1700000, stock: 5},
                    {id: "p04", nombre: "iPhone 15", precio: 2000000, stock: 3},
                    {id: "p05", nombre: "iPhone 15 pro", precio: 2500000, stock: 6},
                    {id: "p06", nombre: "iPhone 15 pro max", precio: 2800000, stock: 1}];

productos.forEach(producto => {
    agregarProductos(producto);
});

function agregarAlCarrito(carrito, productos) {
    let entrada = prompt("Agrega un producto al carrito (escribe su nombre o 'salir' si no quiere agregar mas productos)").toLowerCase();
    while (entrada != "salir") {
        indice = productos.findIndex(producto => producto.nombre.toLowerCase() === entrada);
        if (indice === -1) {
            console.log("Producto no disponible");
        } else {
            let cantidad = Number(prompt("Ingrese la cantidad que desea agregar al carrito"));
            while (cantidad <= 0 || cantidad > productos[indice].stock) {
                console.log(`Ingrese un numero entre 1 y ${productos[indice].stock}`);
                cantidad = Number(prompt("Ingrese la cantidad que desea agregar al carrito"));
            }
            indiceCarrito = carrito.findIndex(producto => producto.nombre.toLowerCase() === entrada);
            productos[indice].stock -= cantidad;
            if (indiceCarrito === -1) {
                carrito.push({nombre: productos[indice].nombre, precio: productos[indice].precio, cantidad: cantidad});
            } else {
                carrito[indiceCarrito].cantidad += cantidad;
            }
        }
        entrada = prompt("Agrega un producto al carrito (escribe su nombre o 'salir' si no quiere agregar mas productos)").toLowerCase();
    }
}

function mostrarCarrito(producto) {
    productoHTML = document.createElement("div");
    productoHTML.classList.add("producto");
    productoHTML.innerHTML =   `<h4>Producto: ${producto.nombre}</h4>
                                <b>Precio en pesos: $${producto.precio}</b>
                                <p>Cantidad: ${producto.cantidad}</p>`;
    contenedor_productos.appendChild(productoHTML);
}

function sumarTotal(carrito) {
    let total = 0;
    total = carrito.reduce((acumulador, producto) => acumulador + producto.precio * producto.cantidad, 0);
    return total;
}

document.addEventListener("DOMContentLoaded", () =>{
    agregarAlCarrito(carrito, productos);

    carritoHTML = document.createElement("h3");
    carritoHTML.innerText = "CARRITO";
    contenedor_productos.appendChild(carritoHTML);
    carrito.forEach(producto => {
        mostrarCarrito(producto);
    });
    totalHTML = document.createElement("h4");
    totalHTML.innerText = `TOTAL $${sumarTotal(carrito)}`;
    contenedor_productos.appendChild(totalHTML);

});

// Funcion tipo cambiario
/*
function conversionMoneda(precio, tipo){
    let resultado = 0;
    switch (tipo) {
        case 'dolar':
            resultado = 'US$ ' + (precio / 1040).toFixed(2);
            break;
        case 'euro':
            resultado = '€ ' + (precio / 1085).toFixed(2);
            break;
        case 'libras':
            resultado = '£ ' + (precio / 1286).toFixed(2);
            break;
        case 'yuan':
            resultado = 'CN¥ ' + (precio / 121.3).toFixed(2);
            break;
        case 'yen':
            resultado = 'JN¥ ' + (precio / 5.74).toFixed(2);
            break;
        default:
            resultado = '$ ' + precio.toFixed(2);
    }
    return resultado;
}

let precio = Number(prompt("Ingresar el precio en pesos"));
let moneda = prompt("Indicar la moneda deseada (dolar, euro, libras, yuan o yen)").toLowerCase();
console.log('El precio es de ' + conversionMoneda(precio,moneda));
*/