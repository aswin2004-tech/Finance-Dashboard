# Finance Dashboard UI - Zorvyn Assignment

A clean, interactive, and fully responsive frontend finance dashboard built as part of the **Zorvyn Frontend Developer Intern** assignment.

---

##  Overview of Approach
My goal was to build a dashboard that balances **functionality with a premium, minimalist user experience**. 

Instead of relying on heavy UI libraries (like Material UI or Bootstrap), I chose to implement the design using **Vanilla CSS**. This allowed me to demonstrate fundamental CSS proficiency, including:
- Utilizing CSS Variables for a consistent design system.
- Designing a 100% custom responsive layout using Flexbox and CSS Grid paradigms.
- Polishing the UX with "springy" cubic-bezier transitions, glassmorphism, and soft drop shadows to create a truly professional feel.

The application is structured into modular React components (`Dashboard`, `Transactions`, `Insights`) kept in a clean `pages/` directory to ensure high modularity and scalability.

##  State Management Approach
Application state is handled natively using React's `useState` hook. 

State is lifted to the top-level `App.jsx` component and passed down as standard React props to the pages. This ensures that when an "Admin" edits or adds a transaction in the `Transactions.jsx` module, the charts and budget summaries in `Dashboard.jsx`, and the statistical metrics in `Insights.jsx` all instantly and reactively update.

**Data persistence** is tied directly to the state modifications—each time the transaction array is updated, the new payload is automatically synced to the browser's `localStorage` so progress is never lost between sessions.

##  Explanation of Features

### 1. Dashboard Overview
- **Summary Cards**: Quick glances at Total Balance, Total Income, and Total Expense.
- **Visualizations**: 
  - A Line Chart displaying the **Balance Trend** over time.
  - A Pie Chart showing a categorical **Spending Breakdown**, complete with interactive tooltips and custom colored legends natively imported from Recharts.

### 2. Transactions Section
- Displays a clean, tabular list of transactions including Date, Amount, Category, and Type.
- Includes an intuitive **Search bar** to quickly filter transactions specifically by their Category type.
- Gracefully handles empty data states (e.g., if a search yields no results, or if the user possesses zero transactions).

### 3. Basic Role-Based UI (RBAC Simulation)
- A simulated "Select Role" dropdown is integrated into the Dashboard head demonstrating conditional rendering.
- **Viewer Role**: Users can only read data and view charts dynamically.
- **Admin Role**: Authorizes an Admin to utilize the "Add Transaction" form and an "Edit" button nested inside the corresponding Transactions table mapping loop.

### 4. Insights Section
- A dedicated page automatically calculating user-specific financial metrics natively from the transaction payload: Highest Spending Category, Average Expense, Total Income vs Expense ratio, Savings Percentage, and dynamic observation messages based on the current financial balance.

### 5. Optional Enhancements Included
- **Data Persistence**: Transactions are saved and retrieved natively from `localStorage`.
- **Animations/Transitions**: Staggered soft fade-ups across modules and beautiful hover micro-interactions to create a 'physical' UI.
- **Responsiveness**: Fully responsive Breakpoints designed natively to render fluidly across ultra-wide desktop spaces down to extra small viewport smartphones.

##  Setup Instructions

1. **Clone or Download the repository**.
2. **Navigate into your project directory**:
   ```bash
   cd project1
   ```
3. **Install the required dependencies**:
   ```bash
   npm install
   ```
4. **Run the development server**:
   ```bash
   npm run dev
   ```
5. **Access the application**:
   Open your browser and navigate to the localhost connection string provided in your terminal (usually `http://localhost:5173`).
