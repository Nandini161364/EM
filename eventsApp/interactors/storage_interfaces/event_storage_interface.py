from eventsApp.adaptors.dtos import CreateEventDTO
from abc import ABC, abstractmethod


class EventStorageInterface(ABC):
    @abstractmethod
    def create_event(self, event_dto: CreateEventDTO):
        pass
    @abstractmethod
    def get_organizer(self, organizerId: int):
        pass
    @abstractmethod
    def create_ticket(self, event_id: int, price: float):
        pass
    @abstractmethod
    def get_event_details_by_id(self, event_id:int):
        pass
    
    @abstractmethod
    def list_events(self):
        pass

    @abstractmethod
    def list_organizer_events(self, organizer_id: int):
        pass

    @abstractmethod
    def is_valid_event(self, event_id:int):
        pass
    
    @abstractmethod
    def is_organizer_of_event(self, event_id:int, user_id: int):
        pass
    
    @abstractmethod
    def is_attendee(self, user_id: int):
        pass

    @abstractmethod
    def is_user_organizer(self, user_id):
        pass

    @abstractmethod
    def is_user_attendee(self, user_id):
        pass
