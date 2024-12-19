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
    const isIncomingCheckbox = document.getElementById('isIncoming')
    const amountInput = document.getElementById('amount')
    const costInput = document.getElementById('cost')
    const reasonInput = document.getElementById('reason')

    const initAmountDisplay = document.getElementById('initialAmount')
    const remAmountDisplay = document.getElementById('remainingAmount')


    let expenses = JSON.parse(localStorage.getItem('expenses')) || []
    //placeholders
    let initAmount = parseFloat(JSON.parse(localStorage.getItem('initAmount'))) || 0.0
    let remAmount = parseFloat(JSON.parse(localStorage.getItem('remAmount'))) || 0.0

    if (initAmount !== 0 || remAmount !== 0|| expenses.length > 0){
        askingSection.classList.add('hidden')
        startSection.classList.add('hidden')
        mainSection.classList.remove('hidden')
    }

    render();

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

        initAmount = parseFloat(amountInput.value.trim())
        remAmount = initAmount
        saveState();
        askingSection.classList.add('hidden')
        startSection.classList.add('hidden')
        mainSection.classList.remove('hidden')

        amountInput.value = "";
        render();
    })

    let clickTimeout;

    clearButton.addEventListener('click', () => {
        clearTimeout(clickTimeout)
        clickTimeout = setTimeout(() => {
            remAmount = 0;
            initAmount = 0;
            expenses = []
            saveState();
            askingSection.classList.add('hidden')
            mainSection.classList.add('hidden')
            startSection.classList.remove('hidden')
        }, 300)
    })

    clearButton.addEventListener('dblclick', () => {
        clearTimeout(clickTimeout)
        localStorage.clear();
        render();
    })

    addExpense.addEventListener('click', () => {
        let cost = parseFloat(costInput.value.trim())
        const reason = reasonInput.value.trim()
        const isIncoming = isIncomingCheckbox.checked

        if (!cost || !reason || isNaN(cost)) {
            return;
        }

        if (!isIncoming){
            cost = -1 * cost
        }

        const today = new Date();

        const date = today.toLocaleDateString('en-GB');

        const expenseObject = {
            time: date,
            cost,
            reason,
            isIncoming
        }

        console.log(typeof remAmount);
        

        remAmount += cost;

        // console.log(expenseObject)
        expenses.push(expenseObject)

        saveState()
        render()

        costInput.value = ""
        reasonInput.value = ""
        isIncomingCheckbox.checked = false
    })

    function saveState() {
        localStorage.setItem('initAmount', JSON.stringify(initAmount))
        localStorage.setItem('remAmount', JSON.stringify(remAmount))
        localStorage.setItem('expenses', JSON.stringify(expenses))
    }

    function render() {
        //render amounts
        initAmountDisplay.textContent = initAmount;
        remAmountDisplay.textContent = remAmount;

        //render the expenses list
        expenseList.innerHTML = "";

        if (expenses.length === 0){
            expenseList.innerHTML = "No expenses tracked yet.";
        }
        //create a li for each expense
        for (let i = expenses.length - 1; i >= 0; i--) {
            const expense = expenses[i]

            const li = createExpenseElement(expense)

            // console.log(li)
            expenseList.appendChild(li)
        }
    }

    function createExpenseElement(exp) {
        const li = document.createElement('li');

        const timeDiv = document.createElement('div')
        const reasonDiv = document.createElement('div')
        const costDiv = document.createElement('div')

        timeDiv.textContent = exp.time;
        reasonDiv.textContent = exp.reason;
        exp.cost = parseFloat(exp.cost)
        costDiv.textContent = exp.cost

        li.appendChild(timeDiv)
        li.appendChild(reasonDiv)
        li.appendChild(costDiv)

        if (exp.isIncoming){
            li.classList.add("incoming-money")
        }else{
            li.classList.add("outgoing-money")
        }

        return li
    }
})



