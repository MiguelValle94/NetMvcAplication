$(".datepicker").datepicker(
    {
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true
    }
)

$.get("Period/listPeriod", data => {
    createList(data)
}
)

const createList = (data) => {
    let content = ""
    content += '<table class="table" id="table-period">'
    content += "<thead>"
    content += "<tr>"
    content += "<td>PeriodID</td>"
    content += "<td>Nombre</td>"
    content += "<td>Fecha Inicio</td>"
    content += "<td>Fecha Fin</td>"
    content += "<td>Acciones</td>"
    content += "</tr>"
    content += "</thead>"

    content += "<tbody>"
    for (let i = 0; i < data.length; i++) {
        content += "<tr>"
        content += `<td>${data[i].IIDPERIODO}</td>`
        content += `<td>${data[i].NOMBRE}</td>`
        content += `<td>${data[i].FECHAINICIO}</td>`
        content += `<td>${data[i].FECHAFIN}</td>`
        content += "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal'>E</button><button class='btn btn-danger'>X</button></td>"
        content += "</tr>"
    }
    content += "</tbody>"
    content += "</table>"

    document.getElementById("div-table-period").innerHTML = content

    $("#table-period").dataTable(
        { searching: false }
    )
}

const searchByName = () => {
    const name = document.getElementById("txt-name").value
    $.get("Period/searchPeriodByName/?name=" + name, data => {
        createList(data)
    }
    )
}

const clearSearch = () => {
    $.get("Period/listPeriod", (data) => {
        createList(data)
    })

    document.getElementById("txt-name").value = ""
}

