let num1 = null;
let num2 = null;
let selectedOperator = null;
let currentNumber = 0;
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
        currentNumber = input;
        displayMain.textContent = currentNumber;
    } else {
        currentNumber += input;
        displayMain.textContent = currentNumber;
    }
}

btnDigits.forEach(digit => {
    digit.addEventListener("click", function() {
        displayDigits(this.textContent);
    });
});

btnClear.addEventListener("click", () => {
    displayMain.textContent = "0"
    displayAlt.textContent = ""
    num1 = null;
    num2 = null;
    currentNumber = 0;
    selectedOperator = "";
    result = 0;
});

btnOperators.forEach(operator => {
    operator.addEventListener("click", function() {
        if (selectedOperator) {
            result = operate(selectedOperator, num1, +currentNumber);
            num1 = result;
            selectedOperator = this.textContent;
            displayAlt.textContent = result;
            currentNumber = "0";
            displayMain.textContent = "0";
        } else {
            selectedOperator = this.textContent;
            num1 = +currentNumber;
            displayAlt.textContent = currentNumber;
            currentNumber = "0";
            displayMain.textContent = "0";
            displayOp.textContent = this.textContent;
            displayAlt.appendChild(displayOp);
        }  
    });
});

btnEquals.addEventListener("click", function() {
    num2 = +currentNumber;
    displayAlt.textContent = "";
    result = operate(selectedOperator, num1, num2);
    currentNumber = result;
    displayMain.textContent = result;
    // displayMain.classList.add("result");
});