class UserPresenter:
    def create_user_success_response(self, userId):
        return {
            "message": "User created Successfully",
            "id": userId
        }
    def invalid_data(self):
        return {
            "message": "Please ensure all the required fields are passed with proper values"
        }
    def invalid_mail(self, message="User already exists"):
        return {
            "message": message
        }
    def get_user_profile_response(self, user_profile):
        if user_profile is None:
            return None
        return {
            "id": user_profile.id,
            "username": user_profile.username,
            "role": user_profile.role,
        }
    
    def invalid_user(self):
        return {
            "message": "User not found"
        }