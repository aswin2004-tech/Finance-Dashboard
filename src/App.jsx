import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Insights from './pages/Insights'
import transactions from './data/mockData'
import './index.css'

const savedTransactions = JSON.parse(localStorage.getItem("transactions")) || transactions

function App() {
  const [transactions, setTransactions] = useState(savedTransactions)
  const [role, setRole] = useState("viewer")

  return (
    <BrowserRouter>
      <nav>
        <Link to="/dashboard">Dashboard</Link> |{" "}
        <Link to="/transactions">Transactions</Link> |{" "}
        <Link to="/insights">Insights</Link>
      </nav>
      <Routes>
        <Route path='/dashboard' element={<Dashboard transactions={transactions} setTransactions={setTransactions} role={role} setRole={setRole}/>}/>
        <Route path='/transactions' element={<Transactions transactions={transactions}   setTransactions={setTransactions} role={role} setRole={setRole}/>}/>
        <Route path='/insights' element={<Insights transactions={transactions}/>}/>
        <Route path='*' element={<Navigate to="/dashboard"/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App