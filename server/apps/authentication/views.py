from .serializers import RegisterSerializer
from rest_framework import permissions
from rest_framework import generics

# Create your views here.

class RegisterUserAPIView(generics.CreateAPIView):
  serializer_class = RegisterSerializer
  permission_classes = [permissions.AllowAny]
