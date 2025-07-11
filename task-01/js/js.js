
const input1 = $('#firstNumber');
const input2 = $('#secondNumber');
const select = $('#myselect');
const result = $('#total');
console.log(input1, input2);

function calc(){
    result.css({
        display: 'block',
    });
    console.log(select.val());
    let firstNumber =  parseInt(input1.val()) ;
    let secondNumber = parseInt(input2.val());
    let val = select.val();
    var action = 0;
    if(val == '+'){
        action = firstNumber + secondNumber;

        
    } 
    if(val == '-') action = firstNumber - secondNumber;
    if(val == '*') action = firstNumber * secondNumber;
    if(val == '//') {
        if(secondNumber == 0) {
            action = 'Division by zero is not allowed';
            return;
        }
        action = firstNumber / secondNumber;
    }
    if(val == '%') action = firstNumber % secondNumber;
    console.log(action);
    
    result.text(action);
}