from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save
from apps.home.models import Food



# Create your models here.
class QuantityFood(models.Model):
    client = models.ForeignKey(User, on_delete=models.CASCADE)
    food = models.ForeignKey(Food, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return str(self.food.food_name)



class ShopingCart(models.Model):
    client = models.ForeignKey(User, on_delete=models.CASCADE)
    order = models.ManyToManyField(QuantityFood)

    def __str__(self):
        return f'Cart of {self.client.username}'



class OrderedCard(models.Model):
    client = models.ForeignKey(User, on_delete=models.CASCADE)
    order = models.ForeignKey(ShopingCart, on_delete=models.CASCADE, null=True, blank=True)
    address_or_tables = models.CharField(max_length=255, default='Me encuentro en el Establecimiento')
    phone_number = models.IntegerField(null=True)
    order_time = models.DateTimeField(auto_now_add=True)
    total_pay = models.DecimalField(max_digits=5, decimal_places=2)
    payed = models.BooleanField(default=False)
    delivered = models.BooleanField(default=False)

    def formatted_order_time(self):
        return self.order_time.strftime("%Y-%m-%d %H:%M:%S")

    def __str__(self):
        return f'Order " {self.order} " at {self.formatted_order_time()}'



@receiver(post_save, sender=QuantityFood)
def create_shopping_cart(sender, instance, created, **kwargs):
    if created:
        client = instance.client
        shopping_cart, created = ShopingCart.objects.get_or_create(client=client)
        shopping_cart.order.add(instance)