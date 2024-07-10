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
