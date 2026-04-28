from datetime import date, timedelta
from .models import Policy, RenewalReminder

def generate_policy_renewal_reminders(days=30):
    today = date.today()
    cutoff = today + timedelta(days=days)

    expiring_policies = Policy.objects.filter(
        expiration_date__lte=cutoff,
        expiration_date__gte=today,
        status="active"
    )

    created_count = 0

    for policy in expiring_policies:
        exists = RenewalReminder.objects.filter(
            policy=policy,
            acknowledged=False
        ).exists()

        if not exists:
            RenewalReminder.objects.create(
                policy=policy,
                customer=policy.customer,
                reminder_date=policy.expiration_date
            )
            created_count += 1

    return created_count
