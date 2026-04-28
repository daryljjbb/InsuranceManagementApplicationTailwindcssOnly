
from .models import Policy, RenewalReminder
from rest_framework import serializers


class RenewalReminderSerializer(serializers.ModelSerializer):
    class Meta:
        model = RenewalReminder
        fields = "__all__"
