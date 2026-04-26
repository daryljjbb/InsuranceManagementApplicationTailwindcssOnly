from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.conf import settings
import uuid
# Create your models here.

# Create your models here.
# ------------------------------------------------------------
# Customer Model - stores basic patient information
# ------------------------------------------------------------
class Customer(models.Model):
    GENDER_CHOICES = [
        ("Male", "Male"),
        ("Female", "Female"),
        ("Other", "Other"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True) 
    notes = models.TextField(blank=True, null=True)

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    date_of_birth = models.DateField()
    phone = models.CharField(max_length=15, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    address1 = models.CharField(max_length=255, blank=True)
    address2 = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=50, blank=True)
    zip_code = models.CharField(max_length=20, blank=True)
    status = models.CharField(
    max_length=20,
    choices=[
        ("active", "Active"),
        ("inactive", "Inactive"),
        ("lead", "Lead"),
    ],
    default="active",
)




    def __str__(self):
        return f"{self.first_name} {self.last_name}"




class Policy(models.Model):

    POLICY_AUTO = "auto"
    POLICY_HOME = "home"
    POLICY_LIFE = "life"

    POLICY_TYPES = [
        (POLICY_AUTO, "Auto Insurance"),
        (POLICY_HOME, "Home Insurance"),
        (POLICY_LIFE, "Life Insurance"),
    ]

    customer = models.ForeignKey(
        Customer,
        related_name="policies",
        on_delete=models.CASCADE
    )

    policy_number = models.CharField(max_length=255, unique=True)
    policy_type = models.CharField(max_length=20, choices=POLICY_TYPES)

    effective_date = models.DateField()
    expiration_date = models.DateField()
    premium_amount = models.DecimalField(max_digits=10, decimal_places=2)

    carrier = models.CharField(max_length=255, blank=True, null=True)
    coverage_amount = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

     # AUTO
    vehicle_make = models.CharField(max_length=255, blank=True, null=True)
    vehicle_model = models.CharField(max_length=255, blank=True, null=True)
    vehicle_year = models.CharField(max_length=4, blank=True, null=True)
    vin = models.CharField(max_length=50, blank=True, null=True)

    # HOME
    property_address = models.CharField(max_length=255, blank=True, null=True)
    property_value = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)

    # LIFE
    beneficiary_name = models.CharField(max_length=255, blank=True, null=True)
    coverage_amount = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.policy_number} ({self.get_policy_type_display()})"
