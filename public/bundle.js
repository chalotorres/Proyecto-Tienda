'use strict';

// Obtenemos el elemento producto
const producto = document.getElementById('producto');
// Obtenemos especificamente el elemento de la imagen de producto
const productoImagen = producto.querySelector('.producto__imagen');
// obtenemos las thumbs del producto
const thumbs = producto.querySelector('.producto__thumbs');

// Obtenemos la parte de la selección de color
const propiedadColor = producto.querySelector('#propiedad-color');

// obtenemos el botón de Incrementar cantidad
const btnIncrementarCantidad = producto.querySelector('#incrementar-cantidad'); 
// obtenemos el botón de Disminuir cantidad
const btnDisminuirCantidad = producto.querySelector('#disminuir-cantidad'); 
// obtenemos el input de la cantidad
const inputCantidad = producto.querySelector('#cantidad');

// FUNCIONALIDAD DE LAS THUMBSNAILS
// Se crea un evento click a las thumbs
thumbs.addEventListener('click', (e) => {
    // Si el elemento dentro de thumbs contiene la etiqueta "IMG"
    if(e.target.tagName === 'IMG') {
        // obtenemos el url de la imagen 'thumb' a la que se le dio click
        const imagenSrc = e.target.src;
        // Obtenemos de la url el index donde se encuentra el nombre de la imagen
        const ultimoIndex = imagenSrc.lastIndexOf('/');
        // hacemos una variable del nombre de la imagen
        const nombreImagen = imagenSrc.substring(ultimoIndex + 1);
    
        // Se actualiza la imagen de la que se le dio click en los thumbs
        productoImagen.src = `./img/tennis/${nombreImagen}`;
    }
});

// FUNCIONALIDAD DE LA PROPIEDAD DE COLOR
// Se crea un evento click a la selección de color
propiedadColor.addEventListener('click', (e) => {
    // Si el elemento seleccionado es de tipo INPUT
    if(e.target.tagName === 'INPUT') {
        productoImagen.src = `./img/tennis/${e.target.value}.jpg`;
    }
});

// Se crea el evento para el botón de aumentar cantidad
btnIncrementarCantidad.addEventListener('click', (e) => {
    // De la cantidad que hay en el input se le suma 1 por cada click que se haga
    inputCantidad.value = parseInt(inputCantidad.value) + 1;
});

// Se crea el evento para el botón de disminuir cantidad
btnDisminuirCantidad.addEventListener('click', (e) => {
    // Si el input es diferente de 0 (para evitar cantidades negativas)
    if(inputCantidad.value !== '0') {
    // De la cantidad que hay en el input se le resta 1 por cada click que se haga
    inputCantidad.value = parseInt(inputCantidad.value) - 1;
    }
});

// Se obtienen todos los elementos que tienen la acción de abrir carrito
const botonesAbrirCarrito = document.querySelectorAll('[data-accion="abrir-carrito"]');
// Se obtienen todos los elementos que tienen la acción de cerrar carrito
const botonesCerrarCarrito = document.querySelectorAll('[data-accion="cerrar-carrito"]');

// variable que obtiene la ventana del carrito
const ventanaCarrito = document.getElementById('carrito');

// Función que mostrará la ventana del carrito
const renderCarrito = () => {
    ventanaCarrito.classList.add('carrito--active');
};

// Funcionalidad para abrir carrito
botonesAbrirCarrito.forEach((boton) => {
    // Evento para los botones que abrirán el carrito
    boton.addEventListener('click', (e) =>{
        // Llamada a la función que abre el carrito
        renderCarrito();
    });
});

// Funcionalidad para cerrar carrito
botonesCerrarCarrito.forEach((boton) => {
    // Evento para los botones que cerrarán el carrito
    boton.addEventListener('click', (e) =>{
        // Llamada a la función que cierra el carrito
        ventanaCarrito.classList.remove('carrito--active');
    });
});
