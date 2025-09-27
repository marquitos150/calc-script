function add(x, y) {
    return String(x + y);
}

function subtract(x, y) {
    return String(x - y);
}

function multiply(x, y) {
    return String(x * y);
}

function divide(x, y) {
    if (y === 0) {
        alert("CAN'T DO DIVISION BY 0");
        return;
    }
    return String(x / y);
}

function operate(operand1, operand2, operator) {
    if (operator === "+") return add(Number(operand1), Number(operand2));
    if (operator === "-") return subtract(Number(operand1), Number(operand2));
    if (operator === "*") return multiply(Number(operand1), Number(operand2));
    if (operator === "/") return divide(Number(operand1), Number(operand2));
}

let operand1 = "";
let operator = "";
let operand2 = "";

const display = document.querySelector(".display");
display.textContent = "0";
const btns = document.querySelector(".buttons-container");
console.log(btns);
btns.addEventListener("click", (e) => {
    let target = e.target;

    if (target.id === "clear") {
        display.textContent = "0";
        operand1 = "";
        operand2 = "";

    } else if (Number.isInteger(parseInt(target.id)) && display.textContent.length < 8) {        
        if (display.textContent === "0" || 
            display.textContent === operand1 || display.textContent === operand2) {
            display.textContent = target.id;
        } else {
            display.textContent += target.id;
        }

    } else if (target.id === "add") {
        operand2 = operand1.length !== 0 ? display.textContent : "";
        operand1 = operand2.length === 0 ? display.textContent : operate(operand1, operand2, operator);
        display.textContent = operand1;
        operator = "+";

    } else if (target.id === "subtract") {
        operand2 = operand1.length !== 0 ? display.textContent : "";
        operand1 = operand2.length === 0 ? display.textContent : operate(operand1, operand2, operator);
        display.textContent = operand1;
        operator = "-";

    } else if (target.id === "multiply") {
        operand2 = operand1.length !== 0 ? display.textContent : "";
        operand1 = operand2.length === 0 ? display.textContent : operate(operand1, operand2, operator);
        display.textContent = operand1;
        operator = "*";

    } else if (target.id === "divide") {
        operand2 = operand1.length !== 0 ? display.textContent : "";
        operand1 = operand2.length === 0 ? display.textContent : operate(operand1, operand2, operator);
        display.textContent = operand1;
        operator = "/";

    } else if (target.id === "equals") {
        display.textContent = operate(operand1, display.textContent, operator);
        operand1 = "";
        operand2 = display.textContent;
    }
});
