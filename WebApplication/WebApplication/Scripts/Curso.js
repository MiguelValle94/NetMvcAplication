$.get("Curso/listOfCourses", (data) => {
    createList(data)
})

const createList = (data) => {
    let content = ""
    content += '<table class="table" id="table-curso">'
    content += "<thead>"
    content += "<tr>"
    content += "<td>CourseID</td>"
    content += "<td>Nombre</td>"
    content += "<td>Descripcion</td>"
    content += "<td>Acciones</td>"
    content += "</tr>"
    content += "</thead>"

    content += "<tbody>"
    for (let i = 0; i < data.length; i++) {
        content += "<tr>"
        content += `<td>${data[i].IIDCURSO}</td>`
        content += `<td>${data[i].NOMBRE}</td>`
        content += `<td>${data[i].DESCRIPCION}</td>`
        content += "<td><button class='btn btn-primary'>E</button><button class='btn btn-danger'>X</button></td>"
        content += "</tr>"
    }
    content += "</tbody>"
    content += "</table>"

    document.getElementById("div-table-curso").innerHTML = content

    $("#table-curso").dataTable(
        {searching: false}
    )
}

const searchByName = () => {
    const name = document.getElementById("txt-name").value
    $.get("Curso/searchCourseByName/?name=" + name, data => {
        createList(data)
    }
    )
}

const clearSearch = () => {
    $.get("Curso/listOfCourses", (data) => {
        createList(data)
    })

    document.getElementById("txt-name").value = ""
}