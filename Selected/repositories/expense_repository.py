from models import db, Expense

class ExpenseRepository:
    @staticmethod
    def get_expenses(budget_id, category=None, importance=None):
        query = Expense.query.filter_by(budget_id=budget_id)
        if category:
            query = query.filter_by(category_name=category)
        if importance:
            query = query.filter_by(importance=importance)
        return query.all()

    @staticmethod
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
    
    @staticmethod  
    def update_expense(budget_id, expense_id, importance, label, amount):
        expense = Expense.query.filter_by(budget_id=budget_id, expense_id=expense_id).first()
        if not expense:
            return None
        expense.importance = importance
        expense.expense_label = label
        expense.expense_amount = amount
        db.session.commit()
        return expense
    
    @staticmethod
    def delete_expense(budget_id, expense_id):
        expense = Expense.query.filter_by(budget_id=budget_id, expense_id=expense_id).first()
        if not expense:
            return None
        db.session.delete(expense)
        db.session.commit()
        return expense
