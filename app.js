const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const transactionList = document.getElementById('transaction-list');
const transactionForm = document.getElementById('transaction-form');
const transactionName = document.getElementById('transaction-name');
const transactionAmount = document.getElementById('transaction-amount');

let transactions = [];
//Teste
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
    const incomeTotal = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => acc + item, 0)
        .toFixed(2);
    const expenseTotal = amounts
        .filter(item => item < 0)
        .reduce((acc, item) => acc + item, 0)
        .toFixed(2);

    balance.innerText = `R$ ${total}`;
    income.innerText = `R$ ${incomeTotal}`;
    expense.innerText = `R$ ${Math.abs(expenseTotal).toFixed(2)}`;
}

function addTransactionDOM(transaction) {
    const sign = transaction.amount > 0 ? '+' : '-';
    const item = document.createElement('li');

    item.classList.add(transaction.amount > 0 ? 'plus' : 'minus');
    item.innerHTML = `
        ${transaction.name} <span>${sign} R$ ${Math.abs(transaction.amount).toFixed(2)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    transactionList.appendChild(item);
}

function addTransaction(event) {
    event.preventDefault();

    const transaction = {
        id: generateID(),
        name: transactionName.value,
        amount: +transactionAmount.value
    };

    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();

    transactionName.value = '';
    transactionAmount.value = '';
}

function generateID() {
    return Math.floor(Math.random() * 100000000);
}

function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    init();
}

function init() {
    transactionList.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}

transactionForm.addEventListener('submit', addTransaction);

init();
