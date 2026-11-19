"use strict";

// Application data: these variables store the budget and expense information.
let budget = 0;
let expenses = [];

// Format numbers as Kenyan shillings for consistent display.
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 2
  }).format(amount);
}

// Add all expense amounts together.
function calculateTotalExpenses(expenseList) {
  return expenseList.reduce((total, expense) => total + expense.amount, 0);
}

// Calculate the money remaining after expenses.
function calculateBalance(currentBudget, totalExpenses) {
  return currentBudget - totalExpenses;
}

// Display a labelled summary in the browser console.
function logBudgetSummary() {
  const totalExpenses = calculateTotalExpenses(expenses);
  const remainingBalance = calculateBalance(budget, totalExpenses);

  console.clear();
  console.log("===== SpendWise Budget Summary =====");
  console.log("Budget:", formatCurrency(budget));
  console.log("Total expenses:", formatCurrency(totalExpenses));
  console.log("Remaining balance:", formatCurrency(remainingBalance));
  console.log("Number of expenses:", expenses.length);
  console.log("====================================");
}

// Refresh all figures and the expense list on the webpage.
function updateDashboard() {
  const totalExpenses = calculateTotalExpenses(expenses);
  const remainingBalance = calculateBalance(budget, totalExpenses);
  const usage = budget > 0 ? Math.min((totalExpenses / budget) * 100, 100) : 0;

  document.getElementById("budget-display").textContent = formatCurrency(budget);
  document.getElementById("expenses-display").textContent = formatCurrency(totalExpenses);
  document.getElementById("balance-display").textContent = formatCurrency(remainingBalance);
  document.getElementById("expense-count").textContent =
    expenses.length + (expenses.length === 1 ? " item" : " items");
  document.getElementById("usage-label").textContent =
    (budget > 0 ? (totalExpenses / budget) * 100 : 0).toFixed(1) + "%";
  document.getElementById("progress-fill").style.width = usage + "%";

  const list = document.getElementById("expense-list");
  list.innerHTML = "";

  if (expenses.length === 0) {
    const emptyMessage = document.createElement("li");
    emptyMessage.className = "empty-state";
    emptyMessage.textContent = "No expenses yet. Add your first expense above.";
    list.appendChild(emptyMessage);
  } else {
    expenses.forEach((expense) => {
      const item = document.createElement("li");
      const name = document.createElement("span");
      const amount = document.createElement("span");
      name.className = "expense-name";
      amount.className = "expense-amount";
      name.textContent = expense.name;
      amount.textContent = formatCurrency(expense.amount);
      item.append(name, amount);
      list.appendChild(item);
    });
  }

  logBudgetSummary();
}

// Save a budget supplied through the page form.
document.getElementById("budget-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const enteredBudget = Number(document.getElementById("budget-input").value);

  if (!Number.isFinite(enteredBudget) || enteredBudget <= 0) {
    alert("Please enter a budget greater than zero.");
    return;
  }

  budget = enteredBudget;
  updateDashboard();
  document.getElementById("budget-input").value = "";
});

// Collect an expense, validate it, and add it to the expenses array.
document.getElementById("expense-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const expenseName = document.getElementById("expense-name").value.trim();
  const expenseAmount = Number(document.getElementById("expense-amount").value);

  if (!expenseName || !Number.isFinite(expenseAmount) || expenseAmount <= 0) {
    alert("Please provide an expense description and an amount greater than zero.");
    return;
  }

  expenses.push({ name: expenseName, amount: expenseAmount });
  updateDashboard();
  document.getElementById("expense-form").reset();
});

// The assignment asks for JavaScript prompt input as well as stored variables.
// This button collects a budget and one expense using window.prompt().
document.getElementById("prompt-button").addEventListener("click", function () {
  const budgetInput = window.prompt("Enter your budget in KES:");
  if (budgetInput === null) return;

  const enteredBudget = Number(budgetInput);
  if (!Number.isFinite(enteredBudget) || enteredBudget <= 0) {
    alert("Please enter a valid budget greater than zero.");
    return;
  }

  const expenseName = window.prompt("Enter an expense description:");
  if (expenseName === null) return;

  const expenseInput = window.prompt("Enter the expense amount in KES:");
  if (expenseInput === null) return;

  const expenseAmount = Number(expenseInput);
  if (!expenseName.trim() || !Number.isFinite(expenseAmount) || expenseAmount <= 0) {
    alert("Please enter a description and a valid expense amount.");
    return;
  }

  budget = enteredBudget;
  expenses.push({ name: expenseName.trim(), amount: expenseAmount });
  updateDashboard();
});

// Show the initial zero-value summary when the page first loads.
updateDashboard();
