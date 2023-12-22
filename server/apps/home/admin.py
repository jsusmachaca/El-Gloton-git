from django.contrib import admin
from .models import Category, Food

# Register your models here.
admin.site.register(Category)
admin.site.register(Food)