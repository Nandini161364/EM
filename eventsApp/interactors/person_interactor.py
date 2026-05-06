from eventsApp.interactors.presenter_interfaces.person_presenter_interface import PersonPresenterInterface
from eventsApp.interactors.storage_interfaces.person_storage_interface import PersonStorageInterface

from eventsApp.exceptions.exceptions import InvalidDataException, UserAlreadyExitsException

class CreatePersonInteractor:
    def __init__(self, storage: PersonStorageInterface, presenter: PersonPresenterInterface):
        self.storage = storage
        self.presenter = presenter
    
    def create_person(self, personDto):
        name = personDto.name
        email = personDto.email
        password = personDto.password

        if not (name and email and password):
            raise InvalidDataException("Data can't be empty")
        is_existing_mail = self.storage.get_person_by_mail(email)
        if is_existing_mail:
            raise UserAlreadyExitsException("User is already there")
        response = self.storage.create_person(personDto)

        return self.presenter.create_person_success_response(response)