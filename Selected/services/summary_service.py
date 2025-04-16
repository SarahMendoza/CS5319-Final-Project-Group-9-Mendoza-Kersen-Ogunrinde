from repositories.user_repository import UserRepository
from repositories.budget_repository import BudgetRepository
from repositories.expense_repository import ExpenseRepository

class SummaryService:
    @staticmethod
    def get_summary(username):
        # generate a summary of the user's budget, expenses, and breakdown
        user = UserRepository.find_user_by_username(username)
        if not user:
            return None, "User not found"
        budget = BudgetRepository.get_budget_by_user_id(user.user_id)
        if not budget:
            return None, "Budget not found"

        # fetch all expenses for the user's budget
        expenses = ExpenseRepository.get_expenses(budget.budget_id)

        # calculate total spent
        total_spent = sum(float(expense.expense_amount) for expense in expenses)

        # calculate remaining budget amount
        remaining = float(budget.monthly_income) - total_spent

        # Generate breakdown by category and importance
        breakdown = {}
        for expense in expenses:
            key = f"{expense.category_name} - {expense.importance}"
            breakdown[key] = breakdown.get(key, 0) + float(expense.expense_amount)

        # return the summary
        return {
            "budget": float(budget.monthly_income),
            "total_spent": total_spent,
            "remaining": remaining,
            "breakdown": breakdown
        }, None