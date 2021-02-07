$.get("GradoSeccion/listGradoSeccion", (data) => {
    createList(data)
})

$.get("GradoSeccion/listSection", (data) => {
    populateCbo(data, document.getElementById("cbo-seccion"), true)
})

$.get("GradoSeccion/listGrade", (data) => {
    populateCbo(data, document.getElementById("cbo-grado"), true)
})

const createList = (data) => {
    let content = ""
    content += '<table class="table" id="table-gradoseccion">'
    content += "<thead>"
    content += "<tr>"
    content += "<td>ID GRADOSECCION</td>"
    content += "<td>NOMBRE GRADO</td>"
    content += "<td>NOMBRE SECCION</td>"
    content += "</tr>"
    content += "</thead>"

    content += "<tbody>"
    for (let i = 0; i < data.length; i++) {
        content += "<tr>"
        content += `<td>${data[i].IID}</td>`
        content += `<td>${data[i].NOMBREGRADO}</td>`
        content += `<td>${data[i].NOMBRESECCION}</td>`
        content += `<td><button class='btn btn-primary' onclick='openModal(${data[i].IID})' data-toggle='modal' data-target='#myModal'>E</button><button class='btn btn-danger' onclick='deleteRegister(${data[i].IID})'>X</button></td>`
        content += "</tr>"
    }
    content += "</tbody>"
    content += "</table>"

    document.getElementById("div-table-gradoseccion").innerHTML = content

    $("#table-gradoseccion").dataTable(
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
        $.get(`GradoSeccion/recoverData/?id=${id}`, (data) => {
            document.getElementById("txt-id-gradoseccion").value = data.IID
            document.getElementById("cbo-grado").value = data.IIDGRADO
            document.getElementById("cbo-seccion").value = data.IIDSECCION
        })
    }
}

const populateCbo = (data, control) => {
    let content
    content += "<option value='0'>--Seleccione--</option>"
    for (let i = 0; i < data.length; i++) {
        content += `<option value="${data[i].IID}">${data[i].NOMBRE}</option>`
    }
    control.innerHTML = content
}

const sendData = () => {
    if (mandatoryData()) {
        const frm = new FormData()
        const id = document.getElementById("txt-id-gradoseccion").value
        const grade = document.getElementById("cbo-grado").value
        const section = document.getElementById("cbo-seccion").value

        frm.append("IID", id)
        frm.append("IIDGRADO", grade)
        frm.append("IIDSECCION", section)
        frm.append("BHABILITADO", 1)

        $.ajax({
            type: "POST",
            url: "GradoSeccion/saveData",
            data: frm,
            contentType: false,
            processData: false,
            success: data => {
                if (data !== 0) {
                    $.get("GradoSeccion/listGradoSeccion", (data) => {
                        createList(data)
                    })
                    $.get("GradoSeccion/listSection", (data) => {
                        populateCbo(data, document.getElementById("cbo-seccion"), true)
                    })

                    $.get("GradoSeccion/listGrade", (data) => {
                        populateCbo(data, document.getElementById("cbo-grado"), true)
                    })
                    alert("Éxito")
                    document.getElementById("btn-cancel").click()
                } else {
                    alert("Error")
                }
            }
        })
    } else {
        mandatoryData()
    }
}

const deleteRegister = (id) => {
    $.get(`GradoSeccion/deleteData/?id=${id}`, data => {
        if (data !== 0) {
            $.get("GradoSeccion/listGradoSeccion", (data) => {
                createList(data)
            })
            $.get("GradoSeccion/listSection", (data) => {
                populateCbo(data, document.getElementById("cbo-seccion"), true)
            })

            $.get("GradoSeccion/listGrade", (data) => {
                populateCbo(data, document.getElementById("cbo-grado"), true)
            })
            alert("Éxito")
            document.getElementById("btn-cancel").click()
        } else {
            alert("Error")
         }
    })
}

const deleteInputs = () => {
    const controllers = document.getElementsByClassName("delete-info")
    for (let i = 0; i < controllers.length; i++) {
        controllers[i].value = ""
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