from rest_framework import generics, permissions
from rest_framework.permissions import IsAdminUser
from rest_framework.views import APIView
from rest_framework.filters import OrderingFilter
from rest_framework import filters # 1. Make sure this is imported
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models.functions import TruncMonth
from django.db.models import Sum
from .models import Customer, Policy
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.decorators import api_view, permission_classes
from .serializers import CustomerSerializer, PolicySerializer
from rest_framework import viewsets
from datetime import timedelta
from django.utils import timezone
from django.shortcuts import get_object_or_404



# Create your views here.
# Create your views here.
# -------------------------------
# Customer ViewSet
# -------------------------------
class CustomerListCreateView(generics.ListCreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

    # GET = public, POST = must be logged in
    permission_classes = [AllowAny]


    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    search_fields = ["first_name", "last_name", "email", "phone"]
    ordering_fields = ["first_name", "last_name", "email"]
    ordering = ["first_name"]

    def perform_create(self, serializer):
        serializer.save(user=User.objects.first())


# ✨ NEW Detail View (REQUIRED for /api/customers/1/)
class CustomerDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [AllowAny]


@api_view(["GET"])
@permission_classes([AllowAny])
def me(request):
    if request.user.is_authenticated:
        return Response({
            "username": request.user.username,
            "first_name": request.user.first_name,
            "last_name": request.user.last_name,
            "email": request.user.email,
            "is_staff": request.user.is_staff,
            "is_superuser": request.user.is_superuser,
        })
    
    return Response({
        "username": "",
        "first_name": "",
        "last_name": "",
        "email": "",
        "is_staff": False,
        "is_superuser": False
    }, status=200)


@api_view(['POST'])
@permission_classes([AllowAny])
def api_login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    
    if user is not None:
        login(request, user)
        return Response({
            "message": "Logged in",
            "is_staff": user.is_staff,
            "is_superuser": user.is_superuser
        })
    return Response({"error": "Invalid credentials"}, status=400)

@api_view(['POST'])
def api_logout(request):
    logout(request)
    return Response({"message": "Logged out"}, status=200)


@api_view(['POST'])
@permission_classes([AllowAny])
def api_register(request):
    username = request.data.get('username')
    first_name = request.data.get('first_name', '')
    last_name = request.data.get('last_name', '')
    password = request.data.get('password')
    is_admin = request.data.get('is_admin', False)

    if not username or not password:
        return Response({"error": "Username and password required"}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists"}, status=400)

    # Create the user
    user = User.objects.create_user(
    username=username,
    password=password,
    first_name=first_name,
    last_name=last_name
)
    # If the checkbox was checked, make them a Staff/Superuser
    if is_admin:
        user.is_staff = True
        user.is_superuser = True
        user.save()

    return Response({"message": "User created successfully"}, status=201)


@api_view(["PATCH"])
def update_customer_notes(request, pk):
    customer = get_object_or_404(Customer, pk=pk)
    customer.notes = request.data.get("notes", "")
    customer.save()
    return Response({"notes": customer.notes})


@api_view(["GET"])
@permission_classes([AllowAny])
def customer_policies(request, customer_id):
    policies = Policy.objects.filter(customer_id=customer_id)
    serializer = PolicySerializer(policies, many=True)
    return Response(serializer.data)
