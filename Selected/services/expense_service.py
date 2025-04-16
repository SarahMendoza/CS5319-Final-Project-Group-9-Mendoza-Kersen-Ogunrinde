
from repositories.expense_repository import ExpenseRepository
from repositories.budget_repository import BudgetRepository
from repositories.user_repository import UserRepository
from repositories.category_repository import CategoryRepository

class ExpenseService:
    @staticmethod
    def fetch_expenses_for_user(username, category=None, importance=None):
        user = UserRepository.find_user_by_username(username)
        if not user:
            return None, "User not found"
        
        budget = BudgetRepository.get_budget_by_user_id(user.user_id)
        if not budget:
            return None, "No budget found"

        expenses = ExpenseRepository.get_expenses(budget.budget_id, category, importance)
        return expenses, None

    ######## adds an expense, if the category doesn't exist, it inserts the category first ############################
    @staticmethod
    def add_expense_for_user(username, data):
        user = UserRepository.find_user_by_username(username)
        if not user:
            return None, "User not found"
        
        budget = BudgetRepository.get_budget_by_user_id(user.user_id)
        if not budget:
            return None, "No budget found"
        
        # if the category doesn't exist, add it to the database
        category = CategoryRepository.get_category(budget.budget_id, data['category'])
        if not category:
            category = CategoryRepository.create_category(budget.budget_id, data['category'])

        # add the expense
        expense = ExpenseRepository.create_expense(
            budget.budget_id,
            category.category_name,
            data['importance'],
            data['item'],
            data['amount']
        )
        return expense, None
    
    @staticmethod  
    def update_expense_for_user(username, expense_id, data):
        user = UserRepository.find_user_by_username(username)
        if not user:
            return None, "User not found"
        
        budget = BudgetRepository.get_budget_by_user_id(user.user_id)
        if not budget:
            return None, "No budget found"

        # update expense
        expense = ExpenseRepository.update_expense(
            budget.budget_id,
            expense_id,
            data['importance'],
            data['item'],
            data['amount']
        )
        return expense, None
    
    @staticmethod
    def delete_expense_for_user(username, expense_id):
        user = UserRepository.find_user_by_username(username)
        if not user:
            return None, "User not found"
        
        budget = BudgetRepository.get_budget_by_user_id(user.user_id)
        if not budget:
            return None, "No budget found"

        # delete expense
        ExpenseRepository.delete_expense(budget.budget_id, expense_id)
        return True, None


    ######## adds a category ################################
    @staticmethod
    def add_category_for_user(username, category_name):
        user = UserRepository.find_user_by_username(username)
        if not user:
            return None, "User not found"
        
        budget = BudgetRepository.get_budget_by_user_id(user.user_id)
        if not budget:
            return None, "No budget found"

        # check if category already exists
        existing_category = CategoryRepository.get_category(budget.budget_id, category_name)
        if existing_category:
            return None, "Category already exists"

        # create new category
        category = CategoryRepository.create_category(budget.budget_id, category_name)
        return category, None