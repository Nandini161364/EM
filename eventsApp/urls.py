from django.urls import path
from .views import create_event, list_organizer_events, list_attendee_events, register_user, event_booking, cancel_booking, get_event_details, give_feedback, get_profile

urlpatterns = [
    path('create/', create_event, name='create_event'),
    path('user/', register_user, name='register'),
    path('booking/', event_booking, name='booking'),
    path('cancel-booking/', cancel_booking, name='cancel_booking'),
    path('get-event/<int:event_id>/',get_event_details, name='get_event_details'),
    path('feedback/', give_feedback, name='give_feedback'),
    path('attendee-events/', list_attendee_events, name='list_attendee_events'),
    path('organizer-events/', list_organizer_events, name='list_organizer_events'),
    path('profile/', get_profile, name='profile'),
]
