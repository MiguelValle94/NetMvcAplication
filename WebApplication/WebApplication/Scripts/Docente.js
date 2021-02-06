$(".datepicker").datepicker(
    {
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true
    }
)

$.get("Docente/listTeachers", (data) => {
    createList(data)
})

const createList = (data) => {
    let content = ""
    content += '<table class="table" id="table-docente">'
    content += "<thead>"
    content += "<tr>"
    content += "<td>TeacherID</td>"
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
        content += `<td>${data[i].IIDDOCENTE}</td>`
        content += `<td>${data[i].NOMBRE}</td>`
        content += `<td>${data[i].APPATERNO}</td>`
        content += `<td>${data[i].APMATERNO}</td>`
        content += `<td><button class='btn btn-primary' onclick='openModal(${data[i].IIDDOCENTE})' data-toggle='modal' data-target='#myModal'>E</button><button class='btn btn-danger' onclick='deleteRegister(${data[i].IIDDOCENTE})'>X</button></td>`
        content += "</tr>"
    }
    content += "</tbody>"
    content += "</table>"

    document.getElementById("div-table-docente").innerHTML = content

    $("#table-docente").dataTable(
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
        $.get(`Docente/recoverData/?id=${id}`, (data) => {
            document.getElementById("txt-id-docente").value = data[0].IIDDOCENTE
            document.getElementById("txt-name-docente").value = data[0].NOMBRE
            document.getElementById("txt-firstsurname-docente").value = data[0].APPATERNO
            document.getElementById("txt-secondsurname-docente").value = data[0].APMATERNO
            document.getElementById("cbo-gender-docente").value = data[0].IIDSEXO
            document.getElementById("txt-address-docente").value = data[0].DIRECCION
            document.getElementById("num-phone-docente").value = data[0].TELEFONOFIJO
            document.getElementById("num-mobile-docente").value = data[0].TELEFONOCELULAR
            document.getElementById("txt-email-docente").value = data[0].EMAIL
            document.getElementById("txt-contractdate-docente").value = data[0].FECHACONTRATO
            document.getElementById("cbo-contract-docente").value = data[0].IIDMODALIDADCONTRATO
            document.getElementById("img-photo-docente").value = data[0].FOTO
        })
    }
}

$.get("Docente/listContracts", (data) => {
    populateCbo(data, document.getElementById("cbo-contract"))
    populateCbo(data, document.getElementById("cbo-contract-docente"))
})

$.get("Alumno/listGender", (data) => {
    populateCbo(data, document.getElementById("cbo-gender-docente"))
})

const deleteRegister = (id) => {
    const frm = new FormData()
    frm.append("IIDDOCENTE", id)

    $.ajax({
        type: "GET",
        url: `Docente/deleteData/?id=${id}`,
        data: frm,
        contentType: false,
        processData: false,
        success: data => {
            if (data !== 0) {
                $.get("Docente/listTeachers", (data) => {
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
        const id = document.getElementById("txt-id-docente").value
        const name = document.getElementById("txt-name-docente").value
        const fsurname = document.getElementById("txt-firstsurname-docente").value
        const ssurname = document.getElementById("txt-secondsurname-docente").value
        const gender = document.getElementById("cbo-gender-docente").value
        const address = document.getElementById("txt-address-docente").value
        const phone = document.getElementById("num-phone-docente").value
        const mphone = document.getElementById("num-mobile-docente").value
        const email = document.getElementById("txt-email-docente").value
        const contractDate = document.getElementById("txt-contractdate-docente").value
        const contractType = document.getElementById("cbo-contract-docente").value
        //const photo = document.getElementById("img-photo-docente").value

        frm.append("IIDDOCENTE", id)
        frm.append("NOMBRE", name)
        frm.append("APPATERNO", fsurname)
        frm.append("APMATERNO", ssurname)
        frm.append("IIDSEXO", gender)
        frm.append("DIRECCION", address)
        frm.append("TELEFONOFIJO", phone)
        frm.append("TELEFONOCELULAR", mphone)
        frm.append("EMAIL", email)
        frm.append("FECHACONTRATO", contractDate)
        frm.append("IIDMODALIDADCONTRATO", contractType)
        //frm.append("FOTO", photo)
        frm.append("BHABILITADO", 1)

        $.ajax({
            type: "POST",
            url: "Docente/saveData",
            data: frm,
            contentType: false,
            processData: false,
            success: data => {
                if (data !== 0) {
                    $.get("Docente/listTeachers", (data) => {
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

const populateCbo = (data, control) => {
    let content
    content += "<option value='0'>--Seleccione--</option>"
    for (let i = 0; i < data.length; i++) {
        content += `<option value="${data[i].IID}">${data[i].NOMBRE}</option>`
    }
    control.innerHTML = content
}

const filterByContract = () => {
    const value = document.getElementById("cbo-contract").value
    if (value === "0") {
        $.get("Docente/listTeachers", (data) => {
            createList(data)
        })
    } else {
        $.get(`Docente/filterByContract/?iidcontrato=${value}`, (data) => {
            createList(data)
        })
    }
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

const selectPhoto = () => {
    const file = document.getElementById("btn-photo").files[0]
    const reader = new FileReader()
    if (reader != null) {
        reader.onloadend = () => {
            const img = document.getElementById("img-photo-docente")
            img.src = reader.result
        }
    }
    reader.readAsDataURL(file)
}