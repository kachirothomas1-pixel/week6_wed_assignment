# SpendWise — Week 6 JavaScript Foundation

SpendWise is a beginner-friendly personal budget tracker built with HTML, CSS and JavaScript. It helps a user set a budget, record expenses, calculate total spending and see the remaining balance. Currency is displayed in Kenyan shillings (KES).

## Project files

- `index.html` — page structure, budget form, expense form and summary sections.
- `style.css` — layout, colours, spacing and responsive styling.
- `script.js` — application variables, user input, calculations, reusable functions and DOM updates.

## JavaScript concepts implemented

### 1. Variables and data types

- `let budget = 0` stores the user's budget as a number.
- `let expenses = []` stores expense records in an array.
- Each expense is an object with a `name` (string) and an `amount` (number).
- `const` is used for values that are only needed within a calculation or event handler and should not be reassigned.

### 2. Collecting user input

Users can enter a budget and expenses in the forms on the webpage. The **Enter details with prompts** button also uses JavaScript's `window.prompt()` to collect a budget, an expense description and an expense amount. Input values are converted to numbers with `Number()` and validated before they are stored.

### 3. Budget calculations

- `calculateTotalExpenses()` adds all expense amounts.
- `calculateBalance()` subtracts total expenses from the budget.
- The dashboard also calculates the percentage of the budget used.

The main calculation is:

```js
remainingBalance = budget - totalExpenses;
```

### 4. Reusable functions

- `formatCurrency(amount)` formats a number as KES.
- `calculateTotalExpenses(expenseList)` returns the sum of expenses.
- `calculateBalance(currentBudget, totalExpenses)` returns the remaining balance.
- `logBudgetSummary()` prints a clearly labelled summary in the browser console.
- `updateDashboard()` refreshes the displayed figures, expense list and progress bar.

### 5. Conditions, arrays and events

The project uses `if` statements to validate user input, an array to keep expense records, `forEach()` to display those records, and event listeners to respond to form submissions and button clicks.

## How to run the project

1. Download or clone this repository.
2. Keep all four project files in the same folder.
3. Open `index.html` in a web browser.
4. Set a budget, then add one or more expenses.
5. Alternatively, click **Enter details with prompts** to enter a budget and one expense using JavaScript prompts.
6. Open Developer Tools (usually **F12**) and select **Console** to see the labelled budget summary after each update.

## Testing checklist

- Enter a valid budget and confirm it appears in the summary.
- Add multiple expenses and confirm the total increases correctly.
- Confirm the remaining balance equals the budget minus total expenses.
- Try blank, zero, negative or non-numeric values and confirm they are rejected.
- Refresh the page and confirm the application starts with an empty budget and expense list (this foundation does not yet save data between visits).

## Technologies

HTML5 · CSS3 · Vanilla JavaScript

---
Created as the SpendWise Week 6 JavaScript Foundation assignment.
