let num1 = 0;
let num2 = 0;
let selectedOperator = "";
let displayString = 0;
let result = 0;

const displayCurrentScreen = document.querySelector(".current");
const displayPreviousScreen = document.querySelector(".previous");
const displayScreenOperator = document.querySelector(".display-operator");
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
    if (displayCurrentScreen.textContent === "0") {
        displayString = input;
        displayCurrentScreen.textContent = displayString;
    } else {
        displayString += input;
        displayCurrentScreen.textContent += input;
    }
    console.log(displayString);
}

btnDigits.forEach(digit => {
    digit.addEventListener("click", function() {
        displayDigits(this.textContent);
    });
});

btnClear.addEventListener("click", () => {
    displayCurrentScreen.textContent = "0"
    displayPreviousScreen.textContent = ""
});

btnOperators.forEach(operator => {
    operator.addEventListener("click", function() {
        selectedOperator = this.textContent;
        num1 = +displayString;
        displayPreviousScreen.textContent = displayString;
        displayString = "0";
        displayCurrentScreen.textContent = "0";
        displayScreenOperator.textContent = this.textContent;
        displayPreviousScreen.appendChild(displayScreenOperator);
        console.log(selectedOperator);
    });
});

btnEquals.addEventListener("click", function() {
    num2 = +displayString;
    displayPreviousScreen.textContent = "";
    result = operate(selectedOperator, num1, num2);
    displayString = result;
    displayCurrentScreen.textContent = result;
});