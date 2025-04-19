# created by Kirk Ogunrinde on April 6th, 2025

# import Flask (the main code framework)
from flask import Flask

# request is used to get data from the user's request (e.g., when they submit a new expense).
from flask import request

# jsonify is used to transform python data (like lists or dictionaries) into JSON (a format the frontend or user understands).
from flask import jsonify

# cors is used to accept requests from the frontend
from flask_cors import CORS

# session is used to save login 
from flask import session

# used to save passwords for authentication
from werkzeug.security import generate_password_hash, check_password_hash

from services.user_service import UserService
from services.expense_service import ExpenseService
from services.goal_service import GoalService
from services.summary_service import SummaryService

# initialises the app
app = Flask(__name__)
app.secret_key = "113-894-795"

# allow all frontend origins
CORS(app, supports_credentials=True)

# initialises list where we’ll store expense items 
# REPLACE
expenses = []

# initialises budget value
# REPLACE
budget = 0

# initialises goals list
# REPLACE
goals = []

# kep track of ids to assign to expenses
next_id = 1

# used to connect to database
import mysql.connector
from flask_sqlalchemy import SQLAlchemy

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:databases2024@localhost/arch-app'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

from models import db, User, Settings, Budget, Goal, Category, Expense
# db = SQLAlchemy(app)
db.init_app(app)  # 🔥 registers the app context with db

with app.app_context():
    #db.drop_all()
    db.create_all()  

# initialises list where 

# user password dictionary
# REPLACE
user_data = {
    "savings_goal": {
        "goalAmount": 0,
        "savedAmount": 0
    }
}


@app.route('/whoami')
def whoami():
    return jsonify({"user": session.get("username", "Not logged in")})

##############################################################################################################

# function inserts new expense from the user
def insert_expense_to_db(data):
    
    # replace this with SQL INSERT logic
    pass

    # allows access to the global variables "expenses" and "next_id" 
    global expenses, next_id
    
    # assigns a new id to the new expense
    data['id'] = next_id
    
    # increment next_id so the next expense would be saved with the right index
    next_id += 1
    
    # add to the in-memory list
    expenses.append(data)
    
    # return the newly added expense so it can be sent in the API response
    return data



##############################################################################################################

# listens for the "/savings-goal" endpoint
# GET -- get savings goal
@app.route('/savings-goal', methods=['GET'])
def get_savings_goal():
    username = session.get('username')
    if not username:
        return jsonify({"error": "Not logged in"}), 403

    user = UserService.get_current_user()
    if not user:
        return jsonify({"error": "User not found"}), 404

    try:
        goal = GoalService.get_goal(user.user_id)
        return jsonify({
            "goalLabel": goal.goal_label,
            "goalAmount": float(goal.goal_target_amount),
            "savedAmount": float(goal.goal_current_amount)
        })
    except ValueError:
        return jsonify({})


# listens for the "/savings-goal" endpoint
# SET -- set savings goal
@app.route('/savings-goal', methods=['POST'])
def set_savings_goal():
    data = request.get_json()
    username = session.get('username')
    if not username:
        return jsonify({"error": "Not logged in"}), 403

    user = UserService.get_current_user()
    if not user:
        return jsonify({"error": "User not found"}), 404

    try:
        GoalService.create_goal(
            user_id=user.user_id,
            goal_label=data.get("goalLabel", "Savings Goal"),
            goal_target_amount=data.get("goalAmount", 0),
            goal_current_amount=data.get("savedAmount", 0)
        )
        return jsonify({"message": "Savings goal set"})
    except Exception as e:
        return jsonify({"error": str(e)}), 400



# listens for the "/savings-goal" endpoint
# UPDATE -- update savings goal
@app.route('/savings-goal', methods=['PUT'])
def update_savings_goal():
    username = session.get('username')
    if not username:
        return jsonify({"error": "Not logged in"}), 403

    data = request.get_json()
    user = UserService.get_current_user()
    if not user:
        return jsonify({"error": "User not found"}), 404

    try:
        GoalService.update_goal(
            user_id=user.user_id,
            goal_label=data.get("goalLabel"),
            goal_target_amount=data.get("goalAmount"),
            goal_current_amount=data.get("savedAmount")
        )
        return jsonify({"message": "Savings goal updated"})
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 400



############### budget routes ############

##############################################################################################################

# listens for the "/budget" endpoint
@app.route('/budget', methods=['POST'])

