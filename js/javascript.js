let num1 = 0;
let num2 = 0;
let operator = 0;
let displayString = 0;
const displayCurrentScreen = document.querySelector(".current");
const displayPreviousScreen = document.querySelector(".previous");
const displayScreenOperator = document.querySelector(".display-operator");
const btnDigits = document.querySelectorAll(".digit");
const btnClear = document.querySelector(".clear");
const btnOperators = document.querySelectorAll(".operator");

const operations = [
    { name: "+", operation: (num1, num2) => {return num1 + num2} },
    { name: "-", operation: (num1, num2) => {return num1 - num2} },
    { name: "*", operation: (num1, num2) => {return num1 * num2} },
    { name: "/", operation: (num1, num2) => {return num1 / num2} }
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
        operator = this.textContent;
        num1 = +displayString;
        displayCurrentScreen.textContent = "0";
        displayPreviousScreen.textContent = displayString;
        displayScreenOperator.textContent = this.textContent;
        displayPreviousScreen.appendChild(displayScreenOperator);
    });
});
console.log(displayPreviousScreen);
console.log(btnOperators);