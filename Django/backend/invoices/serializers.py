from rest_framework import serializers
from .models import Invoice
from payments.serializers import PaymentSerializer

class InvoiceSerializer(serializers.ModelSerializer):
    payments = PaymentSerializer(many=True, read_only=True)
    policy_number = serializers.CharField(source="policy.policy_number", read_only=True)
    policy_id = serializers.IntegerField(source="policy.id", read_only=True)
    customer_name = serializers.SerializerMethodField()
    customer_id = serializers.SerializerMethodField()

    class Meta:
        model = Invoice
        fields = "__all__"

    def get_customer_name(self, obj):
        return f"{obj.policy.customer.first_name} {obj.policy.customer.last_name}"

    def get_customer_id(self, obj):
        return obj.policy.customer.id
