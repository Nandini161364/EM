import pytest

from eventsApp.exceptions.exceptions import UserCannotAccessEventException
from eventsApp.interactors.get_event_details_interactor import GetEventDetailsInteractor


class ListEventsStorage:
    def __init__(self, is_organizer=False, is_attendee=False):
        self.is_organizer = is_organizer
        self.is_attendee = is_attendee
        self.listed_organizer_events_for = None
        self.listed_events = False

    def is_user_organizer(self, user_id):
        return self.is_organizer

    def is_user_attendee(self, user_id):
        return self.is_attendee

    def list_organizer_events(self, user_id):
        self.listed_organizer_events_for = user_id
        return ["organizer-event"]

    def list_events(self):
        self.listed_events = True
        return ["public-event"]


class ListEventsPresenter:
    def list_events_response(self, events):
        return {"events": events}


def test_list_organizer_events_requires_organizer_role():
    interactor = GetEventDetailsInteractor(
        storage=ListEventsStorage(is_attendee=True),
        presenter=ListEventsPresenter(),
    )

    with pytest.raises(UserCannotAccessEventException):
        interactor.list_organizer_events(userId=1)


def test_list_organizer_events_returns_only_organizer_events():
    storage = ListEventsStorage(is_organizer=True)
    interactor = GetEventDetailsInteractor(
        storage=storage,
        presenter=ListEventsPresenter(),
    )

    response = interactor.list_organizer_events(userId=1)

    assert response == {"events": ["organizer-event"]}
    assert storage.listed_organizer_events_for == 1


def test_list_attendee_events_requires_attendee_role():
    interactor = GetEventDetailsInteractor(
        storage=ListEventsStorage(is_organizer=True),
        presenter=ListEventsPresenter(),
    )

    with pytest.raises(UserCannotAccessEventException):
        interactor.list_attendee_events(userId=1)


def test_list_attendee_events_returns_events_for_attendees():
    storage = ListEventsStorage(is_attendee=True)
    interactor = GetEventDetailsInteractor(
        storage=storage,
        presenter=ListEventsPresenter(),
    )

    response = interactor.list_attendee_events(userId=1)

    assert response == {"events": ["public-event"]}
    assert storage.listed_events is True
