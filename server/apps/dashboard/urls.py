from django.urls import path, include
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register(r'dashboard', views.ShotpingCardViewSet, 'card')

urlpatterns = [
    path('', include(router.urls)),
    path('buy/<int:food>/', views.BuyFootViewSet.as_view()),
    path('dashboard/del/<int:pk>/', views.RemoveItem.as_view(), name='remove'),
    path('dashboard/pay/<int:order>/', views.OrderedCartView.as_view(), name='order'),
    path('dashboard/cancel/<int:pk>/', views.CancelOrder.as_view(), name='cancel'),
]