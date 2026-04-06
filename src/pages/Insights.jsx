import React from "react"

function Insights({ transactions }) {
  let totalExpense = 0
  let totalIncome = 0
  let highestExpense = 0
  let highestCategory = ""
  let expenseCount = 0
  let incomeCount = 0

  transactions.forEach((item) => {
    if (item.type === "expense") {
      totalExpense = totalExpense + item.amount
      expenseCount = expenseCount + 1
      if (item.amount > highestExpense) {
        highestExpense = item.amount
        highestCategory = item.category
      }
    } else {
      totalIncome = totalIncome + item.amount
      incomeCount = incomeCount + 1
    }
  })

  const avgExpense = expenseCount > 0 ? Math.round(totalExpense / expenseCount) : 0
  const savings = totalIncome - totalExpense
  const savingsPercent = totalIncome > 0 ? Math.round((savings / totalIncome) * 100) : 0

  let comparisonMessage = ""
  if (savings > 0) {
    comparisonMessage = "You are saving money this month. Good job!"
  } else if (savings === 0) {
    comparisonMessage = "Your income and expenses are equal this month."
  } else {
    comparisonMessage = "You are spending more than you earn this month."
  }

  return (
    <div className="page">
      <h1>Insights Page</h1>

      <div className="insights-grid">

        <div className="insight-card highlight">
          <h2>Highest Spending Category</h2>
          <p>{highestCategory || "N/A"}</p>
        </div>

        <div className="insight-card">
          <h2>Total Expenses</h2>
          <p className="negative">₹{totalExpense}</p>
        </div>

        <div className="insight-card">
          <h2>Total Income</h2>
          <p className="positive">₹{totalIncome}</p>
        </div>

        <div className="insight-card">
          <h2>Average Expense</h2>
          <p>₹{avgExpense}</p>
        </div>

        <div className="insight-card">
          <h2>Savings This Month</h2>
          <p className={savings >= 0 ? "positive" : "negative"}>₹{savings}</p>
        </div>

        <div className="insight-card">
          <h2>Savings Percentage</h2>
          <p className={savingsPercent >= 0 ? "positive" : "negative"}>{savingsPercent}%</p>
        </div>

        <div className="insight-card full-width highlight">
          <h2>Monthly Comparison</h2>
          <p style={{ fontSize: "16px" }}>{comparisonMessage}</p>
        </div>

        <div className="insight-card">
          <h2>Total Transactions</h2>
          <p>{transactions.length}</p>
        </div>

        <div className="insight-card">
          <h2>Income Transactions</h2>
          <p className="positive">{incomeCount}</p>
        </div>

      </div>
    </div>
  )
}

export default Insights