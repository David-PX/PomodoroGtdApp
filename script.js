const formulario = document.querySelector("#formulario");
const listaActividades = document.getElementById('listaActividades');
let arrayActividades = [];

const CrearItem = (nombre, descripcion, fecha, paraHacer) => {
    let item = {
        nombre: nombre,
        descripcion: descripcion,
        estado: false,
        fecha: fecha,
        paraHacer: paraHacer

    }
    arrayActividades.push(item);

    return item;
}


const Guardar = (nombre, descripcion, fecha, paraHacer) => {

    localStorage.setItem('actividad', JSON.stringify(arrayActividades));
    PintarDB();
}


const PintarDB = () => {
    listaActividades.innerHTML = "";




    arrayActividades = JSON.parse(localStorage.getItem('actividad'))

    if (arrayActividades === null) {

        arrayActividades = [];
    } else {

        arrayActividades.forEach(element => {
            if(element.estado){ listaActividades.innerHTML += `<tr><td id="row1" class="bg-success">${element.nombre}</td>
            <td class="bg-success" id="row2">${element.descripcion}</td>
            <td class="bg-success" id="row5">${element.paraHacer}</td>
            <td class="bg-success" id="row4">${element.fecha}</td>
            <td class="bg-success"><i class="material-icons" onclick="editar">done</i></td>
            <td class="bg-success"><i class="material-icons" onclick="eliminar">delete</i></td></tr>`
            }else{
            listaActividades.innerHTML += `<tr><td id="row1" class="text-dark">${element.nombre}</td>
            <td class="text-dark" id="row2">${element.descripcion}</td>
            <td class="text-dark" id="row5">${element.paraHacer}</td>
            <td class="text-dark" id="row4">${element.fecha}</td>
            <td class="text-dark"><i class="material-icons" onclick="editar">done</i></td>
            <td class="text-dark"><i class="material-icons" onclick="eliminar">delete</i></td></tr>`
            }
            

        });
    }

}

formulario.addEventListener('submit', (e) => {

    e.preventDefault();

    let nombre = document.querySelector('#txtNombreActividad').value;
    let descripcion = document.querySelector('#txtDescripcionActividad').value;
    let fecha = document.querySelector('#txtFechaActividad').value;
    let paraHacer = document.querySelector('#txtParaHacer').value;
    console.log(nombre, descripcion, fecha, paraHacer);

    CrearItem(nombre, descripcion, fecha, paraHacer);
    Guardar();

    formulario.reset();
    jQuery("#exampleModal").modal('hide');

});


document.addEventListener('DOMContentLoaded', PintarDB);


listaActividades.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(e)
    if (e.target.innerHTML === 'done' || e.target.innerHTML === 'delete') {
        const texto = e.path[2].childNodes[7].innerHTML;
        if (e.target.innerHTML === 'delete') {
            eliminar(texto)
        }
        if (e.target.innerHTML === 'done') {
            editar(texto)
        }
    }

})
const eliminar = (actividad) => {
    let indexArray;
    arrayActividades.forEach((element, index) => {
        if (element.actividad === actividad) {
            indexArray = index;
        }
    });
    arrayActividades.splice(indexArray, 1);
    Guardar()
}
const editar = (actividad) => {
    let indexArray = arrayActividades.findIndex((element) => element.actividad === actividad);
    arrayActividades[indexArray].estado = true;
    Guardar()

}



/*
function newElement() {
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var inputNombre = document.getElementById("txtNombreActividad").value;
    var inputDescripcion = document.getElementById("txtDescripcionActividad").value;
    var txtParaHacer = document.getElementById("txtDescripcionActividad").value;
    var txtFecha = document.getElementById("txtFechaActividad").value;


    var nombre = document.createTextNode(inputNombre);
    var descripcion = document.createTextNode(inputDescripcion);
    var paraHacer = document.createTextNode(txtParaHacer);
    var fecha = document.createTextNode(txtFecha);
    td.appendChild(nombre);
    td.appendChild(descripcion);
    td.appendChild(paraHacer);
    td.appendChild(fecha);



    if (inputNombre === "") {
        Swal.fire(
            'No hay ninguna actividad.',
            'Por Favor escriba una actividad en la caja.'
        )
    } else {
        document.getElementById("myTable").appendChild(td);
    }

    document.getElementById("txtNombreActividad").value = "";


    var span = document.createElement("a");
    var span1 = document.createElement("i");
    span.className = "btn btn-outline-danger close float-end ";
    span1.className = "fas fa-trash close ";
    span.appendChild(span1);
    td.appendChild(span);



    for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            var div = this.parentElement;
            div.style.display = "none";
        }


    }

} */

var hoybt = document.getElementById("hoyfilter");
var proxbt = document.getElementById("proxfilter");
hoybt.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(e)
  Filter("Hoy");


});
proxbt.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(e)
  Filter("Proximamente");


});
const Filter = (fil) => {
    listaActividades.innerHTML = "";




    arrayActividades = JSON.parse(localStorage.getItem('actividad'))

    if (arrayActividades === null) {

        arrayActividades = [];
    } else {    
        var result = arrayActividades.filter(obj => {
            return obj.paraHacer == fil;});
            console.log(result);

            result.forEach(element => {
                if(element.estado){ listaActividades.innerHTML += `<tr><td id="row1" class="bg-success">${element.nombre}</td>
                <td class="bg-success" id="row2">${element.descripcion}</td>
                <td class="bg-success" id="row5">${element.paraHacer}</td>
                <td class="bg-success" id="row4">${element.fecha}</td>
                <td class="bg-success"><i class="material-icons" onclick="editar">done</i></td>
                <td class="bg-success"><i class="material-icons" onclick="eliminar">delete</i></td></tr>`
                }else{
                listaActividades.innerHTML += `<tr><td id="row1" class="text-dark">${element.nombre}</td>
                <td class="text-dark" id="row2">${element.descripcion}</td>
                <td class="text-dark" id="row5">${element.paraHacer}</td>
                <td class="text-dark" id="row4">${element.fecha}</td>
                <td class="text-dark"><i class="material-icons" onclick="editar">done</i></td>
                <td class="text-dark"><i class="material-icons" onclick="eliminar">delete</i></td></tr>`
                }
            

        });
    }

}
