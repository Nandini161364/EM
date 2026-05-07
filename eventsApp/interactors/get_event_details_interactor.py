from eventsApp.interactors.storage_interfaces.event_storage_interface import EventStorageInterface
from eventsApp.interactors.presenter_interfaces.event_presenter_interface import EventPresenterInterface

from eventsApp.exceptions.exceptions import EventNotFoundException

class GetEventDetailsInteractor:
    def __init__(self, storage:EventStorageInterface, presenter:EventPresenterInterface):
        self.storage = storage
        self.presenter = presenter

    def get_event_details(self, eventId):
        is_valid_event = self.storage.is_valid_event(event_id=eventId)
        if not is_valid_event:
            raise EventNotFoundException("Invalid Event Details")
        
        eventDetailsDto = self.storage.get_event_details(eventId)
        return self.presenter.get_event_details_success_response(eventDetailsDto)
    