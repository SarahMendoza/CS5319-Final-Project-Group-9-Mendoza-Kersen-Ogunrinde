
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique = True, index = True)
    # email = db.Column(db.String(100), nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)

    settings = relationship("Settings", uselist=False, back_populates="user", cascade="all, delete-orphan")
    budgets = relationship("Budget", back_populates="user", cascade="all, delete-orphan")


class Settings(db.Model):
    __tablename__ = 'settings'

    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), primary_key=True)
    enable_notifications = db.Column(db.Boolean, default=False)
    password = db.Column(db.String(255), nullable=False)
    banking_integration = db.Column(db.Boolean, default=False)

    user = relationship("User", back_populates="settings")


class Budget(db.Model):
    __tablename__ = 'budget'

    budget_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    monthly_income = db.Column(db.Numeric(10, 2), nullable=False)

    user = relationship("User", back_populates="budgets")
    goals = relationship("Goal", back_populates="budget", cascade="all, delete-orphan")
    categories = relationship("Category", back_populates="budget", cascade="all, delete-orphan")
    expenses = relationship("Expense", back_populates="budget", cascade="all, delete-orphan")
    #expenses = db.relationship('Expense', backref='budget', cascade="all, delete")



class Goal(db.Model):
    __tablename__ = 'goals'

    goal_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    budget_id = db.Column(db.Integer, db.ForeignKey('budget.budget_id'), nullable=False)
    goal_label = db.Column(db.String(100))
    goal_target_date = db.Column(db.Date)
    goal_target_amount = db.Column(db.Numeric(10, 2), nullable=False)
    goal_current_amount = db.Column(db.Numeric(10, 2), nullable=False)

    budget = relationship("Budget", back_populates="goals")
    expenses = relationship("Expense", back_populates="goal", cascade="all, delete-orphan")


class Category(db.Model):
    __tablename__ = 'category'

    budget_id = db.Column(db.Integer, db.ForeignKey('budget.budget_id'), primary_key=True)
    category_name = db.Column(db.String(50), primary_key=True)
    category_amount = db.Column(db.Numeric(10, 2) )

    budget = relationship("Budget", back_populates="categories")
    expenses = relationship("Expense", back_populates="category", cascade="all, delete-orphan")


class Expense(db.Model):
    __tablename__ = 'expenses'

    expense_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    budget_id = db.Column(db.Integer, db.ForeignKey('budget.budget_id'), nullable=False)
    category_name = db.Column(db.String(50), nullable=False)
    importance = db.Column(db.String(50), nullable=False)
    expense_label = db.Column(db.String(100), nullable=False)
    expense_amount = db.Column(db.Numeric(10,2), nullable=False)
    goal_id = db.Column(db.Integer, db.ForeignKey('goals.goal_id'))

    # Add composite foreign key constraint to Category manually if you want strict integrity:
    __table_args__ = (
        db.ForeignKeyConstraint(
            ['budget_id', 'category_name'],
            ['category.budget_id', 'category.category_name']
        ),
    )

    budget = relationship("Budget", back_populates="expenses")
    category = relationship("Category", back_populates="expenses")
    goal = relationship("Goal", back_populates="expenses")
