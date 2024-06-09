const formulario = document.getElementById('formulario');
const url = 'https://landing-d3a5e-default-rtdb.firebaseio.com/adopcion.json';

formulario.addEventListener('submit', (event) => {
    
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const cedula = document.getElementById('cedula').value;
    const telefono = document.getElementById('telefono').value;
    const direccion = document.getElementById('direccion').value;

    const datos = {
        nombre: nombre,
        apellido: apellido,
        email: email,
        cedula: cedula,
        telefono: telefono,
        direccion: direccion,
    };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(datos),
        headers:{
            'Content-Type': 'application/json'
        }
    } )
    .then(respuesta => respuesta.json())
    .then(datos => {
        console.log(datos);

    })
    .catch(error => console.error(error));
});


function limpiarCampos() {
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('email').value = ''; 
    document.getElementById('cedula').value = ''; 
    document.getElementById('telefono').value = ''; 
    document.getElementById('direccion').value = ''; 
}


/*let loaded = (eventLoaded) => {
    let myform = document.getElementById('formulario');
    myform.addEventListener('submit', (eventSubmit) => eventSubmit{})
    debugger;
}

window.addEventListener("DOMContentLoaded", loaded);*/

