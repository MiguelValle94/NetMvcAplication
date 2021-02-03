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

const openModal = () => {
    alert("Editar")
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