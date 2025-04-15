from models import db, User

class UserRepository:
    @staticmethod
    def create_user(username, password):
        #password is already hashed in the user-service
        new_user = User(username=username, password_hash=password)
        db.session.add(new_user)
        db.session.commit()
        return new_user

    @staticmethod
    def find_user_by_username(username):
        return User.query.filter_by(username=username).first()

    # @staticmethod
    # def validate_user(username, password):
    #     user = UserRepository.find_user_by_username(username)
    #     if user and check_password_hash(user.password_hash, password):
    #         return user
    #     return None