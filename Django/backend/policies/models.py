from django.db import models
from customers.models import Customer
from django.utils import timezone

class Policy(models.Model):
    POLICY_TYPES = [
        ("auto", "Auto"),
        ("home", "Home"),
        ("life", "Life"),
    ]

    POLICY_STATUS = [
        ("active", "Active"),
        ("expired", "Expired"),
        ("cancelled", "Cancelled"),
    ]

    customer = models.ForeignKey(
        Customer,
        related_name="policies",
        on_delete=models.CASCADE,
    )
    policy_type = models.CharField(max_length=20, choices=POLICY_TYPES)
    policy_number = models.CharField(max_length=255, unique=True)
    effective_date = models.DateField()
    expiration_date = models.DateField()
    premium_amount = models.DecimalField(max_digits=10, decimal_places=2)
    carrier = models.CharField(max_length=255, blank=True, null=True)

    status = models.CharField(
        max_length=20,
        choices=POLICY_STATUS,
        default="active"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        today = timezone.now().date()

        # Auto-expire policies
        if self.status != "cancelled":
            if self.expiration_date < today:
                self.status = "expired"
            else:
                self.status = "active"

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.policy_type} - {self.policy_number}"
    
class RenewalReminder(models.Model):
    policy = models.ForeignKey(Policy, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    reminder_date = models.DateField()
    acknowledged = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Reminder for {self.policy.policy_number}"
