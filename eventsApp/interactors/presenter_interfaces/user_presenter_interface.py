from abc import ABC, abstractmethod


class UserPresenterInterface(ABC):
    @abstractmethod
    def create_user_success_response(self, personId):
        pass

    @abstractmethod
    def invalid_data(self):
        pass

    @abstractmethod
    def invalid_mail(self, message="User already exists"):
        pass
    @abstractmethod
    def get_user_profile_response(self, user_profile):
        pass
    @abstractmethod
    def invalid_user(self):
        pass
