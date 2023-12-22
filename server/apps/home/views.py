from django.shortcuts import render
from django.db.models import Q
from rest_framework import viewsets, permissions
from .models import Food
from .serializers import CategorySerializer, FoodSerializer

# Create your views here.
class OnlyReadPermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == 'GET' or request.method == 'OPTIONS':
            return True
        else: 
            return False


class FoodViewSet(viewsets.ModelViewSet):
    queryset = Food.objects.filter(
        Q(category=1) | Q(category=2)
    )
    serializer_class = FoodSerializer
    permission_classes = [OnlyReadPermissions]


class DrinkViewSet(viewsets.ModelViewSet):
    queryset = Food.objects.filter(category=4)
    serializer_class = FoodSerializer
    permission_classes = [OnlyReadPermissions]


class SoupViewSet(viewsets.ModelViewSet):
    queryset = Food.objects.filter(category=3)
    serializer_class = FoodSerializer
    permission_classes = [OnlyReadPermissions]