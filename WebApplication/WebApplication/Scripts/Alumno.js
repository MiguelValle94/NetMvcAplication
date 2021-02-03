$(".datepicker").datepicker(
    {
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true
    }
)

$.get("Alumno/listStudents", (data) => {
    createList(data)
})

const createList = (data) => {
    let content = ""
    content += '<table class="table" id="table-alumno">'
    content += "<thead>"
    content += "<tr>"
    content += "<td>StudentID</td>"
    content += "<td>Nombre</td>"
    content += "<td>Primer Apellido</td>"
    content += "<td>Segundo Apellido</td>"
    content += "<td>Contacto</td>"
    content += "<td>Acciones</td>"
    content += "</tr>"
    content += "</thead>"

    content += "<tbody>"
    for (let i = 0; i < data.length; i++) {
        content += "<tr>"
        content += `<td>${data[i].IIDALUMNO}</td>`
        content += `<td>${data[i].NOMBRE}</td>`
        content += `<td>${data[i].APPATERNO}</td>`
        content += `<td>${data[i].APMATERNO}</td>`
        content += `<td>${data[i].TELEFONOPADRE}</td>`
        content += `<td><button class='btn btn-primary' onclick='openModal(${data[i].IIDALUMNO})' data-toggle='modal' data-target='#myModal'>E</button><button class='btn btn-danger' onclick='deleteRegister(${data[i].IIDALUMNO})'>X</button></td>`
        content += "</tr>"
    }
    content += "</tbody>"
    content += "</table>"

    document.getElementById("div-table-alumno").innerHTML = content

    $("#table-alumno").dataTable(
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
        $.get(`Alumno/recoverData/?id=${id}`, (data) => {
            document.getElementById("txt-id-alumno").value = data[0].IIDALUMNO
            document.getElementById("txt-name-alumno").value = data[0].NOMBRE
            document.getElementById("txt-firstsurname-alumno").value = data[0].APPATERNO
            document.getElementById("txt-secondsurname-alumno").value = data[0].APMATERNO
            document.getElementById("cbo-gender-alumno").value = data[0].IIDSEXO
            document.getElementById("num-phonefather-alumno").value = data[0].TELEFONOPADRE
            document.getElementById("num-phonemother-alumno").value = data[0].TELEFONOMADRE
            document.getElementById("txt-birthday-alumno").value = data[0].FECHANACIMIENTO
            document.getElementById("num-siblings-alumno").value = data[0].NUMEROHERMANOS
        })
    }
}

const deleteRegister = (id) => {
    const frm = new FormData()
    frm.append("IIDALUMNO", id)

    $.ajax({
        type: "GET",
        url: `Alumno/deleteData/?id=${id}`,
        data: frm,
        contentType: false,
        processData: false,
        success: data => {
            if (data !== 0) {
                $.get("Alumno/listStudents", (data) => {
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

const sendData = () => {
    if (mandatoryData()) {
        const frm = new FormData()
        const id = document.getElementById("txt-id-alumno").value
        const name = document.getElementById("txt-name-alumno").value
        const fsurname = document.getElementById("txt-firstsurname-alumno").value
        const ssurname = document.getElementById("txt-secondsurname-alumno").value
        const gender = document.getElementById("cbo-gender-alumno").value
        const fphone = document.getElementById("num-phonefather-alumno").value
        const mphone = document.getElementById("num-phonemother-alumno").value
        const birth = document.getElementById("txt-birthday-alumno").value
        const siblings = document.getElementById("num-siblings-alumno").value

        frm.append("IIDALUMNO", id)
        frm.append("NOMBRE", name)
        frm.append("APPATERNO", fsurname)
        frm.append("APMATERNO", ssurname)
        frm.append("IIDSEXO", gender)
        frm.append("TELEFONOPADRE", fphone)
        frm.append("TELEFONOMADRE", mphone)
        frm.append("FECHANACIMIENTO", birth)
        frm.append("NUMEROHERMANOS", siblings)
        frm.append("BHABILITADO", 1)

        $.ajax({
            type: "POST",
            url: "Alumno/saveData",
            data: frm,
            contentType: false,
            processData: false,
            success: data => {
                if (data !== 0) {
                    $.get("Alumno/listStudents", (data) => {
                        createList(data)
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

$.get("Alumno/listGender", (data) => {
    populateCbo(data, document.getElementById("cbo-gender"))
    populateCbo(data, document.getElementById("cbo-gender-alumno"))
})

const populateCbo = (data, control) => {
    let content
    content += "<option value='0'>--Seleccione--</option>"
    for (let i = 0; i < data.length; i++) {
        content += `<option value="${data[i].IID}">${data[i].NOMBRE}</option>`
    }
   control.innerHTML = content
}

const filterByGender = () => {
    const value = document.getElementById("cbo-gender").value
    if (value === "0") {
        $.get("Alumno/listStudents", (data) => {
            createList(data)
        })
    } else {
        $.get(`Alumno/filterByGender/?iidsexo=${value}`, (data) => {
            createList(data)
        })
    }
}

const clearData = () => {
    $.get("Alumno/listStudents", (data) => {
        createList(data)
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