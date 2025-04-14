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
    # Fetch the savings goal and progress from the in-memory data
    return jsonify(user_data.get("savings_goal", {}))

##############################################################################################################

# listens for the "/savings-goal" endpoint
@app.route('/savings-goal', methods=['POST'])

# SET -- set savings goal
def set_savings_goal():
    data = request.get_json()
    goal_amount = data.get("goalAmount", 0)
    saved_amount = data.get("savedAmount", 0)

    # Set the new goal and initial savings
    user_data["savings_goal"] = {
        "goalAmount": goal_amount,
        "savedAmount": saved_amount
    }

    return jsonify({"message": "Savings goal set successfully", "goal": user_data["savings_goal"]}), 201

##############################################################################################################

# listens for the "/savings-goal" endpoint
@app.route('/savings-goal', methods=['PUT'])

# UPDATE -- update savings goal
def update_savings_goal():
    data = request.get_json()
    new_saved_amount = data.get("savedAmount", 0)

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

    # if the budget value exists, assign the value returned to "budget" 
    user_data['budget'] = data['amount']
    
    # return success message
    return jsonify({"message": "Budget set", "budget": user_data['budget']}), 201

##############################################################################################################

# listens for the "/expenses" endpoint
@app.route('/expenses', methods=['GET'])

# GETTER -- get data from the expenses list 
def get_expenses():
    
    # initialise category variable to be able to filter by category
    category = request.args.get('category')
    
    # initialise importance variable to be able to filter by importance
    importance = request.args.get('importance')
    
    # results gotten from filtering would be stored here
    results = user_data.get('expenses', [])

    # if category is specified, then get all expenses in that category based on category variable
    if category:
        results = [e for e in results if e.get('category') == category]
    
    # if importance is specified, then get all expenses in that importance based on importance variable
    if importance:
        results = [e for e in results if e.get('importance') == importance]
    
    # returns list of expenses in JSON format
    return jsonify(results)

##############################################################################################################

# listens for the "/expenses" endpoint
@app.route('/expenses', methods=['POST'])

# POST -- add expense to expense list in the form {"item": "Coffee", "amount": 5, "category": "Food and Drink"}
def add_expense():
    
    # get the data (which would be received in json format)
    data = request.get_json()
    
    # make sure the expenses format is being matched correctly
    if not all(k in data for k in ("item", "amount", "category", "importance")):
        return jsonify({"error": "Missing required fields"}), 400
    
    # prevent users from spending over budget
    total_spent = sum(e['amount'] for e in user_data.get('expenses', []))
    
    if total_spent + data['amount'] > user_data.get('budget', 0):
        return jsonify({"error": "Expense exceeds budget"}), 400
    
    data['id'] = user_data.get('next_id', 1)
    user_data['next_id'] = user_data.get('next_id', 1) + 1
    user_data.setdefault('expenses', []).append(data)
    
    # returns a success message
    return jsonify({"message": "Expense added", "expense": data}), 201

##############################################################################################################

# listens for the "/expenses/ID" endpoint
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

    return response


##############################################################################################################

# listens for the "/reset" endpoint
@app.route('/reset', methods=['POST'])

# RESET -- reset the list of expenses
def reset_all():
    
    # clear all data in user_data
    user_data.clear()
    
    return jsonify({"message": "Reset successful"})


##############################################################################################################

# run file
if __name__ == '__main__':
    
    # helps during development — if code crashes, shows a nice error page
    app.run(debug=True)
