from django.db import models

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    quantity = models.DecimalField(max_digits=6, decimal_places=2)
    weight = models.CharField(max_length=100, null=True)
    temperature = models.CharField(max_length=100, null=True)
    purchase_price = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return self.name
    

class Employee(models.Model):
    name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    address = models.CharField(max_length=255)
    dni = models.IntegerField()
    salary = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return self.name