from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets, permissions
from .models import Invoice
from .serializers import InvoiceSerializer
from customers.models import Customer
from activity.utils import log_customer_action
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404

class PolicyInvoiceListCreateView(APIView):
    def get(self, request, policy_id):
        invoices = Invoice.objects.filter(policy_id=policy_id).order_by("-id")
        serializer = InvoiceSerializer(invoices, many=True)
        return Response(serializer.data)

    def post(self, request, policy_id):
        data = request.data.copy()
        data["policy"] = policy_id
        serializer = InvoiceSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# -----------------------------
# Customer → Invoices (List/Create)
# -----------------------------
@api_view(["GET", "POST"])
def customer_invoices(request, customer_id):
    customer = get_object_or_404(Customer, id=customer_id)

    if request.method == "GET":
        invoices = customer.invoices.all().order_by("-id")
        serializer = InvoiceSerializer(invoices, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        serializer = InvoiceSerializer(data=request.data)
        if serializer.is_valid():
            invoice = serializer.save(customer=customer)

            # ⭐ Log creation
            log_customer_action(
                "invoice_created",
                customer,
                f"Invoice #{invoice.id} was created for {customer.first_name} {customer.last_name}."
            )

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# -----------------------------
# Invoice CRUD (ViewSet)
# -----------------------------
class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.all().order_by("-id")
    serializer_class = InvoiceSerializer

    # CREATE
    def perform_create(self, serializer):
        invoice = serializer.save()

        log_customer_action(
            "invoice_created",
            invoice.customer,
            f"Invoice #{invoice.id} was created."
        )

    # UPDATE
    def perform_update(self, serializer):
        invoice = serializer.save()

        log_customer_action(
            "invoice_updated",
            invoice.customer,
            f"Invoice #{invoice.id} was updated."
        )

    # DELETE
    def perform_destroy(self, instance):
        log_customer_action(
            "invoice_deleted",
            instance.customer,
            f"Invoice #{instance.id} was deleted."
        )

        instance.delete()