# SETTER -- set the amount of the budget
def set_budget():
    username = session.get('username')
    if not username:
        return jsonify({"error": "Not logged in"}), 403

    data = request.get_json()
    if 'amount' not in data:
        return jsonify({"error": "Missing budget amount"}), 400

    user = UserService.get_current_user()
    if not user:
        return jsonify({"error": "User not found"}), 404

    try:
        budget = UserService.set_or_update_user_budget(user.user_id, data['amount'])
        return jsonify({"message": "Budget set successfully", "budget": budget.monthly_income}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    


@app.route('/budget', methods=['GET'])
def get_budget():
    username = session.get('username')
    if not username:
        return jsonify({"error": "Not logged in"}), 403

    user = UserService.get_current_user()
    if not user:
        return jsonify({"error": "User not found"}), 404

    budget = UserService.get_user_budget(user.user_id)
    if not budget:
        return jsonify({"error": "Budget not found"}), 404

    return jsonify({"budget": budget.monthly_income}), 200





############### expenses routes ############

##############################################################################################################

# listens for the "/expenses" endpoint
@app.route('/expenses', methods=['GET'])
def get_all_expenses():
    username = session.get('username')
    if not username:
        return jsonify({"error": "Not logged in"}), 403

    category = request.args.get('category')
    importance = request.args.get('importance')

    expenses, error = ExpenseService.fetch_expenses_for_user(username, category, importance)
    if error:
        return jsonify({"error": error}), 404

    result = [
        {
            "id": e.expense_id,
            "item": e.expense_label,
            "amount": float(e.expense_amount),
            "category": e.category_name,
            "importance": e.importance
        } for e in expenses
    ]
    return jsonify(result), 200


# insert an expense for currently logged in user
# POST -- add expense to expense list in the form {"item": "Coffee", "amount": 5, "category": "Food and Drink"}

@app.route('/expenses', methods=['POST'])
def add_expense():
    username = session.get('username')
    if not username:
        return jsonify({"error": "Not logged in"}), 403

    data = request.get_json()
    required_fields = ("item", "amount", "category", "importance")
    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({"error": f"Missing field: {field}"}), 400

    expense, error = ExpenseService.add_expense_for_user(username, data)
    if error:
        return jsonify({"error": error}), 400

    return jsonify({"message": "Expense added", "expense_id": expense.expense_id}), 201



# update or delete expenses
# PUT -- used to edit expenses in the expenses list
@app.route('/expenses/<int:id>', methods=['PUT'])
def update_expense(id):
    username = session.get('username')
    if not username:
        return jsonify({"error": "Not logged in"}), 403

    data = request.get_json()
    expense, error = ExpenseService.update_expense_for_user(username, id, data)
    if error:
        return jsonify({"error": error}), 404

    return jsonify({"message": "Expense updated", "expense": {
        "id": expense.expense_id,
        "item": expense.expense_label,
        "amount": float(expense.expense_amount),
        "category": expense.category_name,
        "importance": expense.importance
    }}), 200



# listens for the "/expenses/ID" endpoint
# DELETE -- used to delete data from the expenses list
@app.route('/expenses/<int:id>', methods=['DELETE'])
def delete_expense(id):
    username = session.get('username')
    if not username:
        return jsonify({"error": "Not logged in"}), 403

    deleted_expense, error = ExpenseService.delete_expense_for_user(username, id)
    if error:
        return jsonify({"error": error}), 404

    return jsonify({"message": "Expense deleted", "expense": {
        "id": deleted_expense.expense_id,
        "item": deleted_expense.expense_label,
        "amount": float(deleted_expense.expense_amount),
        "category": deleted_expense.category_name,
        "importance": deleted_expense.importance
    }}), 200


##############################################################################################################

# listens for the "/summary" endpoint
@app.route('/summary', methods=['GET'])

# GET -- gets a summary of the entire budget including all expenses
def get_summary():
    username = session.get('username')
    if not username:
        return jsonify({"error": "Not logged in"}), 403

    summary, error = SummaryService.get_summary(username)
    if error:
        return jsonify({"error": error}), 404

    return jsonify(summary), 200



@app.route('/reset', methods=['POST'])

# RESET -- reset the list of expenses
def reset_all():
    username = session.get('username')
    if not username:
        return jsonify({"error": "Not logged in"}), 403

    user_data[username] = {
        "budget": 0,
        "expenses": [],
        "next_id": 1,
        "savings_goal": {
            "goalAmount": 0,
            "savedAmount": 0
        }
    }
    return jsonify({"message": "Reset successful"})
  

##############################################################################################################

# User login, creation, deletion routes

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Missing required fields"}), 400

    user = UserService.login_user(username, password)
    if user:
        return jsonify({"message": True, "user_id": user.user_id}), 200
    else:
        return jsonify({"message": False, "error": "Invalid credentials"}), 401
    


@app.route('/create-user', methods=['POST'])
def create_user():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Missing required fields'}), 400

    try:
        new_user = UserService.register_user(username, password)
        return jsonify({'message': f'User {new_user.username} created successfully'}), 201
    except Exception as e:
        return jsonify({'error': 'Failed to create user', 'details': str(e)}), 500
    


##############################################################################################################

# run file
if __name__ == '__main__':
    
    # helps during development — if code crashes, shows a nice error page
    app.run(debug=True)
