const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let previousInput = '';
let operator = '';

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');

    if (value === 'C') {

      currentInput = '';
      previousInput = '';
      operator = '';
      display.textContent = '0';
    } else if (value === '=') {
  
      if (currentInput && previousInput) {
        currentInput = calculate(previousInput, currentInput, operator);
        display.textContent = currentInput;
        previousInput = '';
        operator = '';
      }
    } else if (['+', '-', '*', '/'].includes(value)) {
 
      if (currentInput) {
        if (previousInput) {
          previousInput = calculate(previousInput, currentInput, operator);
        } else {
          previousInput = currentInput;
        }
        currentInput = '';
        operator = value;
        display.textContent = previousInput;
      }
    } else {
    
      if (value === '.' && currentInput.includes('.')) return;
      currentInput += value;
      display.textContent = currentInput;
    }
  });
});

function calculate(a, b, op) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (op) {
    case '+':
      return (a + b).toString();
    case '-':
      return (a - b).toString();
    case '*':
      return (a * b).toString();
    case '/':
      return b !== 0 ? (a / b).toString() : 'Error';
    default:
      return '';
  }
}
