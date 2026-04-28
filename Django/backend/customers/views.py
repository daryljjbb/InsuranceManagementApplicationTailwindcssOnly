from rest_framework import generics
from .models import Customer
from .serializers import CustomerSerializer
from activity.utils import log_customer_action


class CustomerListCreateView(generics.ListCreateAPIView):
    queryset = Customer.objects.all().order_by("-id")
    serializer_class = CustomerSerializer

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

