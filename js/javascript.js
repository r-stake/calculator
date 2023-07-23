let num1 = 0;
let num2 = 0;
let selectedOperator = "";
let result = 0;
let isFatalError = false;

const displayMain = document.querySelector(".current");
const displayAlt = document.querySelector(".previous");
const displayOp = document.querySelector(".display-operator");
const displayError = document.querySelector(".display-error")
const btnDigits = document.querySelectorAll(".digit");
const btnClear = document.querySelector(".clear");
const btnOperators = document.querySelectorAll(".operator");
const btnEquals = document.querySelector(".equals");
const btnDecimal = document.querySelector(".decimal");
const btnBackspace = document.querySelector(".backspace");

const operations = [
    { name: "+", operation: (num1, num2) => {return num1 + num2} },
    { name: "-", operation: (num1, num2) => {return num1 - num2} },
    { name: "x", operation: (num1, num2) => {return num1 * num2} },
    { name: "÷", operation: (num1, num2) => {
        if (num2 === 0) {
            displayError.textContent = "Did you just try to divide by zero?!";
            isFatalError = true;
            return;
        }
        return num1 / num2} 
    }
]

function operate(operator, num1, num2) {
    const currentOperation = operations.find(item => item.name === operator);
    return currentOperation.operation(num1, num2);
}

function displayDigits(input) {
    if (displayMain.textContent === "0") {
        displayMain.textContent = input;
    } else {
        if (displayMain.textContent.length >= 13) {
            displayError.textContent = "Too many numbers"
            displayAlt.parentNode.insertBefore(displayError, displayAlt);
            return;
        }
        displayMain.textContent += input;
    }
}

function reset() {
    num1 = 0;
    num2 = 0;
    selectedOperator = "";
    displayMain.textContent = "0";
    if (result) {
        displayMain.textContent = formatNumber(result);
    }
    displayError.textContent = ""
    displayAlt.textContent = "";
    result = 0;
}

function formatNumber(num) {
    const absoluteNum = Math.abs(num);
    if (absoluteNum >= 1e+12 || (absoluteNum > 0 && absoluteNum < 1e-11)) {
        return num.toExponential(5);
    } else {
        return num.toString();
    }
}

btnDigits.forEach(digit => {
    digit.addEventListener("click", function() {
        if (isFatalError) {
            reset();
            isFatalError = false;
        }
        displayDigits(this.textContent);
    });
});

btnClear.addEventListener("click", () => {
    reset();
});

btnOperators.forEach(operator => {
    operator.addEventListener("click", function() {
        // Allow to change the operator when no value is set
        if (displayMain.textContent === "0") {
            if (selectedOperator === "") {
                return;
            }
            selectedOperator = this.textContent;
            displayOp.textContent = this.textContent;
            return;
        }
        // Chain operations together
        if (selectedOperator) {
            num1 = operate(selectedOperator, num1, +displayMain.textContent);
        }
        if (!selectedOperator) {
            num1 = +displayMain.textContent;
        }
        selectedOperator = this.textContent;
        displayAlt.textContent = formatNumber(num1);
        displayMain.textContent = "0";
        displayError.textContent = ""
        displayOp.textContent = this.textContent;
        displayAlt.appendChild(displayOp);
    });
});

btnEquals.addEventListener("click", function() {
    num2 = +displayMain.textContent;
    displayAlt.textContent = "";
    result = operate(selectedOperator, num1, num2);
    displayMain.textContent = formatNumber(result);
    reset();
});

btnDecimal.addEventListener("click", () => {
    if (!displayMain.textContent.includes(".")) {
        displayMain.textContent += "."
    };
});


btnBackspace.addEventListener("click", () => {
    if (displayMain.textContent === "0") {
        return;
    }
    displayMain.textContent = displayMain.textContent.slice(0, -1);
});
