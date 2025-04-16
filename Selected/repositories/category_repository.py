from models import db, Category

class CategoryRepository:
    @staticmethod
    def get_all_categories(budget_id):
        return Category.query.filter_by(budget_id=budget_id).all()

    @staticmethod
    def get_category(budget_id, category_name):
        return Category.query.filter_by(budget_id=budget_id, category_name=category_name).first()

    @staticmethod
    def create_category(budget_id, category_name):
        category = Category(budget_id=budget_id, category_name=category_name)
        db.session.add(category)
        db.session.commit()
        return category