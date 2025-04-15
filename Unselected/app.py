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


# function returns full list of expenses
def get_all_expenses():
    
    # replace this with SQL SELECT * logic
    pass

    # REPLACE     
    return expenses


# function returns expenses filtered by category (like “Food” or “Transport”)
def get_expenses_by_category(category):
    
    # replace this with SQL SELECT WHERE category= logic
    pass

    # REPLACE
    return [e for e in expenses if e.get('category') == category]


# updates an existing expense, matched by its unique id
def update_expense_in_db(id, data):
    
    # replace this with SQL UPDATE logic
    pass

    # loop through expenses to find the matching id
    for i, expense in enumerate(expenses):
        if expense['id'] == id:
            
            # update dict with the new data
            expenses[i].update(data)
            
            # ensure id remains the same
            expenses[i]['id'] = id
            
            # return the new updated expense
            return expenses[i]
        
    # if id is not found, return none
    return None


# deletes an expense based on its id
def delete_expense_from_db(id):
    
    # replace this with SQL DELETE logic
    pass

    # loop through expenses to find the matching id
    for i, expense in enumerate(expenses):
        if expense['id'] == id:
            
            # remove expense from the list using pop(i)
            return expenses.pop(i)
        
    # if id is not found, return none
    return None

##############################################################################################################

# listens for the "/savings-goal" endpoint
@app.route('/savings-goal', methods=['GET'])

# GET -- get savings goal
def get_savings_goal():
    username = session.get('username')
    if not username:
        return jsonify({"error": "Not logged in"}), 403

    user = User.query.filter_by(username=username).first()
    budget = Budget.query.filter_by(user_id=user.user_id).first()
    goal = Goal.query.filter_by(budget_id=budget.budget_id).first()

    if not goal:
        return jsonify({})

    return jsonify({
        "goalLabel": goal.goal_label,
        "goalTargetDate": goal.goal_target_date.isoformat() if goal.goal_target_date else None,
        "goalAmount": float(goal.goal_target_amount),
        "savedAmount": float(goal.goal_current_amount)
    })


##############################################################################################################

# listens for the "/savings-goal" endpoint
@app.route('/savings-goal', methods=['POST'])

# SET -- set savings goal
def set_savings_goal():
    data = request.get_json()
    user = User.query.filter_by(username=username).first()
    budget = Budget.query.filter_by(user_id=user.user_id).first()

    goal = Goal(
        budget_id=budget.budget_id,
        goal_label=data.get("goalLabel", "Savings Goal"),
        goal_target_date=datetime.strptime(data["goalTargetDate"], "%Y-%m-%d").date(),
        goal_target_amount=data.get("goalAmount", 0),
        goal_current_amount=data.get("savedAmount", 0)
    )
    db.session.add(goal)
    db.session.commit()

    return jsonify({"message": "Savings goal set"})


    return jsonify({"message": "Savings goal set successfully", "goal": user_data["savings_goal"]}), 201

##############################################################################################################

# listens for the "/savings-goal" endpoint
@app.route('/savings-goal', methods=['PUT'])

# UPDATE -- update savings goal
def update_savings_goal():
    data = request.get_json()
    user = User.query.filter_by(username=username).first()
    budget = Budget.query.filter_by(user_id=user.user_id).first()
    goal = Goal.query.filter_by(budget_id=budget.budget_id).first()

    if not goal:
        return jsonify({"error": "No existing goal found"}), 404

    if "savedAmount" in data:
        goal.goal_current_amount = data["savedAmount"]
    if "goalAmount" in data:
        goal.goal_target_amount = data["goalAmount"]
    if "goalLabel" in data:
        goal.goal_label = data["goalLabel"]
    if "goalTargetDate" in data:
        goal.goal_target_date = datetime.strptime(data["goalTargetDate"], "%Y-%m-%d").date()

    db.session.commit()
    return jsonify({"message": "Savings goal updated"})



############### budget routes ############

    # Update the saved amount towards the savings goal
    if "savings_goal" in user_data:
        user_data["savings_goal"]["savedAmount"] = new_saved_amount
        return jsonify({"message": "Savings goal updated", "goal": user_data["savings_goal"]})

    return jsonify({"error": "No savings goal found"}), 404


##############################################################################################################

# listens for the "/budget" endpoint
@app.route('/budget', methods=['POST'])

# SETTER -- set the amount of the budget
def set_budget():
    
    # get the budget value from the frontend
    data = request.get_json()

    # if the budget value is not inputted, return error message
    if 'amount' not in data:
        return jsonify({"error": "Missing budget amount"}), 400
    
    # check if budget already exists for user
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({"error": "User not found"}), 404
    existing_budget = Budget.query.filter_by(user_id=user.user_id).first()
    if existing_budget:
        #update existing budget
        existing_budget.monthly_income = data['amount']
        db.session.commit()
        return jsonify({"message": "Budget updated", "budget": data['amount']}), 200
    else:
        # create new budget
        new_budget = Budget(user_id=user.user_id, monthly_income=data['amount'])
        db.session.add(new_budget)
        db.session.commit()
        return jsonify({"message": "Budget created", "budget": data['amount']}), 201

