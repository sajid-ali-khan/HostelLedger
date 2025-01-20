$(document).ready(function() {
    const $startBtn = $('#startButton');
    const $startMainBtn = $('#startMain');
    const $clearButton = $('#clear');

    const $startSection = $('#start');
    const $askingSection = $('#asking');
    const $mainSection = $('#main');

    const $expenseList = $('#expensesList');

    const $addExpense = $('#addExpense');
    const $isIncomingCheckbox = $('#isIncoming');
    const $amountInput = $('#amount');
    const $costInput = $('#cost');
    const $reasonInput = $('#reason');

    const $initAmountDisplay = $('#initialAmount');
    const $remAmountDisplay = $('#remainingAmount');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let initAmount = parseFloat(JSON.parse(localStorage.getItem('initAmount'))) || 0.0;
    let remAmount = parseFloat(JSON.parse(localStorage.getItem('remAmount'))) || 0.0;

    if (initAmount !== 0 || remAmount !== 0 || expenses.length > 0) {
        $askingSection.addClass('hidden');
        $startSection.addClass('hidden');
        $mainSection.removeClass('hidden');
    }

    render();

    $startBtn.click(function() {
        $startSection.addClass('hidden');
        $mainSection.addClass('hidden');
        $askingSection.removeClass('hidden');
    });

    $startMainBtn.click(function() {
        const amount = parseFloat($amountInput.val().trim());
        if (amount === 0) {
            return;
        }

        initAmount = amount;
        remAmount = initAmount;
        saveState();
        $askingSection.addClass('hidden');
        $startSection.addClass('hidden');
        $mainSection.removeClass('hidden');

        $amountInput.val('');
        render();
    });

    let clickTimeout;

    $clearButton.click(function() {
        clearTimeout(clickTimeout);
        clickTimeout = setTimeout(function() {
            remAmount = 0;
            initAmount = 0;
            expenses = [];
            saveState();
            $askingSection.addClass('hidden');
            $mainSection.addClass('hidden');
            $startSection.removeClass('hidden');
        }, 300);
    });

    $clearButton.dblclick(function() {
        clearTimeout(clickTimeout);
        localStorage.clear();
        render();
    });

    $addExpense.click(function() {
        let cost = parseFloat($costInput.val().trim());
        const reason = $reasonInput.val().trim();
        const isIncoming = $isIncomingCheckbox.prop('checked');

        if (!cost || !reason || isNaN(cost)) {
            return;
        }

        if (!isIncoming) {
            cost = -1 * cost;
        }

        const today = new Date();
        const date = today.toLocaleDateString('en-GB');

        const expenseObject = {
            time: date,
            cost,
            reason,
            isIncoming
        };

        remAmount += cost;
        expenses.push(expenseObject);

        saveState();
        render();

        $costInput.val('');
        $reasonInput.val('');
        $isIncomingCheckbox.prop('checked', false);
    });

    function saveState() {
        localStorage.setItem('initAmount', JSON.stringify(initAmount));
        localStorage.setItem('remAmount', JSON.stringify(remAmount));
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    function render() {
        $initAmountDisplay.text(initAmount);
        $remAmountDisplay.text(remAmount);

        $expenseList.empty();

        if (expenses.length === 0) {
            $expenseList.text("No expenses tracked yet.");
        }

        for (let i = expenses.length - 1; i >= 0; i--) {
            const expense = expenses[i];
            const $li = createExpenseElement(expense);
            $expenseList.append($li);
        }
    }

    function createExpenseElement(exp) {
        const $li = $('<li></li>');

        const $timeDiv = $('<div></div>').text(exp.time);
        const $reasonDiv = $('<div></div>').text(exp.reason);
        const $costDiv = $('<div></div>').text(exp.cost);

        $li.append($timeDiv, $reasonDiv, $costDiv);

        if (exp.isIncoming) {
            $li.addClass("incoming-money");
        } else {
            $li.addClass("outgoing-money");
        }

        return $li;
    }
});
