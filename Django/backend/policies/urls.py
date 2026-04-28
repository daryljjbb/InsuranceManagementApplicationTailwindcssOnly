from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import customer_policies, PolicyViewSet

router = DefaultRouter()
router.register(r"policies", PolicyViewSet, basename="policy")

urlpatterns = [
    path("customers/<int:customer_id>/policies/", customer_policies),
    path("", include(router.urls)),
]
