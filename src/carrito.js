// Importación de los datos de la "BD"
import data from './data/productos.js';

// Se obtienen todos los elementos que tienen la acción de abrir carrito
const botonesAbrirCarrito = document.querySelectorAll('[data-accion="abrir-carrito"]');
// Se obtienen todos los elementos que tienen la acción de cerrar carrito
const botonesCerrarCarrito = document.querySelectorAll('[data-accion="cerrar-carrito"]');
// Se obtiene el botón que agrega productos al carrito
const btnAgregarCarrito = document.getElementById('agregar-al-carrito');
// Se obtiene el producto actual
const producto = document.getElementById("producto");
// Arreglo que contiene los productos del carrito
let carrito = [];
// Clase que de formato al tipo de moneda que se maneja
const formatearMoneda = new Intl.NumberFormat('es-MX', {style: 'currency', currency: 'MXN'});
// Obtenemos el elemento de notificación por su id
const notificacion = document.getElementById('notificacion');

// variable que obtiene la ventana del carrito
const ventanaCarrito = document.getElementById('carrito');

// Función que mostrará la ventana del carrito
const renderCarrito = () => {   
    // Se agrega la clase al elemento de la venta que permite que sea visible
    ventanaCarrito.classList.add('carrito--active');
    
    // Parte para limpiar la lsita de elementos que se muestran en el carrito
    const productosAnteriores = ventanaCarrito.querySelectorAll('.carrito__producto');
    productosAnteriores.forEach(producto => producto.remove());

    let total = 0;

    // Se comprueba si hay productos
    if(carrito.length < 1) {
        // Si no hay elementos se agrega la clase que muestra el aviso
        ventanaCarrito.classList.add('carrito--vacio');
    } else {
        // Si el carrito tiene elementos se quita el aviso
        ventanaCarrito.classList.remove('carrito--vacio');

        carrito.forEach((productoCarrito) => {
            // Se busca el producto con su ID de la BD (prducto.js)
            data.productos.forEach((productoBD) => {
                if(productoBD.id === productoCarrito.id) {
                    // Se actualiza el productoCarrito con el precio
                    productoCarrito.precio = productoBD.precio;

                    total += productoBD.precio * productoCarrito.cantidad;
                }
            });
            
            // Se obtiene el url del thumb del producto seleccionado
            let thumbSrc = producto.querySelectorAll('.producto__thumb-img')[0].src;
            // Se verifica si hubo un cambio de color en el producto
            if(productoCarrito.color === 'rojo') {
                thumbSrc = './img/thumbs/rojo.jpg';
            } else if(productoCarrito.color === 'amarillo') {
                thumbSrc = './img/thumbs/amarillo.jpg';
            }
            // Plantilla del código HTML para el producto
            const plantillaProducto = `
                <div class="carrito__producto-info">
                    <img src="${thumbSrc}" alt="" class="carrito__thumb" />
                    <div>
                        <p class="carrito__producto-nombre">
                            <span class="carrito__producto-cantidad">${productoCarrito.cantidad} x </span>${productoCarrito.nombre}
                        </p>
                        <p class="carrito__producto-propiedades">
                            Tamaño:<span>${productoCarrito.tamaño}</span> Color:<span>${productoCarrito.color}</span>
                        </p>
                    </div>
                </div>
                <div class="carrito__producto-contenedor-precio">
                    <button class="carrito__btn-eliminar-item" data-accion="eliminar-item-carrito">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <path
                                d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"
                            />
                        </svg>
                    </button>
                    <p class="carrito__producto-precio">${formatearMoneda.format( productoCarrito.precio * productoCarrito.cantidad)}</p>
                </div>
            `;
            
            // Se creará el div que contendrá los productos del carrito
            const itemCarrito = document.createElement('div');
            // Se agrega la clase al div del producto del carrito
            itemCarrito.classList.add('carrito__producto');
            // se agrega el contenido de la plantilla al html
            itemCarrito.innerHTML = plantillaProducto;
            // Se agrega en el lugar correspondiente el div creado
            ventanaCarrito.querySelector('.carrito__body').appendChild(itemCarrito);
        });
    }

    ventanaCarrito.querySelector('.carrito__total').innerText = formatearMoneda.format(total);
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
    boton.addEventListener('click', (e) => {
        // Llamada a la función que cierra el carrito
		ventanaCarrito.classList.remove('carrito--active');
	});
});

// Funcionalidad para agregar productos al carrito
btnAgregarCarrito.addEventListener('click', (e) => {
    // -- Valores del producto
    const id = producto.dataset.productoId;
    const nombre = producto.querySelector('.producto__nombre').innerText;
    const cantidad = parseInt(producto.querySelector('#cantidad').value);
    const color = producto.querySelector('#propiedad-color input:checked').value;
    const tamaño = producto.querySelector('#propiedad-tamaño input:checked').value;

    if(carrito.length > 0) {
        let productoEnCarrito = false;
        
        // Para cada item de carrito
        carrito.forEach((item) => {
            // Se busca que haya valores exactamente iguales 
            if(item.id === id && item.nombre === nombre && item.color === color && item.tamaño === tamaño) {
                // De ser así el producto ya había sido agregado, solo se aumenta la cantidad
                item.cantidad += cantidad;    
                productoEnCarrito = true;  
            }
        });
        // Si no, se agrega el nuevo producto
        if(!productoEnCarrito) {
            // Se agrega el producto con sus valores al carrito
            carrito.push({
            id: id,
            nombre: nombre,
            cantidad: cantidad,
            color: color,
            tamaño: tamaño,
        });
        }
    }else {
        // Se agrega el producto con sus valores al carrito
        carrito.push({
            id: id,
            nombre: nombre,
            cantidad: cantidad,
            color: color,
            tamaño: tamaño,
        });
    }

    // Se establece la ruta de la imagen a mostrar en la notificacion
    let thumbSrc = producto.querySelectorAll('.producto__thumb-img')[0].src;
    // Si el color del producto es rojo
    if(color === 'rojo') {
        thumbSrc = './img/thumbs/rojo.jpg'
    // Si el color del producto es amarillo
    } else if (color === 'amarillo') {
        thumbSrc = './img/thumbs/amarillo.jpg'
    }
    // Se actualiza la img de la notificación
    notificacion.querySelector('img').src = thumbSrc;
    // Se muestra la notificacion
    notificacion.classList.add('notificacion--active');
    // Solo después de 5 segundos la notificación se mostrará
    setTimeout(() => notificacion.classList.remove('notificacion--active'), 5000);
}); 

// Botones para eliminar producto del carrito
ventanaCarrito.addEventListener('click', (e) => {
    // Se busca el botón mas cercano con la acción de eliminar al cual se le dio click
    if(e.target.closest('button')?.dataset.accion == 'eliminar-item-carrito') {
        // Se obtiene el producto al que se le dio click de eliminar
        const producto = e.target.closest('.carrito__producto');
        // se busca el index, obteniendo la lista de productos, convirtiendolo a un array obteniendo el index de dicho producto
        const indexProducto = [...ventanaCarrito.querySelectorAll('.carrito__producto')].indexOf(producto);

        // Se crea un nuevo arreglo filtrando los elementos que tengan el indice diferente del encontrado
        carrito = carrito.filter((item, index) => {
            if(index !== indexProducto) {
                return item;
            }
        });
        renderCarrito();
    }
});