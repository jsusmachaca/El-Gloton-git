from rest_framework import serializers
from apps.dashboard.models import OrderedCard, ShopingCart, QuantityFood
from apps.home.models import Food
from django.contrib.auth.models import User 


# Utiliza el serializador personalizado
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name']  # Puedes ajustar esto según los campos en tu modelo User


class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = ['food_name']


class QuantityFootSerializer(serializers.ModelSerializer):
    food = FoodSerializer()

    class Meta:
        model = QuantityFood
        fields = ['food', 'quantity']

    def to_representation(self, instance):
        return {
            'food_name': instance.food.food_name, 'quantity': instance.quantity
        }
    

class ShopingCartSerializer(serializers.ModelSerializer):
    order = QuantityFootSerializer(many=True)

    class Meta:
        model = ShopingCart
        fields = ['order']


class PanelSerializer(serializers.ModelSerializer):
    client = UserSerializer()
    order = ShopingCartSerializer()

    class Meta:
        model = OrderedCard
        fields = ['id', 'client', 'order', 'address_or_tables', 'phone_number', 'total_pay', 'payed', 'delivered']