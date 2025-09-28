function add(x, y) {
    let result = roundTruncate(x + y);
    return checkOverflow(result) ? "Overflow" : String(result);
}

function subtract(x, y) {
    let result = roundTruncate(x - y);
    return checkOverflow(result) ? "Overflow" : String(result);
}

function multiply(x, y) {
    let result = roundTruncate(x * y);
    return checkOverflow(result) ? "Overflow" : String(result);
}

function divide(x, y) {
    if (y === 0) {
        alert("CAN'T DO DIVISION BY 0");
        return "NaN";
    }
    let result = roundTruncate(x / y);
    return checkOverflow(result) ? "Overflow" : String(result);
}

function checkOverflow(result) {
    if (result > 99999999999999) {
        alert("OVERFLOW ERROR");
        return true;
    }

    return false;
}

// Ensures that the results are contained within the display box (up to 14 digits not including dot)
function roundTruncate(result) {
    // Number.EPSILON ensures things like 1.005 are rounded properly
    let roundedResult = Math.round((result + Number.EPSILON) * 10000000000000) / 10000000000000;

    // Decimal is too big, truncate it and then round again
    if (String(roundedResult).length > 15) {
        return Number(String(roundedResult).substring(0, 15));
    }

    return roundedResult
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

let resetDisplay = false;
let operatorPressed = false;

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
        operatorPressed = false;
        return;
    }

    if (display.textContent === "NaN" || display.textContent === "Overflow") {
        // prevents user from interacting with calculator until "clear" is clicked
        return;
    }
    
    if (Number.isInteger(parseInt(target.id))) {    
        operatorPressed = false;  
        if (display.textContent === "0" || resetDisplay) {
            display.textContent = target.id;
            resetDisplay = false;
        } else if (display.textContent.length < 14) {
            display.textContent += target.id;
        }

    } else if (target.id === "add") {
        if (!operatorPressed) {
            operand2 = operand1.length !== 0 ? display.textContent : "";
            operand1 = operand2.length === 0 ? display.textContent : operate(operand1, operand2, operator);
            display.textContent = operand1;
            resetDisplay = true;
            operatorPressed = true;
        }
        operator = "+";

    } else if (target.id === "subtract") {
        if (!operatorPressed) {
            operand2 = operand1.length !== 0 ? display.textContent : "";
            operand1 = operand2.length === 0 ? display.textContent : operate(operand1, operand2, operator);
            display.textContent = operand1;
            resetDisplay = true;
            operatorPressed = true;
        }
        operator = "-";

    } else if (target.id === "multiply") {
        if (!operatorPressed) {
            operand2 = operand1.length !== 0 ? display.textContent : "";
            operand1 = operand2.length === 0 ? display.textContent : operate(operand1, operand2, operator);
            display.textContent = operand1;
            resetDisplay = true;
            operatorPressed = true;
        }
        operator = "*";

    } else if (target.id === "divide") {
        if (!operatorPressed) {
            operand2 = operand1.length !== 0 ? display.textContent : "";
            operand1 = operand2.length === 0 ? display.textContent : operate(operand1, operand2, operator);
            display.textContent = operand1;
            resetDisplay = true;
            operatorPressed = true;
        }
        operator = "/";

    } else if (target.id === "equals") {
        if (operand1 !== "" && !operatorPressed) {
            display.textContent = operate(operand1, display.textContent, operator);
            operand1 = "";
            operand2 = "";
            operatorPressed = false;
        }
        resetDisplay = true;
    }
});
