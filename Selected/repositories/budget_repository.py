from models import db, Budget

class BudgetRepository:
    @staticmethod
    def get_budget_by_user_id(user_id):
        return Budget.query.filter_by(user_id=user_id).first()

    @staticmethod
    def create_budget(user_id, monthly_income):
        new_budget = Budget(user_id=user_id, monthly_income=monthly_income)
        db.session.add(new_budget)
        db.session.commit()
        return new_budget

    @staticmethod
    def update_budget(user_id, monthly_income):
        budget = Budget.query.filter_by(user_id=user_id).first()
        if budget:
            budget.monthly_income = monthly_income
            db.session.commit()
        return budget