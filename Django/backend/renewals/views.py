from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from renewals.models import RenewalReminder
from renewals.serializers import RenewalReminderSerializer


# Create your views here.
class CustomerRenewalReminderView(APIView):
    def get(self, request, customer_id):
        reminders = RenewalReminder.objects.filter(
            customer_id=customer_id,
            acknowledged=False
        )
        data = [
            {
                "id": r.id,
                "policy_number": r.policy.policy_number,
                "reminder_date": r.reminder_date,
                "customer_name": f"{r.customer.first_name} {r.customer.last_name}",
            }
            for r in reminders
        ]
        return Response(data)

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