let contenedor_productos = document.querySelector(".contenedor-productos");
let contenedor_carrito = document.querySelector(".contenedor-carrito");

let carrito = [];

const productos =  [{id: "p01", nombre: "iPhone 13", precio: 1000000, stock: 2},
                    {id: "p02", nombre: "iPhone 14", precio: 1500000, stock: 4},
                    {id: "p03", nombre: "iPhone 14 pro", precio: 1700000, stock: 5},
                    {id: "p04", nombre: "iPhone 15", precio: 2000000, stock: 3},
                    {id: "p05", nombre: "iPhone 15 pro", precio: 2500000, stock: 6},
                    {id: "p06", nombre: "iPhone 15 pro max", precio: 2800000, stock: 1}];

function eliminarDelCarrito(entrada) {
    let indiceCarrito = carrito.findIndex(producto => producto.nombre.toLowerCase() === entrada);
    let indiceProductos = productos.findIndex(producto => producto.nombre.toLowerCase() === entrada);
    if (carrito[indiceCarrito].cantidad === 1){
        carrito.splice(indiceCarrito,1);
        productos[indiceProductos].stock++;
    } else {
        carrito[indiceCarrito].cantidad--;
        productos[indiceProductos].stock++;
    }
    mostrarCarrito(carrito);
    mostrarProductos(productos);
}

function mostrarCarrito(carrito) {

    let elementos = contenedor_carrito.querySelectorAll(".producto");
    elementos.forEach(element => {
        element.remove();
    });
    let total = contenedor_carrito.querySelector(".total");
    if (total) {
        total.remove();
    }

    carrito.forEach(producto => {
        let botonEliminar = document.createElement("button");
        botonEliminar.innerText = '❌';
        botonEliminar.addEventListener("click", () => {eliminarDelCarrito(producto.nombre.toLowerCase())});

        let productoHTML = document.createElement("div");
        productoHTML.classList.add("producto");
        productoHTML.innerHTML =   `<h4>${producto.nombre}</h4>
                                    <b>$${producto.precio}</b>
                                    <p>Cantidad: ${producto.cantidad}</p>`;
        
        productoHTML.appendChild(botonEliminar);
        contenedor_carrito.appendChild(productoHTML);
    });

    if (carrito.length > 0){
        let totalHTML = document.createElement("h4");
        totalHTML.classList.add("total");
        totalHTML.innerText = `TOTAL: $${sumarTotal(carrito)}`;
        contenedor_carrito.appendChild(totalHTML);
    }
}

function agregarAlCarrito(entrada) {
    let indice = productos.findIndex(producto => producto.nombre.toLowerCase() === entrada);
    if (productos[indice].stock >= 1){
        let cantidad = Number(prompt("Ingrese la cantidad que desea agregar al carrito"));
        while (cantidad < 0 || cantidad > productos[indice].stock) {
            console.log(`Ingrese un numero entre 1 y ${productos[indice].stock}`);
            cantidad = Number(prompt("Ingrese la cantidad que desea agregar al carrito"));
        }
        if (cantidad > 0) {
            let indiceCarrito = carrito.findIndex(producto => producto.nombre.toLowerCase() === entrada);
            productos[indice].stock -= cantidad;
            if (indiceCarrito === -1) {
                carrito.push({nombre: productos[indice].nombre, precio: productos[indice].precio, cantidad: cantidad});
            } else {
                carrito[indiceCarrito].cantidad += cantidad;
            }
            mostrarCarrito(carrito);
            mostrarProductos(productos);
        }
    } else {
        console.log("No hay stock de este producto.")
    }
    
}

function mostrarProductos(productos) {

    let elementos = contenedor_productos.querySelectorAll(".producto");
    elementos.forEach(element => {
        element.remove();
    });

    productos.forEach(producto => {
        let botonAgregar = document.createElement("button");
        botonAgregar.innerText = '➕';
        botonAgregar.addEventListener("click", () => {agregarAlCarrito(producto.nombre.toLowerCase())});

        let productoHTML = document.createElement("div");
        productoHTML.classList.add("producto");
        productoHTML.setAttribute("id",producto.id);
        productoHTML.innerHTML =   `<h4>${producto.nombre}</h4>
                                    <b>$${producto.precio}</b>
                                    <p>Cantidad diponible: ${producto.stock}</p>`;
        productoHTML.appendChild(botonAgregar);
        contenedor_productos.appendChild(productoHTML);
    });
}

function sumarTotal(carrito) {
    let total = 0;
    total = carrito.reduce((acumulador, producto) => acumulador + producto.precio * producto.cantidad, 0);
    return total;
}

mostrarProductos(productos);
