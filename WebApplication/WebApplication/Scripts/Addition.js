const addNumbers = () => {
    const numFirst = Number(document.getElementById("txtnumber-first").value)
    const numSecond = Number(document.getElementById("txtnumber-second").value)
    const addition = numFirst + numSecond
    alert(addition);
}