from abc import ABC, abstractmethod
from eventsApp.adaptors.dtos import CreateUserDTO

class UserStorageInterface(ABC):
    @abstractmethod
    def create_user(self, userDto: CreateUserDTO):
        pass

    @abstractmethod
    def get_existing_user_fields(self, username: str, email: str, phone_number: str):
        pass

    @abstractmethod
    def get_user_profile(self, user_id):
        pass