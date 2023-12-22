from rest_framework_simplejwt import views as rviews
from django.urls import path
from . import views


urlpatterns = [
    path('login/', rviews.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', rviews.TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterUserAPIView.as_view(), name='register'),
]