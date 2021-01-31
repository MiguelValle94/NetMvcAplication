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
        content += `<td>${data[i].EMAIL}</td>`
        content += "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal'>E</button><button class='btn btn-danger'>X</button></td>"
        content += "</tr>"
    }
    content += "</tbody>"
    content += "</table>"

    document.getElementById("div-table-docente").innerHTML = content

    $("#table-docente").dataTable(
        { searching: false }
    )
}

$.get("Docente/listContracts", (data) => {
    populateCbo(data, document.getElementById("cbo-contract"))
    populateCbo(data, document.getElementById("cbo-contract-docente"))
})

$.get("Alumno/listGender", (data) => {
    populateCbo(data, document.getElementById("cbo-gender-docente"))
})


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