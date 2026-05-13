
from abc import ABC, abstractmethod
from eventsApp.adaptors.dtos import EventDetailsDto

class EventPresenterInterface(ABC):
    @abstractmethod
    def create_event_success_response(self, event_id:int):
        pass
    @abstractmethod
    def invalid_data(self):
        pass
    @abstractmethod
    def organizer_not_found(self):
        pass
    @abstractmethod
    def get_event_details_success_response_for_organizer(self, eventDetailsDto:EventDetailsDto):
        pass
    @abstractmethod
    def get_event_details_success_response_for_attendee(self, eventDetailsDto:EventDetailsDto):
        pass