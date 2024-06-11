const formulario = document.getElementById('formulario');
const url = 'https://landing-d3a5e-default-rtdb.firebaseio.com/adopcion.json';

let loaded = (eventLoaded) => {
    let myform = document.getElementById('formulario');
    myform.addEventListener('submit', (eventSubmit) => {
        eventSubmit.preventDefault(); 

        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const email = document.getElementById('email').value;
        const cedula = document.getElementById('cedula').value;
        const telefono = document.getElementById('telefono').value;
        const direccion = document.getElementById('direccion').value;
        const opcion = formulario.opcion.value;

        if (!nombre) {
            alert("Por favor, ingresa tu nombre.");
            return;
        }

        if (!apellido) {
            alert("Por favor, ingresa tu apellido.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+(\.[^\s@]+)*$/;

        if (!emailRegex.test(email)) {
            alert("Por favor, ingresa un correo electrónico válido.");
            return;
        }

        if (cedula.length !== 10) {
            alert("Por favor, ingresa una cédula válida de 10 dígitos.");
            return;
        }

        if (telefono.length !== 9) {
            alert("Por favor, ingresa un número de teléfono válido de 9 dígitos.");
            return;
        }

        if (!direccion) {
            alert("Por favor, ingresa tu dirección.");
            return;
        }

        if (!opcion) {
            alert("Por favor, selecciona una opción.");
            return;
        }

        const datos = {
            nombre: nombre,
            apellido: apellido,
            email: email,
            cedula: cedula,
            telefono: telefono,
            direccion: direccion,
            opcion: opcion
        };

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(respuesta => respuesta.json())
        .then(datos => {
            console.log(datos);
            obtenerDatos();
        })
        .catch(error => console.error(error));
    });

    debugger;
}

window.addEventListener("DOMContentLoaded", loaded);

async function obtenerDatos(){

    const respuesta = await fetch(url);

    if(!respuesta.ok){
        console.error("Error:", respuesta.status);
        return;
    }

    const datos = await respuesta.json();
    console.log(datos);

    let template = '';
    let conteoTotal = 0;

    for (const key in datos) {
        if (Object.hasOwnProperty.call(datos, key)) {
            const elemento = datos[key];
            template += `
                <tr>
                    <td>${elemento.apellido}</td>
                    <td>${elemento.nombre}</td>
                     <td>${elemento.cedula}</td>
                </tr>
            `;
            conteoTotal++;
        }
    }

    template += `
    <tr>
        <td colspan="2"><strong>Total de Aspirantes</strong></td>
        <td><strong>${conteoTotal}</strong></td>
    </tr>
`;

    const tabla = document.getElementById('tablebody');
    tabla.innerHTML = template;
} 

obtenerDatos()

/* hacerlo con el evento submit*/
/*let loaded = (eventLoaded) => {
    let myform = document.getElementById('formulario');
    myform.addEventListener('submit', (eventSubmit) => eventSubmit{})
    debugger;
}

window.addEventListener("DOMContentLoaded", loaded);*/

