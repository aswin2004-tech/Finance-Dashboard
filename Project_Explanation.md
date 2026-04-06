# Finance Dashboard - Complete Beginner's Guide

This document breaks down every piece of the Finance Dashboard project so you can easily understand and explain it to any reviewer or beginner.

## 1. How the Project is Structured
This project is built using **React** (a popular JavaScript library for building user interfaces) and **Vite** (a super-fast build tool). 

The code lives inside the `src` folder:
- **`App.jsx`**: The "Boss" component. It holds all the main data and controls which page you are looking at.
- **`pages/Dashboard.jsx`**: The main overview page with visual charts and summary cards.
- **`pages/Transactions.jsx`**: The table page where you can search, view, edit, and filter all transactions.
- **`pages/Insights.jsx`**: The statistics page that calculates and shows your financial health.
- **`index.css`**: The design file that makes everything look beautiful, responsive, and modern.

---

## 2. App.jsx - The Brain of the App

### What it does:
`App.jsx` acts as the central brain. It stores the two most important pieces of data ("State") in the app:
1. `transactions`: The list of all your income and expenses.
2. `role`: Who is currently using the app ("viewer" or "admin").

### How it remembers data:
It uses `localStorage`. When you load the app, it checks your browser's local storage:
```javascript
const savedTransactions = JSON.parse(localStorage.getItem("transactions")) || transactions
```
If it finds saved data, it loads it. If not, it uses default mock data.

### Routing (Navigation):
It uses `react-router` to let you click on the navigation menu and jump between the Dashboard, Transactions, and Insights pages without the web page ever needing to reload. It passes down the `transactions` data to these pages as **Props** (which is just React's word for passing variables down to child components).

---

## 3. Dashboard.jsx - The Visual Overview

### What it does:
This page reads the `transactions` array passed from `App.jsx` and does some simple math to show Total Balance, Income, and Expenses.

### Key Features:
- **The Role Selector**: It contains a dropdown to switch between 'Viewer' and 'Admin'. If the user switches to 'Admin', the code dynamically shows the "Add Transaction" form.
- **Adding Transactions**: If you are an Admin, you can fill out the date, amount, category, and type. When you click "Add", it bundles that data into an object, attaches it to the `transactions` array, and saves it instantly to `localStorage`.
- **Charts (Recharts)**: We use a library called `Recharts` to draw a Line Chart (Balance Trend) and a Pie Chart (Spending Breakdown). We also wrapped them inside a `<ResponsiveContainer>` so they shrink perfectly when viewed on a mobile phone.

---

## 4. Transactions.jsx - The Data Table

### What it does:
This page displays every single transaction in a clean table format.

### Key Features:
- **Search Filtering**: It uses a standard array `.filter()` method. Whatever you type in the search bar is checked against the transaction categories. Only matches are mapped to the screen.
```javascript
const filteredTransactions = transactions.filter((item) =>
  item.category.toLowerCase().includes(search.toLowerCase())
)
```
- **Conditional Editing**: Just like the Dashboard, it checks if `role === "admin"`. If true, it renders an "Edit" button next to each transaction, allowing admins to modify past data.
- **Empty States**: If you search for something that doesn't exist, it uses a ternary operator (`condition ? true_result : false_result`) to show a friendly "No transactions found" message instead of a broken table.

---

## 5. Insights.jsx - The Math Engine

### What it does:
This page takes your raw transactions and turns them into intelligent metrics. 

### Key Features:
It loops over your data using `.forEach()` to figure out:
- Which expense was the largest (Highest Spending Category).
- The total average of all expenses.
- Your Savings Percentage (Income minus Expense, divided by Income).
It also contains logic to output a dynamic text message, like *"You are saving money this month. Good job!"* depending on your calculations.

---

## 6. index.css - The Design System

### What it does:
This file contains 100% of the project's styling. We didn't use external heavyweight templates; we wrote raw, clean CSS to demonstrate strong foundational design skills.

### Key Features:
- **CSS Variables**: We defined the core color palette (Off-whites, Indigo, Emerald) at the exact top of the file. This makes changing the theme incredibly easy because we only have to change the color code in one spot.
- **Flexbox & Grid Layouts**: 
  - We use `display: flex` to perfectly align elements like the navbar and buttons without weird floating hacks. 
  - We use `display: grid` with `grid-template-columns: repeat(3, 1fr)` to effortlessly arrange the summary cards into three equal columns.
- **Spring Animations**: We used `cubic-bezier(0.175, 0.885, 0.32, 1.275)` for our hover `transition` rules. Instead of fading linearly, this specific curve makes the buttons and cards "bounce" slightly, providing a highly premium, tactile feel.
- **Mobile Responsiveness**: The `@media` queries at the bottom ensure that if the screen shrinks to a phone size (under 768px or 480px), the grid collapses from 3 columns down to 1 column, stacking the cards neatly so users don't have to scroll sideways.
