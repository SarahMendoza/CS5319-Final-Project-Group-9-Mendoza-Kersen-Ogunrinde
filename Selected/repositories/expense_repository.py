from models import Expense
from db import db


def get_expenses(budget_id, category=None, importance=None):
    query = Expense.query.filter_by(budget_id=budget_id)
    if category:
        query = query.filter_by(category_name=category)
    if importance:
        query = query.filter_by(importance=importance)
    return query.all()


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
