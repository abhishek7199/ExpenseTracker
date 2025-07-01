document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");
    const formTextInput = document.getElementById("form-text");
    const formNumberInput = document.getElementById("form-number");
    const expenseList = document.querySelector(".expense-list");
    const totalAmountDisplay = document.querySelector(".total-amount");

    let expenses = JSON.parse(localStorage.getItem("expense")) || [];
    let totalAmount = calculateTotal();
    totalAmountDisplay.textContent = `$${totalAmount.toFixed(2)}`;
    renderList();

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = formTextInput.value.trim();
        const amount = parseFloat(formNumberInput.value.trim());

        if (name !== "" && !isNaN(amount) && amount > 0) {
            const newExpense = {
                id: Date.now(),
                name,
                amount
            }

            expenses.push(newExpense);
            saveLocal();
            renderList();
            updateAmount();

            formTextInput.value = "";
            formNumberInput.value = "";
        }
    });

    function renderList() {
        expenseList.innerHTML = "";
        expenses.forEach(expense => {
            let li = document.createElement("li");
            li.innerHTML = `
            ${expense.name} - $${expense.amount}
            `;
            let btn = document.createElement("button");
            btn.setAttribute("class", `${expense.id}`);
            btn.innerText = "Delete";
            li.appendChild(btn);
            expenseList.appendChild(li);
        });
    }

    function saveLocal() {
        localStorage.setItem("expense", JSON.stringify(expenses));

    }

    function calculateTotal() {
        return expenses.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);
    }

    function updateAmount() {
        totalAmount = calculateTotal();
        totalAmountDisplay.textContent = `$${totalAmount.toFixed(2)}`;
    }

    expenseList.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const expenseId = parseInt(e.target.getAttribute('class'));
            expenses = expenses.filter((expense) => expense.id !== expenseId);
            saveLocal();
            updateAmount();
            renderList();
        }
    });
});