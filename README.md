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
├── models.py            # Create Table File
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
├── models.py            # Create Table File
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

## Updated Architecture Styles from Proposal

**Layered vs. Client-Server**

## Main differences in code between implementations

Unselected:
- **Direct Database connection**
- **Backend Server code all in one file**
- **Calculations and access done all together in app.py**

Selected:
- **Database connection isolated into own repositories directory, creating decoupling**
- **Different layers of abstraction, as represented through services and repositories classes that organize backend functionality**
- **Calculations done in service layer while access done in DBA layer (repositories)**

Rationale for Layered Selection:
- **Layered gives more abstraction and decoupling through its layer system, meaning each part only affects its smaller sphere of interacting parts. Client-server only abstracts to 2 levels meaning readability and coupling can be a bigger issue​**
- **Layered architecture allows for easier development of new functionality, which is relevant to the multi-faceted finance system concept**
- **Client-server's lack of scalability is rough for a finance app that ideally has many users and wants to expand to many simultaneous users**

---

## ⚙️ How to Run the Unselected Implementation

### 1. **Clone the Repo**
```bash
git clone https://github.com/SarahMendoza/personal-finance-app.git
cd personal-finance-app
```

### 2. **Set Up Python Environment**
```bash
python3 -m venv agentsenv
source agentsenv/bin/activate
pip install flask flask-cors mysql-connector-python flask-sqlalchemy
```

### 3. **Set Up MySQL Connection**
```
- If you don't own MySQL, download mysql database from https://dev.mysql.com/downloads/installer/

- Create MySQL database (schema) named "arch-app"
- Update URI username and password for access
  - app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:mysql1@localhost/arch_app'
  - Change "root" to your username and "mysql1" to your password

- Make sure MySQL server is running!!
```

### 4. **Run the Flask Backend**
```bash
python app.py
# Runs on http://127.0.0.1:5000
```

### 5. **Set Up and Run React Frontend**
```bash
cd src
npm install
npm start
# Runs on http://localhost:3000
```

---

## ⚙️ How to Run the Selected Implementation

### 1. **Clone the Repo If Not Already**
```bash
git clone https://github.com/SarahMendoza/personal-finance-app.git
cd personal-finance-app
```

### 2. **Set Up Python Environment**
```bash
python3 -m venv agentsenv
source agentsenv/bin/activate
pip install flask flask-cors mysql-connector-python flask-sqlalchemy
```

### 3. **Set Up MySQL Connection**
```
- If you don't own MySQL, download mysql database from https://dev.mysql.com/downloads/installer/

- Create MySQL database named "arch-app"
- Update URI username and password for access
  - app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:mysql1@localhost/arch_app'
  - Change "root" to your username and "mysql1" to your password

- Make sure MySQL server is running!!
```

### 4. **Run the Flask Backend**
```bash
python app.py
# Runs on http://127.0.0.1:5000
```

### 5. **Set Up and Run React Frontend**
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
- Users enter their **username** and **password** or create one if they do not have one
- Automatically redirected to the budget input page once logged in

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
