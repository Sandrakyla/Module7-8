let lastOperand = 0;
let operation = null;

const inputWindow = document.getElementById('inputWindow');

document.querySelectorAll('[data-value]').forEach(button => {
    button.addEventListener('click', function () {
        inputWindow.value += this.getAttribute('data-value');
    });
});

document.querySelectorAll('[data-operation]').forEach(button => {
    button.addEventListener('click', function () {
        const operationType = this.getAttribute('data-operation');
        if (operationType === 'calc') {
            calculateResult();
        } else if (operationType === 'root') {
            calculateSquareRoot();
        } else {
            setOperation(operationType);
        }
    });
});

document.getElementById('btn_clr').addEventListener('click', function () {
    lastOperand = 0;
    operation = null;
    inputWindow.value = '';
});

function setOperation(operationType) {
    lastOperand = parseFloat(inputWindow.value);
    operation = operationType;
    inputWindow.value = '';
}

function calculateResult() {
    const currentOperand = parseFloat(inputWindow.value);
    let result;

    switch (operation) {
        case 'sum':
            result = lastOperand + currentOperand;
            break;
        case 'def':
            result = lastOperand - currentOperand;
            break;
        case 'mult':
            result = lastOperand * currentOperand;
            break;
        case 'div':
            result = lastOperand / currentOperand;
            break;
        default:
            return;
    }

    operation = null;
    lastOperand = 0;
    inputWindow.value = result;
}

function calculateSquareRoot() {
    const currentOperand = parseFloat(inputWindow.value);
    if (currentOperand >= 0) {
        inputWindow.value = Math.sqrt(currentOperand);
    } else {
        inputWindow.value = 'Ошибка';
    }
}
