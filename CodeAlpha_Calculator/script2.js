const display = document.getElementById("display");
function appendToDisplay(input){
    display.value += input;
}
function clearDisplay() {
    display.value = "";
}
function deleteLastfromDisplay() {
    let display = document.getElementById("display");
    display.value = display.value.slice(0, -1);
}
function calculate(){
    try{
    display.value = eval(display.value);
    }
    catch(error) {
        display.value = "error";
    }
}

document.addEventListener("keydown", function (event) {
    const key = event.key;

    if (!isNaN(key) || "+-*/().".includes(key)) {
        appendToDisplay(key);
    } else if (key === "Enter") {
        event.preventDefault();
        calculate();
    } else if (key === "Backspace") {
        deleteLastfromDisplay();
    } else if (key === "Escape") {
        clearDisplay();
    }
});
window.onload = () => display.focus();