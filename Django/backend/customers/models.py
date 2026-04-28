from django.db import models

# Create your models here.


# ------------------------------------------------------------
# Customer Model - stores basic patient information
# ------------------------------------------------------------
from django.db import models

class Customer(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    gender = models.CharField(max_length=20, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=50, blank=True, null=True)
    address1 = models.CharField(max_length=255, blank=True, null=True)
    address2 = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=50, blank=True, null=True)
    zip_code = models.CharField(max_length=20, blank=True, null=True)


    notes = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
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


