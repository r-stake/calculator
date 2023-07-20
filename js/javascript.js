let num1 = null;
let num2 = null;
let selectedOperator = "";
let result = 0;

const displayMain = document.querySelector(".current");
const displayAlt = document.querySelector(".previous");
const displayOp = document.querySelector(".display-operator");
const btnDigits = document.querySelectorAll(".digit");
const btnClear = document.querySelector(".clear");
const btnOperators = document.querySelectorAll(".operator");
const btnEquals = document.querySelector(".equals");

const operations = [
    { name: "+", operation: (num1, num2) => {return num1 + num2} },
    { name: "-", operation: (num1, num2) => {return num1 - num2} },
    { name: "x", operation: (num1, num2) => {return num1 * num2} },
    { name: "÷", operation: (num1, num2) => {return num1 / num2} }
]

function operate(operator, num1, num2) {
    const currentOperation = operations.find(item => item.name === operator);
    return currentOperation.operation(num1, num2);
}

function displayDigits(input) {
    if (displayMain.textContent === "0") {
        displayMain.textContent = input;
    } else {
        displayMain.textContent += input;
    }
}

function reset() {
    num1 = null;
    num2 = null;
    selectedOperator = "";
    displayMain.textContent = "0"
    if (result) {
        displayMain.textContent = result;
    }
    displayAlt.textContent = ""
    result = 0;
    
}

btnDigits.forEach(digit => {
    digit.addEventListener("click", function() {
        displayDigits(this.textContent);
    });
});

btnClear.addEventListener("click", () => {
    reset();
});

btnOperators.forEach(operator => {
    operator.addEventListener("click", function() {
        if (displayMain.textContent === "0") {
            if (selectedOperator === "") {
                return;
            }
            selectedOperator = this.textContent;
            displayOp.textContent = this.textContent;
            return;
        }
        if (selectedOperator) {
            num1 = operate(selectedOperator, num1, +displayMain.textContent);
        } 
        if (!selectedOperator) {
            num1 = +displayMain.textContent;
        }
        selectedOperator = this.textContent;
        displayAlt.textContent = num1;
        displayMain.textContent = "0";
        displayOp.textContent = this.textContent;
        displayAlt.appendChild(displayOp);
    });
});

btnEquals.addEventListener("click", function() {
    num2 = +displayMain.textContent;
    displayAlt.textContent = "";
    result = operate(selectedOperator, num1, num2);
    displayMain.textContent = result;
    reset();
});