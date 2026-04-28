from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PolicyInvoiceListCreateView, InvoiceViewSet

router = DefaultRouter()
router.register(r"invoices", InvoiceViewSet, basename="invoice")

urlpatterns = [
    path("policies/<int:policy_id>/invoices/", PolicyInvoiceListCreateView.as_view()),
    path("", include(router.urls)),
]
