from rest_framework import viewsets, permissions, status, views
from .models import OrderedCard, ShopingCart, QuantityFood
from .serializers import OrderedCardSerializer, ShopingCartSerializer, QuantitySerializer
from rest_framework import generics
from rest_framework.response import Response


# Create your views here.
class OnlyReadPermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == 'GET' or request.method == 'OPTIONS' or request.method == 'HEADERS':
            return True
        else: 
            return False
        

class ShotpingCardViewSet(viewsets.ModelViewSet):
    serializer_class = ShopingCartSerializer
    permission_classes = [permissions.IsAuthenticated, OnlyReadPermissions]
    def get_queryset(self):
        return ShopingCart.objects.filter(order__client=self.request.user).distinct()



class BuyFootViewSet(generics.CreateAPIView):
    serializer_class = QuantitySerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        user = request.user
        food_id = self.kwargs.get('food')
        existing_order = OrderedCard.objects.filter(client=user).first()

        if existing_order:
            return Response({"detail": "Ya tienes una orden pendiente. No puedes agregar al carrito mientras tengas una orden pendiente."}, status=status.HTTP_400_BAD_REQUEST)
        else:
            data = {
                'food': food_id,
                'quantity': request.data.get('quantity'),
            }

            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)

            serializer.validated_data['client'] = user

            self.perform_create(serializer)
            return Response({"message": "Success"}, status=status.HTTP_201_CREATED)
        

class RemoveItem(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = QuantityFood.objects.all()
    lookup_field = 'pk'

    def destroy(self, request, *args, **kwargs):
        client = request.user
        existing_order = OrderedCard.objects.filter(client=client).first()

        if existing_order:
            return Response({"detail": "Ya tienes una orden pendiente. No puedes eliminar mientras tengas una orden pendiente."}, status=status.HTTP_400_BAD_REQUEST)

        else:   
            instance = self.get_object()
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
    

class OrderedCartView(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = OrderedCardSerializer

    def create(self, request, *args, **kwargs):
        client = request.user
        existing_order = OrderedCard.objects.filter(client=client).first()

        if existing_order:
            return Response({"detail": "Ya tienes una orden pendiente. Cancela la orden existente antes de crear una nueva."}, status=status.HTTP_400_BAD_REQUEST)

        else:
            order = self.kwargs.get('order')
            data = {
                'client': client.id,
                'order': order,
                'address_or_tables': request.data.get('address_or_tables'),
                'phone_number': request.data.get('phone_number'),   
                'total_pay': request.data.get('total_pay'),
                'payed': request.data.get('payed')
            }

            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


class CancelOrder(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = OrderedCard.objects.all()
    lookup_field = 'pk'

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