@app.route('/budget', methods=['GET'])
def get_budget():
    username = session.get('username')
    if not username:
        return jsonify({"error": "Not logged in"}), 403

    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    budget = Budget.query.filter_by(user_id=user.user_id).first()
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
    
    # initialise importance variable to be able to filter by importance
    importance = request.args.get('importance')

    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    budget = Budget.query.filter_by(user_id=user.user_id).first()
    if not budget:
        return jsonify({"error": "No budget found"}), 400

    query = Expense.query.filter_by(budget_id=budget.budget_id)
    
    if category:
        query = query.filter_by(category_name=category)
    if importance:
        query = query.filter_by(importance=importance)

    expenses = query.all()

    result = [
        {
            "id": e.expense_id,
            "item": e.expense_label,
            "amount": float(e.expense_amount),
            "category": e.category_name,
            "importance": e.importance
        } for e in expenses
    ]
    return jsonify(result)


# insert an expense for currently logged in user
@app.route('/expenses', methods=['POST'])

# POST -- add expense to expense list in the form {"item": "Coffee", "amount": 5, "category": "Food and Drink"}
def add_expense():
    
    # get the data (which would be received in json format)
    data = request.get_json()
    required_fields = ("item", "amount", "category", "importance")
    for k in required_fields:
        it = data[k]
        if not it:
            return jsonify({"error": f"Missing fields"}), 400

    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    budget = Budget.query.filter_by(user_id=user.user_id).first()
    if not budget:
        return jsonify({"error": "No budget found"}), 400

    # Check total expenses
    # total_spent = sum([e.expense_amount for e in budget.expenses])
    # if total_spent + data['amount'] > budget.monthly_income:
    #     return jsonify({"error": "Expense exceeds budget"}), 400

    # reate category if needed
    category = Category.query.filter_by(budget_id=budget.budget_id, category_name=data['category']).first()
    if not category:
        category = Category(
            budget_id=budget.budget_id,
            category_name=data['category'],
            #category_amount=data['amount']
        )
        db.session.add(category)

    # add expense
    expense = Expense(
        budget_id=budget.budget_id,
        category_name=category.category_name,
        importance=data['importance'],
        expense_label=data['item'],
        expense_amount=data['amount']
    )
    db.session.add(expense)
    db.session.commit()

    return jsonify({"message": "Expense added", "expense_id": expense.expense_id}), 201




# update or delete expenses
@app.route('/expenses/<int:id>', methods=['PUT'])

# PUT -- used to edit expenses in the expenses list
def update_expense(id):
    
    # get the data (which would be received in json format)
    data = request.get_json()
    
    # update expense based on id
    for i, expense in enumerate(user_data.get('expenses', [])):
        if expense['id'] == id:
            user_data['expenses'][i].update(data)
            user_data['expenses'][i]['id'] = id
            return jsonify({"message": "Expense updated", "expense": user_data['expenses'][i]})
    
    # if not, return error message
    return jsonify({"error": "Not found"}), 404

##############################################################################################################

# listens for the "/expenses/ID" endpoint
@app.route('/expenses/<int:id>', methods=['DELETE'])

# DELETE -- used to delete data from the expenses list
def delete_expense(id):
    
    # if successful, return success message
    for i, expense in enumerate(user_data.get('expenses', [])):
        if expense['id'] == id:
            deleted = user_data['expenses'].pop(i)
            return jsonify({"message": "Deleted", "expense": deleted})
    
    # if not, return error message
    return jsonify({"error": "Not found"}), 404

##############################################################################################################

# listens for the "/summary" endpoint
@app.route('/summary', methods=['GET'])

# GET -- gets a summary of the entire budget including all expenses
def get_summary():
    
    # sum up all the expenses
    total_spent = sum(e['amount'] for e in user_data.get('expenses', []))
    
    # subtract all expenses from the budget
    remaining = user_data.get('budget', 0) - total_spent

    # breakdown by category and/or importance
    breakdown = {}
    
    user_expenses = user_data.get('expenses', [])
    user_budget = user_data.get('budget', 0)

    for e in user_expenses:
        key = f"{e['category']} - {e['importance']}"
        breakdown[key] = breakdown.get(key, 0) + e['amount']

    response = jsonify({
        "budget": user_budget,
        "total_spent": total_spent,
        "remaining": remaining,
        "breakdown": breakdown
    })

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

    user = User.query.filter_by(username=username).first()

    if user and check_password_hash(user.password_hash, password):
        session['username'] = username
        return jsonify({"message": "Login successful", "user_id": user.user_id})
    else:
        return jsonify({"message": "Invalid credentials"}), 401
    
    # clear all data in user_data
    user_data.clear()
    
    return jsonify({"message": "Reset successful"})


##############################################################################################################

# run file
if __name__ == '__main__':
    
    # helps during development — if code crashes, shows a nice error page
    app.run(debug=True)
