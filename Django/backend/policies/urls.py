from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import customer_policies, PolicyViewSet, RenewalReminderView, AcknowledgeReminderView

router = DefaultRouter()
router.register(r"policies", PolicyViewSet, basename="policy")

urlpatterns = [
    path("customers/<int:customer_id>/policies/", customer_policies),
     path("renewals/", RenewalReminderView.as_view()),
    path("renewals/<int:reminder_id>/ack/", AcknowledgeReminderView.as_view()),
    path("", include(router.urls)),
]
