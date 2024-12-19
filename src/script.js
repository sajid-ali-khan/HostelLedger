document.addEventListener('DOMContentLoaded', () => {
    //main buttons
    const startBtn = document.getElementById('startButton')
    const startMainBtn = document.getElementById('startMain')
    const clearButton = document.getElementById('clear')

    //sections
    const startSection = document.getElementById('start')
    const askingSection = document.getElementById('asking')
    const mainSection = document.getElementById('main')

    //expenses list container
    const expenseList = document.getElementById('expensesList')

    //inputs
    const addExpense = document.getElementById('addExpense')
    const isOutGoingCheckbox = document.getElementById('isOutgoing')
    const amountInput = document.getElementById('amount')
    const costInput = document.getElementById('cost')
    const reasonInput = document.getElementById('reason')


    let expenses = JSON.parse(localStorage.getItem('expenses')) || []
    //placeholders
    let initAmount = parseFloat(JSON.parse(localStorage.getItem('initItem'))) || 0.0
    let remAmount = parseFloat(JSON.parse(localStorage.getItem('remAmount'))) || 0

    if (initAmount !== 0 || remAmount !== 0) {
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
        const amount = parseFloat(amountInput.value.trim());
        if (amount === 0) {
            return;
        }
        askingSection.classList.add('hidden')
        startSection.classList.add('hidden')
        mainSection.classList.remove('hidden')
    })

    clearButton.addEventListener('click', () => {
        remAmount = 0;
        initAmount = 0;
        expenses = []
        saveState();
        askingSection.classList.add('hidden')
        mainSection.classList.add('hidden')
        startSection.classList.remove('hidden')
    })

    addExpense.addEventListener('click', () => {
        const cost = costInput.value.trim()
        const reason = reasonInput.value.trim()
        const isOutgoing = isOutGoingCheckbox.checked

        if (!cost || !reason || isNaN(cost)) {
            return;
        }

        const today = new Date();

        const date = today.toLocaleDateString('en-GB'); 

        const expenseObject = {
            time: date,
            cost,
            reason,
            isOutgoing
        }

        console.log(expenseObject)
        expenses.push(expenseObject)
        renderExpenses()
    })

    function saveState() {
        localStorage.setItem('initAMount', JSON.stringify(initAmount))
        localStorage.setItem('remAmount', JSON.stringify(remAmount))
        localStorage.setItem('expenses', JSON.stringify(expenses))
    }

    function renderExpenses() {
        expenseList.innerHTML = "";
        //create a li for each expense
        for(let i = expenses.length - 1; i >= 0; i--){
            const expense = expenses[i]

            const li = createExpenseElement(expense)

            console.log(li)
            expenseList.appendChild(li)
        }
        saveState();
    }

    function createExpenseElement(exp) {
        const li = document.createElement('li');

        const timeDiv = document.createElement('div')
        const reasonDiv = document.createElement('div')
        const costDiv = document.createElement('div')

        timeDiv.textContent = exp.time;
        reasonDiv.textContent = exp.reason;
        exp.cost = parseFloat(exp.cost)
        costDiv.textContent = (exp.isOutgoing) ? -exp.cost : exp.cost

        li.appendChild(timeDiv)
        li.appendChild(reasonDiv)
        li.appendChild(costDiv)

        return li
    }
})



