$.get("Seccion/listSection", (data) => {
    createList(data)
})

const createList = (data) => {
    let content = ""
    content += '<table class="table" id="table-seccion">'
    content += "<thead>"
    content += "<tr>"
    content += "<td>SectionID</td>"
    content += "<td>Nombre</td>"
    content += "<td>Acciones</td>"
    content += "</tr>"
    content += "</thead>"

    content += "<tbody>"
    for (let i = 0; i < data.length; i++) {
        content += "<tr>"
        content += `<td>${data[i].IIDSECCION}</td>`
        content += `<td>${data[i].NOMBRE}</td>`
        content += "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal'>E</button><button class='btn btn-danger'>X</button></td>"
        content += "</tr>"
    }
    content += "</tbody>"
    content += "</table>"

    document.getElementById("div-table-seccion").innerHTML = content

    $("#table-seccion").dataTable(
        { searching: false }
    )
}