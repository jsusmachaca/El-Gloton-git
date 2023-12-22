from rest_framework import serializers
from .models import OrderedCard, ShopingCart, QuantityFood
from django.contrib.auth.models import User
from apps.home.serializers import FoodSerializer
from  apps.home.models import Food


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']



class QuantitySerializer(serializers.ModelSerializer):
    class Meta:
        model = QuantityFood
        fields = ['id', 'food', 'quantity']



class ShopingCartSerializer(serializers.ModelSerializer):
    order = QuantitySerializer(many=True, read_only=True)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        # Obtener los nombres y las imágenes de cliente e item
        order = data['order']
        request = self.context.get('request')
        for item in order:
            item_instance = QuantityFood.objects.get(id=item['id'])
            item['client'] = UserSerializer(User.objects.get(id=item_instance.client.id)).data['username']
            food_data = FoodSerializer(Food.objects.get(id=item_instance.food.id)).data
            item['food'] = {
                'food_name': FoodSerializer(Food.objects.get(id=item_instance.food.id)).data['food_name'],
                'price': FoodSerializer(Food.objects.get(id=item_instance.food.id)).data['price'],
                'food_image': request.build_absolute_uri(food_data['image'])
            }
        return data

    class Meta:
        model = ShopingCart
        fields = ['id', 'order']



class OrderedCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderedCard
        fields = ['id', 'client', 'order', 'address_or_tables', 'phone_number', 'total_pay', 'payed']