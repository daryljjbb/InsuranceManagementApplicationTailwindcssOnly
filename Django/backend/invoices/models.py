from django.db import models
from policies.models import Policy

class Invoice(models.Model):
    STATUS_CHOICES = [
        ("unpaid", "Unpaid"),
        ("partial", "Partially Paid"),
        ("paid", "Paid"),
    ]

    policy = models.ForeignKey(
        Policy,
        related_name="invoices",
        on_delete=models.CASCADE,
    )
    invoice_number = models.CharField(max_length=255, unique=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="unpaid")
    due_date = models.DateField()
    notes = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Invoice {self.invoice_number}"
