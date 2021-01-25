const addNumbers = () => {
    const numFirst = Number(document.getElementById("txtnumber-first").value)
    const numSecond = Number(document.getElementById("txtnumber-second").value)
    const addition = numFirst + numSecond

    document.getElementById("lbladdition").innerHTML = addition
}

const clearInputs = () => {
    document.getElementById("txtnumber-first").value = ""
    document.getElementById("txtnumber-second").value = ""
    document.getElementById("lbladdition").innerHTML = 0
}