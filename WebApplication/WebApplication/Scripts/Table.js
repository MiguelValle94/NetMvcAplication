$.get("Table/ListOfPeople", function(data) {
    let content = ""
    content += '<table class="table">'
    content += "<thead>"
    content += "<tr>"
    content += "<td>PersonID<td>"
    content += "<td>FirstSurname<td>"
    content += "<td>SecondSurname<td>"
    content += "</tr>"
    content += "</thead>"

    content += "<tbody>"
    content += "<tr>"
    content += "<td>d<td>"
    content += "<td>d<td>"
    content += "<td>d<td>"
    content += "</tr>"

    for (let i = 0; i < data.length; i++) {
        content += "<tr>"
        content += `<td>${data[i].idPerson}</td>`
        content += `<td>${data[i].firstSurname}</td>`
        content += `<td>${data[i].secondSurname}</td>`
        content += "</tr>"
    }
    content += "</tbody>"
    content += "</table>"

    document.getElementById("div-table").innerHTML = content
})
