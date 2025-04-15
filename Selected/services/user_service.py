from flask import session
from repositories.user_repository import UserRepository
from repositories.budget_repository import BudgetRepository
from werkzeug.security import generate_password_hash, check_password_hash

class UserService:
    @staticmethod
    def register_user(username, password):
        existing_user = UserRepository.find_user_by_username(username)
        if existing_user:
            raise ValueError("Username already exists")
        
        hashed_password = generate_password_hash(password)
        return UserRepository.create_user(username, hashed_password)

    @staticmethod
    def login_user(username, password):
        user = UserRepository.find_user_by_username(username)
        if not user:
            raise ValueError("Invalid username or password")
        if user and check_password_hash(user.password_hash, password):
            session['username'] = user.username
            return user
        return None
    

    @staticmethod
    def logout_user():
        session.pop('username', None)


    @staticmethod
    def get_current_user():
        username = session.get('username')
        if username:
            return UserRepository.find_user_by_username(username)
        return None
    

###### support user budget operations ######
    @staticmethod
    def get_user_budget(user_id):
        """Retrieve the budget for a specific user."""
        return BudgetRepository.get_budget_by_user_id(user_id)

    @staticmethod
    def set_user_budget(user_id, monthly_income):
        """Set a new budget for a user."""
        existing_budget = BudgetRepository.get_budget_by_user_id(user_id)
        if existing_budget:
            raise ValueError("Budget already exists for this user")
        return BudgetRepository.create_budget(user_id, monthly_income)

    @staticmethod
    def update_user_budget(user_id, monthly_income):
        """Update the budget for a user."""
        budget = BudgetRepository.get_budget_by_user_id(user_id)
        if not budget:
            raise ValueError("No budget found for this user")
        return BudgetRepository.update_budget(user_id, monthly_income)