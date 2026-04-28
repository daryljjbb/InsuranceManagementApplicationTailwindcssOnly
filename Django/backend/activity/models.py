# activity/models.py
from django.db import models
from customers.models import Customer
from policies.models import Policy
from invoices.models import Invoice


class ActivityLog(models.Model):
    ACTION_TYPES = [
        # Customer actions
        ("customer_created", "Customer Created"),
        ("customer_updated", "Customer Updated"),
        ("customer_deleted", "Customer Deleted"),

        # Policy actions
        ("policy_created", "Policy Created"),
        ("policy_updated", "Policy Updated"),
        ("policy_deleted", "Policy Deleted"),

        # Invoice actions
        ("invoice_created", "Invoice Created"),
        ("invoice_updated", "Invoice Updated"),
        ("invoice_deleted", "Invoice Deleted"),
    ]

    action = models.CharField(max_length=50, choices=ACTION_TYPES)

    # Optional links to related objects
    customer = models.ForeignKey(
        Customer, null=True, blank=True, on_delete=models.SET_NULL
    )
    policy = models.ForeignKey(
        Policy, null=True, blank=True, on_delete=models.SET_NULL
    )
    invoice = models.ForeignKey(
        Invoice, null=True, blank=True, on_delete=models.SET_NULL
    )

    message = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.message
