# activity/utils.py
from .models import ActivityLog

def log_customer_action(action, customer, message):
    ActivityLog.objects.create(
        type="customer",
        action=action,
        customer=customer,
        message=message
    )


def log_policy_action(action, policy, message):
    ActivityLog.objects.create(
        type="policy",
        action=action,
        customer=policy.customer,
        policy=policy,
        message=message
    )


def log_invoice_action(action, invoice, message):
    ActivityLog.objects.create(
        type="invoice",
        action=action,
        customer=invoice.policy.customer,
        policy=invoice.policy,
        invoice=invoice,
        message=message
    )


def log_payment_action(action, payment, message):
    ActivityLog.objects.create(
        type="payment",
        action=action,
        customer=payment.invoice.policy.customer,
        policy=payment.invoice.policy,
        invoice=payment.invoice,
        payment=payment,
        message=message
    )

