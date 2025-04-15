from models import User, Budget, Expense, Category
from db import db

def get_user_by_username(username):
    return User.query.filter_by(username=username).first()

def get_budget_by_user_id(user_id):
    return Budget.query.filter_by(user_id=user_id).first()

def get_expenses(budget_id, category=None, importance=None):
    query = Expense.query.filter_by(budget_id=budget_id)
    if category:
        query = query.filter_by(category_name=category)
    if importance:
        query = query.filter_by(importance=importance)
    return query.all()

def get_category(budget_id, category_name):
    return Category.query.filter_by(budget_id=budget_id, category_name=category_name).first()

def create_category(budget_id, category_name):
    category = Category(budget_id=budget_id, category_name=category_name)
    db.session.add(category)
    db.session.commit()
    return category

def create_expense(budget_id, category_name, importance, label, amount):
    expense = Expense(
        budget_id=budget_id,
        category_name=category_name,
        importance=importance,
        expense_label=label,
        expense_amount=amount
    )
    db.session.add(expense)
    db.session.commit()
    return expense
