document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expenseForm');
    const expenseList = document.getElementById('expenseList');
    const totalAmountElement = document.getElementById('totalAmount');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    const renderExpenses = () => {
        expenseList.innerHTML = '';
        let totalAmount = 0;

        expenses.forEach((expense, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${expense.description}</td>
                <td>${expense.category}</td>
                <td>₹${expense.amount}</td>
                <td>${expense.date}</td>
                <td>
                    <button class="edit-btn" onclick="editExpense(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteExpense(${index})">Delete</button>
                </td>
            `;
            expenseList.appendChild(row);
            totalAmount += parseFloat(expense.amount);
        });

        totalAmountElement.textContent = totalAmount.toFixed(2);
    };

    const saveToLocalStorage = () => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    };

    window.editExpense = (index) => {
        const expense = expenses[index];
        document.getElementById('description').value = expense.description;
        document.getElementById('category').value = expense.category;
        document.getElementById('amount').value = expense.amount;
        document.getElementById('date').value = expense.date;
        expenseForm.onsubmit = (e) => {
            e.preventDefault();
            expenses[index] = {
                description: document.getElementById('description').value,
                category: document.getElementById('category').value,
                amount: document.getElementById('amount').value,
                date: document.getElementById('date').value
            };
            saveToLocalStorage();
            renderExpenses();
            expenseForm.reset();
            expenseForm.onsubmit = handleFormSubmit;
        };
    };

    window.deleteExpense = (index) => {
        expenses.splice(index, 1);
        saveToLocalStorage();
        renderExpenses();
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const description = document.getElementById('description').value;
        const category = document.getElementById('category').value;
        const amount = document.getElementById('amount').value;
        const date = document.getElementById('date').value;

        if (description && category && !isNaN(amount) && date) {
            expenses.push({ description, category, amount, date });
            saveToLocalStorage();
            renderExpenses();
            expenseForm.reset();
        } else {
            alert('Please fill out all fields with valid data');
        }
    };

    expenseForm.addEventListener('submit', handleFormSubmit);
    renderExpenses();
});
