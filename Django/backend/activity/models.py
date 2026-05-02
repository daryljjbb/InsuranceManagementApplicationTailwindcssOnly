# activity/models.py
from django.db import models
from customers.models import Customer
from policies.models import Policy
from invoices.models import Invoice


class ActivityLog(models.Model):
    TYPE_CHOICES = [
        ("customer", "Customer"),
        ("policy", "Policy"),
        ("invoice", "Invoice"),
        ("payment", "Payment"),
    ]

    type = models.CharField(max_length=20, choices=TYPE_CHOICES)

    ACTION_TYPES = [
        # Customer
        ("customer_created", "Customer Created"),
        ("customer_updated", "Customer Updated"),
        ("customer_deleted", "Customer Deleted"),

        # Policy
        ("policy_created", "Policy Created"),
        ("policy_updated", "Policy Updated"),
        ("policy_deleted", "Policy Deleted"),

        # Invoice
        ("invoice_created", "Invoice Created"),
        ("invoice_updated", "Invoice Updated"),
        ("invoice_deleted", "Invoice Deleted"),

        # Payment
        ("payment_created", "Payment Created"),
        ("payment_updated", "Payment Updated"),
        ("payment_deleted", "Payment Deleted"),
    ]

    action = models.CharField(max_length=50, choices=ACTION_TYPES)

    customer = models.ForeignKey(Customer, null=True, blank=True, on_delete=models.SET_NULL)
    policy = models.ForeignKey(Policy, null=True, blank=True, on_delete=models.SET_NULL)
    invoice = models.ForeignKey(Invoice, null=True, blank=True, on_delete=models.SET_NULL)
    payment = models.ForeignKey(
    "payments.Payment",
    null=True,
    blank=True,
    on_delete=models.SET_NULL
)


    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.message
