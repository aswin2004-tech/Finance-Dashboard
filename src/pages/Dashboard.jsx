import React, { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'
import { monthlyData, spendingData } from "../data/chartData"

function Dashboard({ transactions, setTransactions, role, setRole }) {
  const [date, setDate] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [type, setType] = useState("")
  const [message, setMessage] = useState("")

  let totalIncome = 0
  let totalExpense = 0

  transactions.forEach((item) => {
    if (item.type === 'income') {
      totalIncome = totalIncome + item.amount
    } else {
      totalExpense = totalExpense + item.amount
    }
  })

  const balance = totalIncome - totalExpense

  const addTransaction = () => {
    if (!date || !amount || !category || !type) {
      alert("Please fill all fields")
      return
    }

    const newTransaction = {
      id: transactions.length + 1,
      date: date,
      amount: Number(amount),
      category: category,
      type: type,
    }

    const updatedTransactions = [...transactions, newTransaction]
    setTransactions(updatedTransactions)
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions))

    setDate("")
    setAmount("")
    setCategory("")
    setType("")

    setMessage("Transaction added successfully!")
    setTimeout(() => setMessage(""), 3000)
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Finance Dashboard</h1>

        <div className="role">
          <label>Select Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      <div className="cards">
        <div className="card">
          <h2>Total Balance</h2>
          <p>₹{balance}</p>
        </div>
        <div className="card">
          <h2>Total Income</h2>
          <p>₹{totalIncome}</p>
        </div>
        <div className="card">
          <h2>Total Expense</h2>
          <p>₹{totalExpense}</p>
        </div>
      </div>

      {role === "admin" && (
        <div className="add-form">
          <h3>Add Transaction</h3>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Salary">Salary</option>
            <option value="Bills">Bills</option>
          </select>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Select Type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <button className="btn-primary" onClick={addTransaction}>Add</button>
          {message && <p className="success-msg">{message}</p>}
        </div>
      )}

      <div className="charts">
        <div className="chart-box">
          <h2>Balance Trend</h2>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748B' }} />
              <YAxis tick={{ fontSize: 12, fill: '#64748B' }} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
              <Line type="monotone" dataKey="balance" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-box">
          <h2>Spending Breakdown</h2>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={spendingData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="45%"
                outerRadius={70}
                label={{ fontSize: 12, fill: '#64748B' }}
              >
                {spendingData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#ec4899'][index % 6]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
              <Legend verticalAlign="bottom" wrapperStyle={{ fontSize: '13px', paddingTop: '10px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  )
}

export default Dashboard