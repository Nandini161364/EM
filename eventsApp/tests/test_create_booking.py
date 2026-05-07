import pytest
from eventsApp.tests.factories import BookingFactory
from eventsApp.adaptors.dtos import CreateBookingDto

from eventsApp.interactors.booking_interactor import BookingInteractor
from eventsApp.storages.booking_storage import BookingStorage
from eventsApp.presenters.booking_presenter import BookingPresenter


from eventsApp.exceptions.exceptions import InvalidDataException, OrganizerNotFoundException

@pytest.mark.django_db
class TestCreateBooking:
    pass