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
        content += `<td><button class='btn btn-primary' onclick='openModal(${data[i].IIDPERIODO})' data-toggle='modal' data-target='#myModal'>E</button><button class='btn btn-danger' onclick='deleteRegister(${data[i].IIDPERIODO})'>X</button></td>`
        content += "</tr>"
    }
    content += "</tbody>"
    content += "</table>"

    document.getElementById("div-table-period").innerHTML = content

    $("#table-period").dataTable(
        { searching: false }
    )
}

const openModal = (id) => {
    const controllers = document.getElementsByClassName("mandatory")
    for (let i = 0; i < controllers.length; i++) {
        controllers[i].parentNode.classList.remove("error")
    }
    if (id === 0) {
        deleteInputs()
    } else {
        $.get(`Period/recoverData/?id=${id}`, (data) => {
            document.getElementById("txt-id-period").value = data[0].IIDPERIODO
            document.getElementById("txt-name-period").value = data[0].NOMBRE
            document.getElementById("txt-start-period").value = data[0].FECHAINICIO
            document.getElementById("txt-end-period").value = data[0].FECHAFIN
        })
    }
}

const mandatoryData = () => {
    let success = true
    const controllers = document.getElementsByClassName("mandatory")
    for (let i = 0; i < controllers.length; i++) {
        if (controllers[i].value == "") {
            controllers[i].parentNode.classList.add("error")
            success = false
        } else {
            controllers[i].parentNode.classList.remove("error")
        }
    }
    return success
}

const searchByName = () => {
    const name = document.getElementById("txt-name").value
    $.get("Period/searchPeriodByName/?name=" + name, data => {
        createList(data)
    }
    )
}

const deleteRegister = (id) => {
    const frm = new FormData()
    frm.append("IIDPERIODO", id)

    $.ajax({
        type: "POST",
        url: "Period/deleteData",
        data: frm,
        contentType: false,
        processData: false,
        success: data => {
            if (data !== 0) {
                $.get("Period/listPeriod", (data) => {
                    createList(data)
                })
                alert("Éxito")
                document.getElementById("btn-cancel").click()
            } else {
                alert("Error")
            }
        }
    })
}

const deleteInputs = () => {
    const controllers = document.getElementsByClassName("delete-info")
    for (let i = 0; i < controllers.length; i++) {
        controllers[i].value = ""
    }
}

const clearSearch = () => {
    $.get("Period/listPeriod", (data) => {
        createList(data)
    })

    document.getElementById("txt-name").value = ""
}

