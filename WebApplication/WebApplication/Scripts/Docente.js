$.get("Docente/listTeachers", function (data) {
    createList(data)
})

const createList = (data) => {
    let content = ""
    content += '<table class="table" id="table-docente">'
    content += "<thead>"
    content += "<tr>"
    content += "<td>TeacherID<td>"
    content += "<td>Nombre<td>"
    content += "<td>Primer Apellido<td>"
    content += "<td>Segundo Apellido<td>"
    content += "<td>Contacto<td>"
    content += "</tr>"
    content += "</thead>"

    content += "<tbody>"
    for (let i = 0; i < data.length; i++) {
        content += "<tr>"
        content += `<td>${data[i].IIDDOCENTE}</td>`
        content += `<td></td>`
        content += `<td>${data[i].NOMBRE}</td>`
        content += `<td></td>`
        content += `<td>${data[i].APPATERNO}</td>`
        content += `<td></td>`
        content += `<td>${data[i].APMATERNO}</td>`
        content += `<td></td>`
        content += `<td>${data[i].EMAIL}</td>`
        content += "</tr>"
    }
    content += "</tbody>"
    content += "</table>"

    document.getElementById("div-table-docente").innerHTML = content

    $("#table-curso").dataTable(
        { searching: false }
    )
}