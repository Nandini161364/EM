from django.core.mail import send_mail
from django.conf import settings


class EmailService:

    @staticmethod
    def send_registration_email(user):

        send_mail(
            subject="Welcome to Event Manager",
            message=(
                f"Hi {user.username},\n\n"
                f"Your account was created successfully."
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
            fail_silently=False
        )

    @staticmethod
    def send_booking_confirmation(user):

        send_mail(
            subject="Booking Confirmed",
            message=(
                f"Hi {user.username},\n\n"
                f"Your booking is confirmed."
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
            fail_silently=False
        )