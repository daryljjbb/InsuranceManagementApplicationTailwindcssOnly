from django.urls import path
from .views import RenewalReminderView, AcknowledgeReminderView

urlpatterns = [
    path("", RenewalReminderView.as_view(), name="renewal-reminders"),
    path("<int:reminder_id>/ack/", AcknowledgeReminderView.as_view(), name="ack-reminder"),
]
