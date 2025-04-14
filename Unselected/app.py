# created by Kirk Ogunrinde on April 6th, 2025

from flask import Flask, request, jsonify, session
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = "113-894-795"
CORS(app, origins=["http://localhost:3000"], supports_credentials=True)

app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'  # or 'None' if HTTPS
app.config['SESSION_COOKIE_SECURE'] = False    # Only True if using HTTPS

users = {}
user_data = {}

@app.route('/whoami')
def whoami():
    return jsonify({"user": session.get("username", "Not logged in")})

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Username and password required"}), 400

    if username in users:
        return jsonify({"error": "Username already exists"}), 400

    users[username] = generate_password_hash(password)
    user_data[username] = {
        "budget": 0,
        "expenses": [],
        "next_id": 1,
        "savings_goal": {
            "goalAmount": 0,
            "savedAmount": 0
        }
    }
    return jsonify({"message": "Signup successful"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Username and password required"}), 400

    if username in users and check_password_hash(users[username], password):
        session['username'] = username
        return jsonify({"message": "Login successful"}), 200
    return jsonify({"error": "Invalid credentials"}), 401

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('username', None)
    return jsonify({"message": "Logged out successfully"})

@app.route('/savings-goal', methods=['GET'])
def get_savings_goal():
    username = session.get('username')
    if not username:
        return jsonify({"error": "Not logged in"}), 403
    return jsonify(user_data[username].get("savings_goal", {}))

@app.route('/savings-goal', methods=['POST'])
def set_savings_goal():
    username = session.get('username')
    if not username:
        return jsonify({"error": "Not logged in"}), 403

    data = request.get_json()
    user_data[username]["savings_goal"] = {
        "goalAmount": data.get("goalAmount", 0),
        "savedAmount": data.get("savedAmount", 0)
    }
    return jsonify({"message": "Savings goal set", "goal": user_data[username]["savings_goal"]}), 201

@app.route('/savings-goal', methods=['PUT'])
def update_savings_goal():
    username = session.get('username')
    if not username:
        return jsonify({"error": "Not logged in"}), 403

    data = request.get_json()
    user_data[username]["savings_goal"]["savedAmount"] = data.get("savedAmount", 0)
    return jsonify({"message": "Savings goal updated", "goal": user_data[username]["savings_goal"]})

@app.route('/budget', methods=['POST'])
def set_budget():
    username = session.get('username')
    if not username:
        return jsonify({"error": "Not logged in"}), 403

    data = request.get_json()
    if 'amount' not in data:
        return jsonify({"error": "Missing budget amount"}), 400

    user_data[username]['budget'] = data['amount']
    return jsonify({"message": "Budget set", "budget": data['amount']}), 201

@app.route('/expenses', methods=['GET'])
def get_expenses():
    username = session.get('username')
    if not username:
        return jsonify({"error": "Not logged in"}), 403

    category = request.args.get('category')
    importance = request.args.get('importance')
    results = user_data[username].get('expenses', [])

    if category:
        results = [e for e in results if e.get('category') == category]
    if importance:
        results = [e for e in results if e.get('importance') == importance]
    return jsonify(results)

@app.route('/expenses', methods=['POST'])
def add_expense():
    username = session.get('username')
    if not username:
        return jsonify({"error": "Not logged in"}), 403

    data = request.get_json()
    if not all(k in data for k in ("item", "amount", "category", "importance")):
        return jsonify({"error": "Missing fields"}), 400

    total_spent = sum(e['amount'] for e in user_data[username].get('expenses', []))
    if total_spent + data['amount'] > user_data[username].get('budget', 0):
        return jsonify({"error": "Expense exceeds budget"}), 400

    data['id'] = user_data[username]['next_id']
    user_data[username]['next_id'] += 1
    user_data[username].setdefault('expenses', []).append(data)
    return jsonify({"message": "Expense added", "expense": data}), 201

@app.route('/expenses/<int:id>', methods=['PUT'])
def update_expense(id):
    username = session.get('username')
    if not username:
        return jsonify({"error": "Not logged in"}), 403

    data = request.get_json()
    for i, expense in enumerate(user_data[username].get('expenses', [])):
        if expense['id'] == id:
            user_data[username]['expenses'][i].update(data)
            return jsonify({"message": "Expense updated", "expense": user_data[username]['expenses'][i]})
    return jsonify({"error": "Not found"}), 404

@app.route('/expenses/<int:id>', methods=['DELETE'])
def delete_expense(id):
    username = session.get('username')
    if not username:
        return jsonify({"error": "Not logged in"}), 403

    for i, expense in enumerate(user_data[username].get('expenses', [])):
        if expense['id'] == id:
            deleted = user_data[username]['expenses'].pop(i)
            return jsonify({"message": "Deleted", "expense": deleted})
    return jsonify({"error": "Not found"}), 404

@app.route('/summary', methods=['GET'])
def get_summary():
    username = session.get('username')
    if not username:
        return jsonify({"error": "Not logged in"}), 403

    expenses = user_data[username].get('expenses', [])
    budget = user_data[username].get('budget', 0)
    total_spent = sum(e['amount'] for e in expenses)
    remaining = budget - total_spent

    breakdown = {}
    for e in expenses:
        key = f"{e['category']} - {e['importance']}"
        breakdown[key] = breakdown.get(key, 0) + e['amount']

    return jsonify({
        "budget": budget,
        "total_spent": total_spent,
        "remaining": remaining,
        "breakdown": breakdown
    })

@app.route('/reset', methods=['POST'])
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

if __name__ == '__main__':
    app.run(debug=True)
