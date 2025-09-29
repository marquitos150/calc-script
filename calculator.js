function add(x, y) {
    let result = x + y;
    return processResult(result);
}

function subtract(x, y) {
    let result = x - y;
    return processResult(result);
}

function multiply(x, y) {
    let result = x * y;
    return processResult(result);
}

function divide(x, y) {
    if (y === 0) {
        alert("CAN'T DO DIVISION BY 0");
        return "NaN";
    }
    let result = x / y;
    return processResult(result);
}

function processResult(result) {
    let error = checkOverflowUnderflow(result);
    return error === "" ? String(roundTruncate(result)) : error;
}

function checkOverflowUnderflow(result) {
    if (result > 99999999999999) {
        alert("OVERFLOW ERROR");
        return "Overflow";
    }
    if (result < -99999999999999) {
        alert("UNDERFLOW ERROR");
        return "Underflow";
    }

    return "";
}

// Ensures that the results are contained within the display box (up to 14 digits not including dot)
function roundTruncate(result) {
    // Number.EPSILON ensures things like 1.005 are rounded properly
    let roundedResult = Math.round((result + Number.EPSILON) * 10000000000000) / 10000000000000;

    // Decimal is too big, truncate it
    if ((String(roundedResult)[0] === "-" && String(roundedResult).length > 15) || 
        (String(roundedResult)[0] !== "-" && String(roundedResult).length > 14)) {
        return Number(String(roundedResult).substring(0, 15));
    }

    return roundedResult;
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
let dotInDisplay = false;
let mrToggled = false;

let memArr = [0]; // for memory buttons

const display = document.querySelector(".display");
const btns = document.querySelector(".buttons-container");

display.textContent = "0";

// UI Buttons Support
btns.addEventListener("click", (e) => {
    let target = e.target;
    target.blur(); // removes focus highlight

    if (target.id === "clear") {
        display.textContent = "0";
        operand1 = "";
        operand2 = "";
        operatorPressed = false;
        mrToggled = false;
        dotInDisplay = false;
        return;
    }

    if (display.textContent === "NaN" || display.textContent === "Overflow" || display.textContent === "Underflow") {
        // prevents user from interacting with calculator until "clear" is clicked
        return;
    }
    
    if (Number.isInteger(parseInt(target.id))) {    
        if (display.textContent === "0" || resetDisplay) {
            display.textContent = target.id;
            resetDisplay = false;
        } else if (display.textContent.length < 14) {
            display.textContent += target.id;
        }
        operatorPressed = false;  
        mrToggled = false;

    } else if (target.id === "dot") {
        if (resetDisplay) {
            display.textContent = "0";
            resetDisplay = false;
        }
        if (!dotInDisplay) {
            display.textContent += ".";
            dotInDisplay = true;
        }
        mrToggled = false;

    } else if (target.id === "add" || target.id === "subtract" || 
                target.id === "multiply" || target.id === "divide") {
        if (!operatorPressed) {
            operand2 = operand1.length !== 0 ? display.textContent : "";
            operand1 = operand2.length === 0 ? display.textContent : operate(operand1, operand2, operator);
            display.textContent = operand1;
            resetDisplay = true;
            operatorPressed = true;
        }
        dotInDisplay = false;
        mrToggled = false;

        if (target.id === "add") operator = "+"; 
        if (target.id === "subtract") operator = "-"; 
        if (target.id === "multiply") operator = "*"; 
        if (target.id === "divide") operator = "/"; 

    } else if (target.id === "equals") {
        if (operand1 !== "" && !operatorPressed) {
            display.textContent = operate(operand1, display.textContent, operator);
            operand1 = "";
            operand2 = "";
            operatorPressed = false;
        }
        resetDisplay = true;
        dotInDisplay = false;
        mrToggled = false;

    } else if (target.id === "backspace") {
        display.textContent = display.textContent.length !== 1 &&
            (display.textContent.length !== 2 || display.textContent[0] !== "-") ? 
            display.textContent.substring(0, display.textContent.length - 1) : "0";
        
        if (!display.textContent.includes(".")) dotInDisplay = false;

    } else if (target.id === "sign") {
        display.textContent = String(-1 * Number(display.textContent));

    } else if (target.id === "mrc") {
        if (mrToggled) { // MC
            memArr = [0];
            mrToggled = false;
        } else { // MR
            let result = memArr.reduce((sum, current) => sum + current, 0);
            memArr = [result];
            display.textContent = String(result);
            mrToggled = true;
        }

    } else if (target.id === "m-minus") {
        memArr.push(-1 * Number(display.textContent));
        mrToggled = false;

    } else if (target.id === "m-plus") {
        memArr.push(Number(display.textContent));
        mrToggled = false;

    }
});

// Keyboard Support
document.querySelector("body").addEventListener("keydown", (e) => {
    let key = e.key;

    if (key === "Escape") {
        display.textContent = "0";
        operand1 = "";
        operand2 = "";
        operatorPressed = false;
        mrToggled = false;
        dotInDisplay = false;
        return;
    }

    if (display.textContent === "NaN" || display.textContent === "Overflow" || display.textContent === "Underflow") {
        // prevents user from interacting with calculator until "clear" is clicked
        return;
    }
    
    if (Number.isInteger(parseInt(key))) {    
        operatorPressed = false;  
        if (display.textContent === "0" || resetDisplay) {
            display.textContent = key;
            resetDisplay = false;
        } else if (display.textContent.length < 14) {
            display.textContent += key;
        }
        mrToggled = false;

    } else if (key === ".") {
        if (resetDisplay) {
            display.textContent = "0";
            resetDisplay = false;
        }
        if (!dotInDisplay) {
            display.textContent += ".";
            dotInDisplay = true;
        }
        mrToggled = false;

    } else if (key === "+" || key === "-" || key === "*" || key === "/") {
        if (!operatorPressed) {
            operand2 = operand1.length !== 0 ? display.textContent : "";
            operand1 = operand2.length === 0 ? display.textContent : operate(operand1, operand2, operator);
            display.textContent = operand1;
            resetDisplay = true;
            operatorPressed = true;
        }
        dotInDisplay = false;
        mrToggled = false;

        if (key === "+") operator = "+"; 
        if (key === "-") operator = "-"; 
        if (key === "*") operator = "*"; 
        if (key === "/") operator = "/"; 

    } else if (key === "=" || key === "Enter") {
        if (operand1 !== "" && !operatorPressed) {
            display.textContent = operate(operand1, display.textContent, operator);
            operand1 = "";
            operand2 = "";
            operatorPressed = false;
        }
        resetDisplay = true;
        dotInDisplay = false;
        mrToggled = false;

    } else if (key === "Backspace") {
        display.textContent = display.textContent.length !== 1 &&
            (display.textContent.length !== 2 || display.textContent[0] !== "-") ? 
            display.textContent.substring(0, display.textContent.length - 1) : "0";
        
        if (!display.textContent.includes(".")) dotInDisplay = false;
    }
});
