from repositories.goal_repository import GoalRepository
from repositories.budget_repository import BudgetRepository
from datetime import datetime

class GoalService:
    @staticmethod
    def create_goal(user_id, goal_label, goal_target_date, goal_target_amount, goal_current_amount):
        """Create a new savings goal for a user."""
        budget = BudgetRepository.get_budget_by_user_id(user_id)
        if not budget:
            raise ValueError("No budget found for this user")

        return GoalRepository.create_goal(
            budget_id=budget.budget_id,
            goal_label=goal_label,
            goal_target_date=goal_target_date,
            goal_target_amount=goal_target_amount,
            goal_current_amount=goal_current_amount
        )

    @staticmethod
    def get_goal(user_id):
        """Retrieve the savings goal for a user."""
        budget = BudgetRepository.get_budget_by_user_id(user_id)
        if not budget:
            raise ValueError("No budget found for this user")

        goal = GoalRepository.get_goal_by_budget_id(budget.budget_id)
        if not goal:
            raise ValueError("No goal found for this user")

        return goal

    @staticmethod
    def update_goal(user_id, goal_label=None, goal_target_date=None, goal_target_amount=None, goal_current_amount=None):
        """Update the savings goal for a user."""
        budget = BudgetRepository.get_budget_by_user_id(user_id)
        if not budget:
            raise ValueError("No budget found for this user")

        goal = GoalRepository.get_goal_by_budget_id(budget.budget_id)
        if not goal:
            raise ValueError("No goal found for this user")

        return GoalRepository.update_goal(
            goal_id=goal.goal_id,
            goal_label=goal_label,
            goal_target_date=goal_target_date,
            goal_target_amount=goal_target_amount,
            goal_current_amount=goal_current_amount
        )