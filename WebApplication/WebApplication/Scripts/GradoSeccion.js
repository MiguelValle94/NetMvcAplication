$.get("GradoSeccion/listGradoSeccion", (data) => {
    createList(data)
})

const createList = (data) => {
    let content = ""
    content += '<table class="table" id="table-gradoseccion">'
    content += "<thead>"
    content += "<tr>"
    content += "<td>ID GRADOSECCION</td>"
    content += "<td>NOMBRE GRADO</td>"
    content += "<td>NOMBRE SECCION/td>"
    content += "</tr>"
    content += "</thead>"

    content += "<tbody>"
    for (let i = 0; i < data.length; i++) {
        content += "<tr>"
        content += `<td>${data[i].IID}</td>`
        content += `<td>${data[i].NOMBREGRADO}</td>`
        content += `<td>${data[i].NOMBRESECCION}</td>`
        content += `<td><button class='btn btn-primary' onclick='openModal(${data[i].IIDDOCENTE})' data-toggle='modal' data-target='#myModal'>E</button><button class='btn btn-danger' onclick='deleteRegister(${data[i].IIDDOCENTE})'>X</button></td>`
        content += "</tr>"
    }
    content += "</tbody>"
    content += "</table>"

    document.getElementById("div-table-gradoseccion").innerHTML = content

    $("#table-gradoseccion").dataTable(
        { searching: false }
    )
}

const populateCbo = (data, control) => {
    let content
    content += "<option value='0'>--Seleccione--</option>"
    for (let i = 0; i < data.length; i++) {
        content += `<option value="${data[i].IID}">${data[i].NOMBRE}</option>`
    }
    control.innerHTML = content
}