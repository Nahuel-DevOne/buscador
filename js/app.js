/****** Variables y Selectores ******/
/** Selectores **/ 
// selecciona el elemento html con la clase resultado
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

// contenedor para los resultados
const resultado = document.querySelector('#resultado');

const max = new Date().getFullYear();
const min = max - 10;

// Genera un objeto con la busqueda
// Se usa un objeto para que sea mas facil leer los datos
// y guardar todo en un mismo lugar
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
}

/****** Eventos ******/
// Evento para mostrar los autos. Se inicia cuando se carga el HTML
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos); // Muestra los autos al cargar la pagina

    // Llena las opciones de años
    llenarSelect();
});

// Event listener para los select de busqueda
// se escucha el evento change en cada select
// para tomar el valor seleccionado y colocarlo en el objeto
marca.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value;
    // función para filtrar los autos
    filtrarAuto();
    // console.log(e.target.value);
    // console.log(datosBusqueda);
});

year.addEventListener('change', e => {
    datosBusqueda.year = parseInt(e.target.value);
    filtrarAuto();
});

minimo.addEventListener('change', e => {
    datosBusqueda.minimo = e.target.value;
    filtrarAuto();
});

maximo.addEventListener('change', e => {
    datosBusqueda.maximo = e.target.value;
    filtrarAuto();
});

puertas.addEventListener('change', e => {
    datosBusqueda.puertas = parseInt(e.target.value);
    filtrarAuto();
});

transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
});

color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value;
    filtrarAuto();
    console.log(datosBusqueda);
});

/****** Funciones ******/
// Genera los autos
const mostrarAutos = (autos) => {
    
    limpiarHTML(); // Elimina el HTML previo

    autos.forEach(auto => {
        // Destructuring, para evitar auto.marca, auto.modelo, etc
        const { marca, modelo, year, puertas, color, transmision, precio } = auto;
        // creando la etiqueta para el auto
        const autoHTML = document.createElement('p');
        // insertando el auto en el HTML
        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: ${precio} - Color: ${color}
        `;
        // insertando el HTML en el DOM
        resultado.appendChild(autoHTML);
    });
}

// Limpia el HTML
const limpiarHTML = () => {
    // forma lenta
    // resultado.innerHTML = '';
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

// Genera los años del select
const llenarSelect = () => {
    
    for(let i = max; i >= min; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion); // Agrega las opciones de año al select
    }
}

// Funcion que filtra en base a la busqueda
const filtrarAuto = () => {
    // usando funciones de orden superior (higher order functions)
    // filter() crea un nuevo arreglo con los elementos que cumplan la condición
    // filter() recibe una función como parametro, por eso actua como higher order function
    // filter() soporta lo que se llama chainning o encadenamiento, es decir, se pueden encadenar varias funciones.
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);
    console.log(resultado);

    if(resultado.length) {
        mostrarAutos(resultado);
    } else {
        noResultado();
    }  
}

const noResultado = () => {
    limpiarHTML();
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultados, intenta con otros términos de búsqueda';
    resultado.appendChild(noResultado);
}

// Función para filtrar por marca
const filtrarMarca = auto => {
    // aplicando destructuring para poner marca y no datosBusqueda.marca
    const {marca} = datosBusqueda;
    if(marca) { // si hay una marca seleccionada, se filtra y se retorna 
        return auto.marca === marca;
    } 
    // con estos return se evita el if else    
    return auto; // si el valor de la marca es vacio, retorna el objeto auto
}

// Función para filtrar por año
const filtrarYear = auto => {
    const {year} = datosBusqueda;
    // console.log(typeof year); // el valor de year es un string sin el parseInt
    // ahora con el parseInt aplicado en el evento, el valor de year es un numero
    // console.log(typeof auto.year); // el valor de auto.year es un number
    if(year) {  
        return auto.year === year;
    }     
    return auto; 
}

// Función para filtrar por precio minimo
const filtrarMinimo = auto => {
    const {minimo} = datosBusqueda;
    if(minimo) {
        // retorna los autos que cumplan la condición
        return auto.precio >= minimo; // minimo  es un string, pero el >= no es un operador estricto, y lo toma como number en la comparación
    } 
    return auto;
}

// Función para filtrar por precio maximo
const filtrarMaximo = auto => {
    const {maximo} = datosBusqueda;
    if(maximo) {
        return auto.precio <= maximo;
    }
    return auto;
}

// Función para filtrar por numero de puertas
const filtrarPuertas = auto => {
    const {puertas} = datosBusqueda;
    if(puertas) {
        return auto.puertas === puertas;
    }
    return auto;
}

// Función para filtrar por tipo de transmisión
const filtrarTransmision = auto => {
    const {transmision} = datosBusqueda;
    if(transmision) {
        return auto.transmision === transmision;
    }
    return auto;
}

// Función para filtrar por color
const filtrarColor = auto => {
    const {color} = datosBusqueda;
    if(color) {
        return auto.color === color;
    }
    return auto;
}

