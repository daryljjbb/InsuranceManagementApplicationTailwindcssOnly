from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework import status
from .models import Policy, RenewalReminder
from .serializers import PolicySerializer, RenewalReminderSerializer
from customers.models import Customer
from activity.utils import log_policy_action
from django.shortcuts import get_object_or_404

# -----------------------------
# Customer → Policies (List/Create)
# -----------------------------
@api_view(["GET", "POST"])
def customer_policies(request, customer_id):
    customer = get_object_or_404(Customer, id=customer_id)

    if request.method == "GET":
        policies = customer.policies.all().order_by("-id")
        serializer = PolicySerializer(policies, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        serializer = PolicySerializer(data=request.data)
        if serializer.is_valid():
            policy = serializer.save(customer=customer)

            # ⭐ Log creation
            log_policy_action(
                "policy_created",
                policy,
                f"Policy {policy.policy_number} was created for {customer.first_name} {customer.last_name}."
            )

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# -----------------------------
# Policy CRUD (ViewSet)
# -----------------------------
class PolicyViewSet(viewsets.ModelViewSet):
    queryset = Policy.objects.all().order_by("-id")
    serializer_class = PolicySerializer

    # CREATE
    def perform_create(self, serializer):
        policy = serializer.save()

        log_policy_action(
            "policy_created",
            policy,
            f"Policy {policy.policy_number} was created."
        )

    # UPDATE
    def perform_update(self, serializer):
        policy = serializer.save()

        log_policy_action(
            "policy_updated",
            policy,
            f"Policy {policy.policy_number} was updated."
        )

    # DELETE
    def perform_destroy(self, instance):
        log_policy_action(
            "policy_deleted",
            instance,
            f"Policy {instance.policy_number} was deleted."
        )

        instance.delete()

class RenewalReminderView(APIView):
    def get(self, request):
        reminders = RenewalReminder.objects.filter(acknowledged=False)
        serializer = RenewalReminderSerializer(reminders, many=True)
        return Response(serializer.data)

class AcknowledgeReminderView(APIView):
    def post(self, request, reminder_id):
        reminder = RenewalReminder.objects.get(id=reminder_id)
        reminder.acknowledged = True
        reminder.save()
        return Response({"message": "Reminder acknowledged"})