from django.shortcuts import render
from rest_framework import viewsets
from .models import Payment
from .serializers import PaymentSerializer
from activity.utils import log_payment_action

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all().order_by("-id")
    serializer_class = PaymentSerializer

# Create your views here.
    def get_queryset(self):
        queryset = Payment.objects.all().order_by("-id")

        invoice_id = self.request.query_params.get("invoice")
        if invoice_id:
            queryset = queryset.filter(invoice_id=invoice_id)

        return queryset
    
    def perform_create(self, serializer):
        payment = serializer.save()

        invoice = payment.invoice

        # Subtract payment amount from balance
        invoice.balance = invoice.balance - payment.amount

        # Prevent negative balances
        if invoice.balance < 0:
            invoice.balance = 0

        # Update status
        if invoice.balance == 0:
            invoice.status = "paid"
        elif invoice.balance < invoice.total_amount:
            invoice.status = "partial"
        else:
            invoice.status = "unpaid"

        invoice.save()

        # Log the action
        log_payment_action(
            "payment_created",
            payment,
            f"Payment of ${payment.amount} was added."
        )

