# 💸 Personal Finance App - *Budget.ly*

For our Application, we decided to build a personal finance application

Welcome to **Budget.ly**, a lightweight personal finance web app designed to help users plan budgets, track expenses, and set financial goals.

---

## 🧠 Overview

This app allows users to:
- **Input a monthly budget**
- **Track expenses** by category and importance
- **Visualise spending** using charts
- **Set and update financial goals**
- **Reset their session** and start fresh

All logic is handled with a **Flask backend** and a **React + Tailwind frontend**.

---

## 📁 Unselected Structure

```bash
personal-finance-app/
├── app.py               # Flask backend API
├── /src                 # React frontend (inside client directory)
│   ├── App.js
│   ├── index.js
│   ├── components/
│   │   ├── Sidebar.tsx
│   │   ├── StartPage.tsx
│   │   ├── Home.tsx
│   │   ├── Budget.tsx
│   │   ├── Sheet.tsx
│   │   ├── Goal.tsx
│   │   └── MainBudget.tsx
└── README.md
```

## 📁 Selected Structure

```bash
personal-finance-app/
├── app.py               # Router using Flask
├── /services            # Wrappers for repositories
├── /repositories        # Database Access Classes
├── /src                 # React frontend (inside client directory)
│   ├── App.js
│   ├── index.js
│   ├── components/
│   │   ├── Sidebar.tsx
│   │   ├── StartPage.tsx
│   │   ├── Home.tsx
│   │   ├── Budget.tsx
│   │   ├── Sheet.tsx
│   │   ├── Goal.tsx
│   │   └── MainBudget.tsx
└── README.md
```

## Main differences in code between implementations

Unselected:
- **Direct Database connection**
- **Backend Server code all in one file**
- **Calculations and storage done all together**

Selected:
- **Database connection isolated into own repositories directory**
- **Different layers, as represented through services and repositories classes**
- **Calculations done in service layer while storage is in DB** 

---

## ⚙️ How to Run the App

### 1. **Clone the Repo**
```bash
git clone https://github.com/yourusername/personal-finance-app.git
cd personal-finance-app
```

### 2. **Set Up Python Environment**
```bash
python3 -m venv agentsenv
source agentsenv/bin/activate
pip install flask flask-cors
```

### 3. **Run the Flask Backend**
```bash
python app.py
# Runs on http://127.0.0.1:5000
```

### 4. **Set Up and Run React Frontend**
```bash
cd src
npm install
npm start
# Runs on http://localhost:3000
```

---

## 🧭 Feature Walkthrough

### ✅ **1. Start Page**
- URL: `/`
- Users enter their **name** which is saved to `localStorage`
- Automatically redirected to the budget input page

### ✅ **2. Budget Entry**
- URL: `/budget`
- Users enter a monthly income value
- The value is saved in the backend
- User is routed to expense tracking upon success

### ✅ **3. Expense Entry**
- URL: `/sheet`
- Users input expenses (`item`, `amount`, `category`, `importance`)
- Expenses are saved and visualised
- Users can filter expenses by category or importance

### ✅ **4. Overview (Dashboard)**
- URL: `/overview`
- Displays a pie chart breakdown of expenses
- Shows total budget, spent, and remaining

### ✅ **5. Goals Page**
- URL: `/goal`
- Users set financial goals with a target amount
- Track progress toward those goals
- Can update progress

### ✅ **6. Reset Session**
- Resets name, budget, expenses, and goals
- Returns the user to the start page

---

## 🔧 Backend API Endpoints

| Method | Endpoint         | Description                      |
|--------|------------------|----------------------------------|
| POST   | `/budget`        | Sets the user’s budget           |
| GET    | `/summary`       | Returns budget summary + chart   |
| POST   | `/expenses`      | Adds an expense                  |
| GET    | `/expenses`      | Gets all (optionally filtered)   |
| PUT    | `/expenses/:id`  | Updates an expense               |
| DELETE | `/expenses/:id`  | Deletes an expense               |
| GET    | `/goals`         | Returns all goals                |
| POST   | `/goals`         | Adds a new goal                  |
| PUT    | `/goals/:id`     | Updates progress on a goal       |
| DELETE | `/goals/:id`     | Deletes a goal                   |

---

## 💡 Notes

- CORS is enabled to allow cross-origin requests from frontend to backend.

---
