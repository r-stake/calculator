let num1 = 0;
let num2 = 0;
let operator = 0;

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

console.log(operate("/", 10, 2));