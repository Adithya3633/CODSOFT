// script.js
document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const operationDisplay = document.getElementById('operation');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '0';
    let operator = '';
    let previousInput = '';
    let isOperatorClicked = false;

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.getAttribute('data-value');

            if (value === 'C') {
                currentInput = '0';
                operator = '';
                previousInput = '';
                isOperatorClicked = false;
            } else if (value === '=') {
                if (operator && previousInput !== '') {
                    currentInput = calculate(parseFloat(previousInput), parseFloat(currentInput), operator).toString();
                    operator = '';
                    previousInput = '';
                }
                isOperatorClicked = false;
            } else if (value === '←') {
                if (currentInput.length > 1) {
                    currentInput = currentInput.slice(0, -1);
                } else {
                    currentInput = '0';
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (operator && !isOperatorClicked) {
                    currentInput = calculate(parseFloat(previousInput), parseFloat(currentInput), operator).toString();
                }
                operator = value;
                previousInput = currentInput;
                isOperatorClicked = true;
            } else {
                if (isOperatorClicked) {
                    currentInput = value;
                    isOperatorClicked = false;
                } else {
                    currentInput = currentInput === '0' ? value : currentInput + value;
                }
            }

            display.textContent = currentInput;
            operationDisplay.textContent = previousInput + ' ' + operator + ' ' + (isOperatorClicked ? '' : currentInput);
        });
    });

    function calculate(num1, num2, operator) {
        switch (operator) {
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            case '*':
                return num1 * num2;
            case '/':
                return num1 / num2;
            default:
                return num2;
        }
    }
});
