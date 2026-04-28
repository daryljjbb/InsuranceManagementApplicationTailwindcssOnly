from django.db import models
from policies.models import Policy
from customers.models import Customer


# Create your models here.
class RenewalReminder(models.Model):
    policy = models.ForeignKey(Policy, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    reminder_date = models.DateField()
    acknowledged = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Reminder for {self.policy.policy_number}"
