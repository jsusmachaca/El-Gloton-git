from django.db import models

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Food(models.Model):
    food_name = models.CharField(max_length=255, null=False)
    description = models.TextField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    image = models.ImageField(upload_to='home')
    
    def __str__(self):
        return self.food_name

