# activity/utils.py
from .models import ActivityLog

def log_customer_action(action, customer, message):
    ActivityLog.objects.create(
        action=action,
        customer=customer,
        message=message
    )

def log_policy_action(action, policy, message):
    ActivityLog.objects.create(
        action=action,
        policy=policy,
        customer=policy.customer,
        message=message
    )

def log_invoice_action(action, invoice, message):
    ActivityLog.objects.create(
        action=action,
        invoice=invoice,
        customer=invoice.customer,
        message=message
    )
