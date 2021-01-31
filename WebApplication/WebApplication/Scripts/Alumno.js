$.get("Alumno/listStudents", function (data) {
    createList(data)
})

const createList = (data) => {
    let content = ""
    content += '<table class="table" id="table-alumno">'
    content += "<thead>"
    content += "<tr>"
    content += "<td>StudentID<td>"
    content += "<td>Nombre<td>"
    content += "<td>Primer Apellido<td>"
    content += "<td>Segundo Apellido<td>"
    content += "<td>Contacto<td>"
    content += "</tr>"
    content += "</thead>"

    content += "<tbody>"
    for (let i = 0; i < data.length; i++) {
        content += "<tr>"
        content += `<td>${data[i].IIDALUMNO}</td>`
        content += `<td></td>`
        content += `<td>${data[i].NOMBRE}</td>`
        content += `<td></td>`
        content += `<td>${data[i].APPATERNO}</td>`
        content += `<td></td>`
        content += `<td>${data[i].APMATERNO}</td>`
        content += `<td></td>`
        content += `<td>${data[i].TELEFONOPADRE}</td>`
        content += "</tr>"
    }
    content += "</tbody>"
    content += "</table>"

    document.getElementById("div-table-alumno").innerHTML = content

    $("#table-curso").dataTable(
        { searching: false }
    )
}

$.get("Alumno/listGender", function (data) {
    populateCbo(data, document.getElementById("cbo-gender"))
})

const populateCbo = (data, control) => {
    let content
    content += "<option>--Seleccione--</option>"
    for (let i = 0; i < data.length; i++) {
        content += `<option value="${data[i].IID}">${data[i].NOMBRE}</option>`
    }
   control.innerHTML = content
}

const filterByGender = () => {
    $.get(`Alumno/filterByGender/?iidsexo=${document.getElementById("cbo-gender").value}`, function(data) {
        createList(data)
    })
}