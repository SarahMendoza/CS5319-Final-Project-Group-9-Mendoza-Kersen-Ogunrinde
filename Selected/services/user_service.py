from flask import session
from repositories.user_repository import UserRepository
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
    
    # @staticmethod
    # def check_if_user_exists(username):
    #     return UserRepository.find_user_by_username(username) is not None
    
