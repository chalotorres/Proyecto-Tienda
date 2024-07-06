// Obtenemos el elemento producto
const producto = document.getElementById('producto');
// Obtenemos especificamente el elemento de la imagen de producto
const productoImagen = producto.querySelector('.producto__imagen');
// obtenemos las thumbs del producto
const thumbs = producto.querySelector('.producto__thumbs')

// Obtenemos la parte de la selección de color
const propiedadColor = producto.querySelector('#propiedad-color');

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

// Se crea un evento click a la selección de color
propiedadColor.addEventListener('click', (e) => {
    // Si el elemento seleccionado es de tipo INPUT
    if(e.target.tagName === 'INPUT') {
        productoImagen.src = `./img/tennis/${e.target.value}.jpg`;
    }
});