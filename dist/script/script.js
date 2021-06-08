class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear();
    }
    clear(){
        this.currentOperand = '';
        this.previousOperand = '';  
        this.operation = undefined;

    }
    delete(){
        //what it does is convert the current operand to string then slice the last index of the string
        this.currentOperand = this.currentOperand.toString().slice(0, -1); //this means that take the string start from 0 then get -1 which means the in the right
    }

    appendNumber(number) {
        if(number === "." && this.currentOperand.includes('.')) return //if the condition is true condtion below wont execute
             this.currentOperand = this.currentOperand.toString() + number.toString(); //this will be displayed using the code in the updateDisplay function
        
        
    }

    chooseOperation(operation){
        if(this.currentOperand === '')return
        if(this.previousOperand !== ''){ //this will automatically compute the first two numbers after clicking the second operation like 1 + 1 after clicking + again it will be 2 + the next number and will also automatically compute if equal is click by the last operator click
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand //the numbers in the current operand will be pass to the previous operand
        this.currentOperand = '' //then will be passed in the updateDisplay function
        

    }

    compute(){
        let computation
        const prev = parseFloat(this.previousOperand) //this function will convert string to number
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return //if prev and current is not a number then cancel
        switch(this.operation){
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '×':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation //currentOperand will be equal to the returned value of the variable computation
        this.operation = undefined
        this.previousOperand = ''


    }
    getDisplayNumber(number){
        //code below just enable comma after 3 digits as well as the point to display after the number or even before the number upon click 
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let intgerDisplay 
        if(isNaN(integerDigits)){
            intgerDisplay = ''

        }else{
            intgerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }

        if(decimalDigits != null){
            return `${intgerDisplay}.${decimalDigits}`

        }else{
            return intgerDisplay
        }
        // const floatNumber = parseFloat(number)//this will convert the number(which is string) to float
        // if(isNaN(floatNumber)) return '' //if the float number is nat a number return empty else
        // return floatNumber.toLocaleString('en') //this will enable the comma after every 3 digits
    }

    updateDisplay(){
        //this will display the concatinated numbers in the current operand
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if(this.operation != null){
        //this will display the concatinated numbers and operators in the previous operand
        this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }else{ 
            this.previousOperandTextElement.innerText = '' //this will clear the previous operand after clicking equal

        }

    }

} 


 const numberButtons = document.querySelectorAll('[data-number]');
 const operationButtons = document.querySelectorAll('[data-operation]');
 const equalsButton = document.querySelector('[data-equals]');
 const deleteButton = document.querySelector('[data-delete]');
 const allClearButton = document.querySelector('[data-all-clear]');
 const previousOperandTextElement = document.querySelector('[data-previous-operand]');
 const currentOperandTextElement = document.querySelector('[data-current-operand]');
 
 const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

 //numbers
 numberButtons.forEach(button => {
     button.addEventListener('click', () => {
         calculator.appendNumber(button.innerText)
         calculator.updateDisplay()
     })
 })
 
 //operations
 operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

//equal
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

//all clear
allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

//delete
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay();
})

