
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let previousInput = '';
let operation = undefined;


function updateDisplay() {
    display.textContent = currentInput || '0';
}


function appendNumber(number) {
    if (number === '.' && currentInput.includes('.')) return;
    currentInput = currentInput.toString() + number.toString();
}


function chooseOperation(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        compute();
    }
    operation = op;
    previousInput = currentInput;
    currentInput = '';
}


function compute() {
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(curr)) return;

    switch (operation) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '×':
            result = prev * curr;
            break;
        case '÷':
            result = prev / curr;
            break;
        case '%':
            result = prev % curr;
            break;
        default:
            return;
    }

    currentInput = result;
    operation = undefined;
    previousInput = '';
}


function clear() {
    currentInput = '';
    previousInput = '';
    operation = undefined;
}


function backspace() {
    currentInput = currentInput.toString().slice(0, -1);
}


buttons.forEach(button => {
    button.addEventListener('click', () => {
        switch (button.id) {
            case 'clear':
                clear();
                break;
            case 'backspace':
                backspace();
                break;
            case 'percent':
                chooseOperation('%');
                break;
            case 'divide':
                chooseOperation('÷');
                break;
            case 'multiply':
                chooseOperation('×');
                break;
            case 'subtract':
                chooseOperation('−');
                break;
            case 'add':
                chooseOperation('+');
                break;
            case 'equals':
                compute();
                break;
            default:
                appendNumber(button.id);
        }
        updateDisplay();
    });
});


updateDisplay();