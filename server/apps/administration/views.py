from django.shortcuts import render
from .serializers import PanelSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework import status, generics
from apps.dashboard.models import OrderedCard
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.decorators import user_passes_test
from .models import Product, Employee
from .mqtt import client
from django.core.serializers import serialize


# Create your views here.
class PanelViewSet(ModelViewSet):
    queryset = OrderedCard.objects.all()
    serializer_class = PanelSerializer
    permission_classes = [IsAdminUser,]


class UpdatePayed(generics.UpdateAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = PanelSerializer
    queryset = OrderedCard.objects.all()
    lookup_url_kwarg = 'order'

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        payed = request.data.get('payed')
        if payed is not None:
            instance.payed = payed
            instance.save()
            return Response({"message": "Success"}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Payed field is required for update"}, status=status.HTTP_400_BAD_REQUEST)


class UpdateDelivered(generics.UpdateAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = PanelSerializer
    queryset = OrderedCard.objects.all()
    lookup_url_kwarg = 'order'

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        delivered = request.data.get('delivered')
        if delivered is not None:
            instance.delivered = delivered
            instance.save()
            return Response({"message": "Success"}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Delivered field is required for update"}, status=status.HTTP_400_BAD_REQUEST)


class RemoveOrder(generics.DestroyAPIView):
    permission_classes = [IsAdminUser]
    queryset = OrderedCard.objects.all()
    lookup_field = 'pk'

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@user_passes_test(lambda user: user.is_staff, login_url='admin:login')
def OrderedList(request):
    user = request.user
    refresh = RefreshToken.for_user(user)
    token = str(refresh.access_token)
    return render(request, 'orders.html', {'token': token})


def ProductsList(request):
    products = Product.objects.all()
    return render(request, 'products.html', {'products': products})


def EmployeesList(request):
    employees = Employee.objects.all()
    return render(request, 'employees.html', {'employees': employees})
