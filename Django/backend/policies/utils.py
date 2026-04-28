# policies/utils.py

from datetime import timedelta
from django.utils import timezone
from policies.models import Policy
from renewals.models import RenewalReminder 

def generate_policy_renewal_reminders(days=30):
    today = timezone.now().date()
    cutoff = today + timedelta(days=days)

    # Get all active policies expiring within X days
    expiring_policies = Policy.objects.filter(
        status="active",
        expiration_date__lte=cutoff,
        expiration_date__gte=today
    )

    created_count = 0

    for policy in expiring_policies:
        # Duplicate‑proof: check if reminder already exists
        exists = RenewalReminder.objects.filter(
            policy=policy,
            customer=policy.customer,
            acknowledged=False
        ).exists()

        if exists:
            continue

        # Create reminder
        RenewalReminder.objects.create(
            policy=policy,
            customer=policy.customer,
            reminder_date=policy.expiration_date,
        )

        created_count += 1

    return created_count
