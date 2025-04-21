from models import db, Goal

class GoalRepository:
    @staticmethod
    def create_goal(budget_id, goal_label, goal_target_amount, goal_current_amount):
        new_goal = Goal(
            budget_id=budget_id,
            goal_label=goal_label,
            goal_target_amount=goal_target_amount,
            goal_current_amount=goal_current_amount
        )
        db.session.add(new_goal)
        db.session.commit()
        return new_goal

    @staticmethod
    def get_goal_by_budget_id(budget_id):
        #return Goal.query.filter_by(budget_id=budget_id).order_by(desc(Goal.goal_id)).first()
        goal = (
        Goal.query
        .filter_by(budget_id=budget_id)
        .order_by(Goal.goal_id.desc())
        .first()
        )
        return goal

    @staticmethod
    def update_goal(goal_id, goal_label=None, goal_target_amount=None, goal_current_amount=None):
        goal = Goal.query.filter_by(goal_id=goal_id).first()
        if not goal:
            return None

        if goal_label is not None:
            goal.goal_label = goal_label
        if goal_target_amount is not None:
            goal.goal_target_amount = goal_target_amount
        if goal_current_amount is not None:
            goal.goal_current_amount = goal_current_amount

        db.session.commit()
        return goal