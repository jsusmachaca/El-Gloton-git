from django.urls import include, path
from django.shortcuts import redirect
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'foods', views.FoodViewSet, 'home')
router.register(r'drinks', views.DrinkViewSet, 'drinks')
router.register(r'soups', views.SoupViewSet, 'soups')

# Routes (home/foods, /home/drinks, home/soups) to see the different items from the client

urlpatterns = [
    path('', lambda request: redirect('orders')),
    path('home/', include(router.urls)),
]