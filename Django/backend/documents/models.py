from django.db import models
from customers.models import Customer

class Document(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name="documents")
    file = models.FileField(upload_to="documents/")
    file_name = models.CharField(max_length=255, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.file_name:
            self.file_name = self.file.name
        super().save(*args, **kwargs)

    def __str__(self):
        return self.file_name
