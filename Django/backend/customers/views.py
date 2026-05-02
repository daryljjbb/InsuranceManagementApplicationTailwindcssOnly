
from .models import Customer
from .serializers import CustomerSerializer
from activity.utils import log_customer_action
from rest_framework import generics, filters
from django.db.models import Q


class CustomerListCreateView(generics.ListCreateAPIView):
    serializer_class = CustomerSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["first_name", "last_name", "email", "phone"]
    ordering_fields = ["id", "first_name", "last_name", "email", "phone"]
    ordering = ["-id"]

    def get_queryset(self):
        search = self.request.query_params.get("search", "")
        ordering = self.request.query_params.get("ordering", "-id")

        qs = Customer.objects.all().order_by(ordering)

        if search:
            qs = qs.filter(
                Q(first_name__icontains=search) |
                Q(last_name__icontains=search) |
                Q(email__icontains=search) |
                Q(phone__icontains=search)
            )

        return qs

    def perform_create(self, serializer):
        customer = serializer.save()
        log_customer_action(
            "customer_created",
            customer,
            f"Customer {customer.first_name} {customer.last_name} was created."
        )
class CustomerDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

    def perform_update(self, serializer):
        customer = serializer.save()
        log_customer_action(
            "customer_updated",
            customer,
            f"Customer {customer.first_name} {customer.last_name} was updated."
        )

    def perform_destroy(self, instance):
        log_customer_action(
            "customer_deleted",
            instance,
            f"Customer {instance.first_name} {instance.last_name} was deleted."
        )
        instance.delete()

