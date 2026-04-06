import React, { useState } from "react"

function Transactions({ transactions, setTransactions, role }) {
  const [search, setSearch] = useState("")
  const [editId, setEditId] = useState(null)
  const [editData, setEditData] = useState({})

  const filteredTransactions = transactions.filter((item) =>
    item.category.toLowerCase().includes(search.toLowerCase())
  )

  const handleSave = () => {
    const updated = transactions.map((item) =>
      item.id === editId ? editData : item
    )
    setTransactions(updated)
    localStorage.setItem("transactions", JSON.stringify(updated))
    setEditId(null)
  }

  return (
    <div className="page">
      <h1>Transactions Page</h1>

      <input
        className="search-bar"
        type="text"
        placeholder="Search by category"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredTransactions.length === 0 ? (
        <div className="empty-msg">No transactions found.</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Type</th>
              {role === "admin" && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((item) => (
              <tr key={item.id}>
                <td>{item.date}</td>
                <td>₹{item.amount}</td>
                <td>{item.category}</td>
                <td className={item.type === "income" ? "type-income" : "type-expense"}>
                  {item.type}
                </td>
                {role === "admin" && (
                  <td>
                    <button className="btn-edit" onClick={() => { setEditId(item.id); setEditData({...item}) }}>
                      Edit
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editId && (
        <div className="edit-form">
          <h3>Edit Transaction</h3>
          <input type="date" value={editData.date}
            onChange={(e) => setEditData({ ...editData, date: e.target.value })}
          />
          <input type="number" value={editData.amount}
            onChange={(e) => setEditData({ ...editData, amount: Number(e.target.value) })}
          />
          <select value={editData.category}
            onChange={(e) => setEditData({ ...editData, category: e.target.value })}
          >
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Salary">Salary</option>
            <option value="Bills">Bills</option>
            <option value="Freelance">Freelance</option>
          </select>
          <select value={editData.type}
            onChange={(e) => setEditData({ ...editData, type: e.target.value })}
          >
            <option value="income">income</option>
            <option value="expense">expense</option>
          </select>
          <button className="btn-primary" onClick={handleSave}>Save</button>
          <button className="btn-secondary" onClick={() => setEditId(null)}>Cancel</button>
        </div>
      )}

    </div>
  )
}

export default Transactions