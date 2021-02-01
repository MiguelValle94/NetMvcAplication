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
        content += `<td><button class='btn btn-primary' onclick='openModal(${data[i].IIDCURSO})' data-toggle='modal' data-target='#myModal'>E</button><button class='btn btn-danger'>X</button></td>`
        content += "</tr>"
    }
    content += "</tbody>"
    content += "</table>"

    document.getElementById("div-table-curso").innerHTML = content

    $("#table-curso").dataTable(
        {searching: false}
    )
}

const openModal = (id) => {
    if (id === 0) {

    } else {
        $.get(`Curso/recoverData/?id=${id}`, (data) => {
            document.getElementById("txt-id-curso").value = data[0].IIDCURSO
            document.getElementById("txt-name-curso").value = data[0].NOMBRE
            document.getElementById("txt-description-curso").value = data[0].DESCRIPCION
        })
    }
}

const searchByName = () => {
    const name = document.getElementById("txt-name").value
    $.get(`Curso/searchCourseByName/?name=${name}`, data => {
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