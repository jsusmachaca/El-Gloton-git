from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()

router.register(r'list', views.PanelViewSet, 'list')


urlpatterns = [
    path('', include(router.urls)),
    path('orders/', views.OrderedList, name='orders'),
    path('orders/del/<int:pk>/', views.RemoveOrder.as_view(), name='order_remove'),
    path('products/', views.ProductsList, name='products'),
    path('employees/', views.EmployeesList, name='employees'),
    path('payed/<int:order>/', views.UpdatePayed.as_view(), name='edit'),
    path('delivered/<int:order>/', views.UpdateDelivered.as_view(), name='edit_delivered'),
]