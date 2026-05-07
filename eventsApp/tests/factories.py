import factory
import random
from datetime import timedelta

from eventsApp.models import Organizer, Person, Booking, Event, Ticket

class PersonFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Person

    name = factory.Sequence(lambda n: f"person{n}")
    email = factory.Sequence(lambda n: f"person{n}@example.com")
    password = factory.Faker('password')


class OrganizerFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Organizer
    person = factory.SubFactory(PersonFactory)
    organization_name = factory.Sequence(lambda n: f"organizer{n}")
    organization_email = factory.LazyAttribute(lambda n: f"organizer{n}@example.com")



class TicketFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Ticket

    price = factory.Faker(
        'pydecimal',
        left_digits=4,
        right_digits=2,
        positive=True
    )

class EventFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Event

    event_title = factory.Sequence(lambda n: f"event{n}")
    description  = factory.Faker('text')
    organizer = factory.SubFactory(OrganizerFactory)
    start_date = factory.Faker('future_datetime')
    end_date = factory.LazyAttribute(
        lambda obj: obj.start_date + timedelta(hours=2)
    )
    venue = factory.Sequence(lambda n: f"venue{n}")
    is_paid = factory.Faker('boolean')
    maximum_attendees = factory.Faker('random_int', min=1, max=100)
    ticket = factory.RelatedFactory(
        TicketFactory,
        factory_related_name='event'
    )


class BookingFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Booking
    attendee = factory.SubFactory(PersonFactory)
    event = factory.SubFactory(EventFactory)
    ticket = factory.LazyAttribute(
        lambda obj: obj.event.tickets.first()
    )
    booking_status = factory.Iterator(
        ['booked', 'pending', 'cancelled']
    )