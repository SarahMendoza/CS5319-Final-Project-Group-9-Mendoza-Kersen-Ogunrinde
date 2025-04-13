# 💸 Personal Finance App - *Budget.ly*

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

## 📁 Project Structure

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

- This is an MVP: uses **in-memory lists** (`expenses`, `goals`, etc.).
- In production, swap in a database (e.g., SQLite, PostgreSQL).
- CORS is enabled to allow cross-origin requests from frontend to backend.

---

## 🧑‍💻 Author

Developed by **Kirk Ogunrinde** — for SMU CS5319 Senior Project.



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
