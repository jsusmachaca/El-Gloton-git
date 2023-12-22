from django.contrib import admin
from .models import Category, Product, Employee

# Register your models here.

admin.site.register(Product)
admin.site.register(Category)
admin.site.register(Employee)