import factory

from eventsApp.models import Organizer, Person

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