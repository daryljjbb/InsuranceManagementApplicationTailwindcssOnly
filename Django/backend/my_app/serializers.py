from rest_framework import serializers
from .models import Customer, Policy

class PolicySerializer(serializers.ModelSerializer):
    class Meta:
        model = Policy
        fields = "__all__"

# ----------------------------------------------------------------
# Customer Serializer
# ----------------------------------------------------------------
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = "__all__"
        read_only_fields = ["user", "created_at", "updated_at"]



