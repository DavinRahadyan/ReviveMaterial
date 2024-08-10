from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, blank=True, null=True)

    REQUIRED_FIELDS = ['email', 'phone', 'first_name', 'last_name']

class EstimasiLantai(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    length = models.FloatField()
    width = models.FloatField()
    type = models.CharField(max_length=20, default="keramik")
    tileSize = models.CharField(max_length=10)
    pricePerPak = models.IntegerField()
    qty = models.IntegerField()
    price = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Estimasi Lantai - {self.created_at}"


class EstimasiSemenLantai(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    length = models.FloatField()
    width = models.FloatField()
    weight = models.FloatField()
    qty = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.qty} - {self.price}"
    
class EstimasiPondasi(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    length = models.FloatField()
    width = models.FloatField()
    weight = models.FloatField()
    qty = models.IntegerField()
    price = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.qty} - {self.price}"
    
class EstimasiDinding(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    length = models.FloatField()
    width = models.FloatField()
    type = models.CharField(max_length=100)
    tileSize = models.CharField(max_length=100)
    pricePerPak = models.FloatField()
    qty = models.IntegerField()
    price = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.qty} - {self.price}"
    
class EstimasiCat(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    length = models.FloatField()
    width = models.FloatField()
    doorSize = models.FloatField()
    windowsSize = models.FloatField()
    pricePerLiter = models.FloatField()
    color = models.CharField(max_length=50)
    qty = models.IntegerField()
    price = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.qty} - {self.price}"