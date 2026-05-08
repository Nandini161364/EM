import pytest

from eventsApp.tests.factories import (
    UserFactory,
    EventFactory
)

from eventsApp.adaptors.dtos import CreateBookingDto

from eventsApp.interactors.booking_interactor import BookingInteractor
from eventsApp.storages.booking_storage import BookingStorage
from eventsApp.presenters.booking_presenter import BookingPresenter

from eventsApp.exceptions.exceptions import (
    InvalidDataException,
    EventDoesnotExistException,
    AttendeeDoesnotExist,
    TicketsNotAvailableException,
    AlreadyBookedException
)


@pytest.mark.django_db
class TestCreateBooking:

    def test_create_booking_success(self):

        attendee = UserFactory(role='attendee')

        event = EventFactory()

        bookingDto = CreateBookingDto(
            attendee_id=attendee.id,
            event_id=event.id
        )

        interactor = BookingInteractor(
            storage=BookingStorage(),
            presenter=BookingPresenter()
        )

        response = interactor.create_booking(
            bookingDto
        )

        assert response["message"] == "Booking Successful"
        assert "id" in response
    def test_create_booking_with_invalid_user(self):
        event = EventFactory()

        bookingDto = CreateBookingDto(
            attendee_id=100,
            event_id=event.id
        )

        interactor = BookingInteractor(
            storage=BookingStorage(),
            presenter=BookingPresenter()
        )

        with pytest.raises(AttendeeDoesnotExist):
            interactor.create_booking(bookingDto)
    def test_create_booking_with_invalid_event(self):
        user = UserFactory()
        event = EventFactory()

        bookingDto = CreateBookingDto(
            attendee_id=user.id,
            event_id=100
        )

        interactor = BookingInteractor(
            storage=BookingStorage(),
            presenter=BookingPresenter()
        )

        with pytest.raises(EventDoesnotExistException):
            interactor.create_booking(bookingDto)
    def test_create_booking_for_same_event(self):
        user = UserFactory()
        event = EventFactory()

        bookingDto = CreateBookingDto(
            attendee_id=user.id,
            event_id=event.id
        )

        interactor = BookingInteractor(
            storage=BookingStorage(),
            presenter=BookingPresenter()
        )

        interactor.create_booking(
            bookingDto
        )

        with pytest.raises(AlreadyBookedException):
            interactor.create_booking(bookingDto)

    def test_tickets_full(self):
        event = EventFactory(maximum_attendees=1)

        user1 = UserFactory(role='attendee')
        user2 = UserFactory(role='attendee')

        interactor = BookingInteractor(BookingStorage(), BookingPresenter())

        bookingDto1 = CreateBookingDto(
            attendee_id=user1.id,
            event_id=event.id
        )
        interactor.create_booking(bookingDto1)

        bookingDto2 = CreateBookingDto(
            attendee_id=user2.id,
            event_id=event.id
        )

        with pytest.raises(TicketsNotAvailableException):
            interactor.create_booking(bookingDto2)
