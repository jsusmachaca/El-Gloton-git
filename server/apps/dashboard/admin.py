from django.contrib import admin
from .models import OrderedCard, ShopingCart, QuantityFood

# Register your models here.
admin.site.register(OrderedCard)
admin.site.register(ShopingCart)
admin.site.register(QuantityFood)