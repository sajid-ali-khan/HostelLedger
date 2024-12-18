
//main buttons
const startBtn = document.getElementById('startButton')
const startMainBtn = document.getElementById('startMain')
const clearButton = document.getElementById('clear')

//sections
const startSection = document.getElementById('start')
const askingSection = document.getElementById('asking')
const mainSection = document.getElementById('main')

//expenses list container
const expenseList = document.getElementById('expenseList')

//inputs
const addExpense = document.getElementById('addExpense')
const isOutGoingCheckbox = document.getElementById('isOutgoing')
const amountInput = document.getElementById('amount')
const costInput = document.getElementById('cost')
const reasonInput = document.getElementById('reason')


const expenses = JSON.parse(localStorage.getItem('expenses')) || []
//placeholders
const initAmount = JSON.parse(localStorage.getItem('initItem')) || 0
const remAmount = JSON.parse(localStorage.getItem('remAmount')) || 0

initAmount = parseFloat(initAmount)
remAmount = parseFloat(remAmount)


if (initAmount !== 0 || remAmount !== 0){
    askingSection.classList.add('hidden')
    startSection.classList.add('hidden')
    mainSection.classList.remove('hidden')

    renderExpenses()
}

startBtn.addEventListener('click', () => {
    startSection.classList.add('hidden')
    mainSection.classList.add('hidden')
    askingSection.classList.remove('hidden')
})

startMainBtn.addEventListener('click', () => {
    const amount = 
    askingSection.classList.add('hidden')
    startSection.classList.add('hidden')
    mainSection.classList.remove('hidden')
})

clearButton.addEventListener('click', () => {
    askingSection.classList.add('hidden')
    mainSection.classList.add('hidden')
    startSection.classList.remove('hidden')
})

addExpense.addEventListener('click', () => {
    const cost = costInput.value.trim()
    const reason = reasonInput.value.trim()
    const isOutgoing = isOutGoingCheckbox.checked

    if(!cost || !reason || isNaN(cost)){
        return;
    }

    const time = Date.now('dd-mm-yyyy')
    

})

function saveState(){
    localStorage.setItem('initAMount', JSON.stringify(initAmount))
    localStorage.setItem('remAmount', JSON.stringify(remAmount))
    localStorage.setItem('expenses', JSON.stringify(expenses))
}

function renderExpenses(){
    //create a li for each expense
    expenses.forEach(expense => {
        const li = createExpenseElement(expense)

        //add to the expense list ui
        expenseList.appendChild(li);
    })
}

function createExpenseElement(exp){

}



