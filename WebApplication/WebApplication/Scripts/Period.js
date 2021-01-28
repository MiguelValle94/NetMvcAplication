$.get("Period/listPeriod", data => {
    createList(data)
}
)

const createList = (data) => {
    let content = ""
    content += '<table class="table" id="table-period">'
    content += "<thead>"
    content += "<tr>"
    content += "<td>PeriodID<td>"
    content += "<td>Nombre<td>"
    content += "<td>FECHA INICIO<td>"
    content += "<td>FECHA FIN<td>"
    content += "</tr>"
    content += "</thead>"

    content += "<tbody>"
    for (let i = 0; i < data.length; i++) {
        content += "<tr>"
        content += `<td>${data[i].IIDPERIODO}</td>`
        content += `<td></td>`
        content += `<td>${data[i].NOMBRE}</td>`
        content += `<td></td>`
        content += `<td>${data[i].FECHAINICIO}</td>`
        content += `<td></td>`
        content += `<td>${data[i].FECHAFIN}</td>`
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
    $.get("Period/listPeriod", function (data) {
        createList(data)
    })

    document.getElementById("txt-name").value = ""
}