$.get("Curso/listOfCourses", function (data) {
    createList(data)
})

const createList = (data) => {
    let content = ""
    content += '<table class="table" id="tabla-curso">'
    content += "<thead>"
    content += "<tr>"
    content += "<td>CourseID<td>"
    content += "<td>Nombre<td>"
    content += "<td>Descripcion<td>"
    content += "</tr>"
    content += "</thead>"

    content += "<tbody>"
    for (let i = 0; i < data.length; i++) {
        content += "<tr>"
        content += `<td>${data[i].IIDCURSO}</td>`
        content += `<td></td>`
        content += `<td>${data[i].NOMBRE}</td>`
        content += `<td></td>`
        content += `<td>${data[i].DESCRIPCION}</td>`
        content += "</tr>"
    }
    content += "</tbody>"
    content += "</table>"

    document.getElementById("div-table-curso").innerHTML = content

    $("#tabla-curso").dataTable(
        {searching: false}
    )
}

