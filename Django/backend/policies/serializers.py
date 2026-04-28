from rest_framework import serializers
from .models import Policy, RenewalReminder

class PolicySerializer(serializers.ModelSerializer):
    class Meta:
        model = Policy
        fields = "__all__"
        read_only_fields = ["customer"]
    
class RenewalReminderSerializer(serializers.ModelSerializer):
    class Meta:
        model = RenewalReminder
        fields = "__all__"


