from rest_framework import serializers
from .models import Policy
from invoices.serializers import InvoiceSerializer


class PolicySerializer(serializers.ModelSerializer):
    invoices = InvoiceSerializer(many=True, read_only=True)

    class Meta:
        model = Policy
        fields = "__all__"
