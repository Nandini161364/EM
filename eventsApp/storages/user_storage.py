from eventsApp.models import User
from django.db.models import Q


class UserStorage:
    def create_user(self, userDto):
        self.userDto = userDto
        username = userDto.username
        email = userDto.email
        password = userDto.password
        phone_number = userDto.phone_number
        role = userDto.role

        response = User.objects.create_user(username=username, email=email, password=password, role=role, phone_number=phone_number)
        return response.id
    
    def user_exists(self, email, phone):
        self.email = email
        self.phone = phone

        return User.objects.filter(Q(email=email) | Q(phone_number=phone)).exists()
