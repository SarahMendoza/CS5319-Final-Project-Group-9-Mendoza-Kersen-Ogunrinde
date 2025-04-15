
from repositories import expense_repository as repo

def fetch_expenses_for_user(username, category=None, importance=None):
    user = repo.get_user_by_username(username)
    if not user:
        return None, "User not found"
    
    budget = repo.get_budget_by_user_id(user.user_id)
    if not budget:
        return None, "No budget found"

    expenses = repo.get_expenses(budget.budget_id, category, importance)
    return expenses, None

def add_expense_for_user(username, data):
    user = repo.get_user_by_username(username)
    if not user:
        return None, "User not found"
    
    budget = repo.get_budget_by_user_id(user.user_id)
    if not budget:
        return None, "No budget found"
    
    category = repo.get_category(budget.budget_id, data['category'])
    if not category:
        category = repo.create_category(budget.budget_id, data['category'])

    expense = repo.create_expense(
        budget.budget_id,
        category.category_name,
        data['importance'],
        data['item'],
        data['amount']
    )
    return expense, None
