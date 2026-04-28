from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from customers.models import Customer
from policies.models import Policy
from django.utils import timezone

class DashboardSummaryView(APIView):
    def get(self, request):
        today = timezone.now().date()

        customers = Customer.objects.count()
        active_policies = Policy.objects.filter(status="active").count()
        expiring_policies = Policy.objects.filter(expiration_date__lte=today).count()
        renewals = Policy.objects.filter(expiration_date__gte=today).count()

        return Response({
            "customers": customers,
            "activePolicies": active_policies,
            "expiringPolicies": expiring_policies,
            "renewals": renewals,
        })
