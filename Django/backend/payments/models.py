from django.db import models
from invoices.models import Invoice

class Payment(models.Model):
    invoice = models.ForeignKey(
        Invoice,
        related_name="payments",
        on_delete=models.CASCADE
    )
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    notes = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment ${self.amount} for Invoice {self.invoice.invoice_number}"

# Create your models here.
