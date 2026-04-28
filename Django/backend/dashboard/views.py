from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from customers.models import Customer
from policies.models import Policy
from django.utils import timezone

from rest_framework.views import APIView
from rest_framework.response import Response
from customers.models import Customer
from policies.models import Policy
from renewals.models import RenewalReminder
from django.utils import timezone
from datetime import timedelta

class DashboardSummaryView(APIView):
    def get(self, request):
        today = timezone.now().date()
        cutoff = today + timedelta(days=30)

        customers = Customer.objects.count()
        active_policies = Policy.objects.filter(status="active").count()

        expiring_policies = Policy.objects.filter(
            status="active",
            expiration_date__lte=cutoff,
            expiration_date__gte=today
        ).count()

        renewals = RenewalReminder.objects.filter(
            acknowledged=False
        ).count()

        return Response({
            "customers": customers,
            "activePolicies": active_policies,
            "expiringPolicies": expiring_policies,
            "renewals": renewals,
        })
