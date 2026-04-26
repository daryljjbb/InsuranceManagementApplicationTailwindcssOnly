# core/urls.py
# core/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.middleware.csrf import get_token
from django.http import JsonResponse

from . import views


router = DefaultRouter()



urlpatterns = [
    path('customers/', views.CustomerListCreateView.as_view()),
    path('customers/<int:pk>/', views.CustomerDetailView.as_view()),
    path("customers/<int:customer_id>/policies/", views.customer_policies),


    path("customers/<int:pk>/notes/", views.update_customer_notes),



    path('login/', views.api_login, name='api_login'),
    path('logout/', views.api_logout, name='api_logout'),
    path('register/', views.api_register, name='api_register'),
    path('me/', views.me, name='me'),

    path("csrf/", lambda request: JsonResponse({"csrfToken": get_token(request)})),
    


    # ⭐ This exposes:
    # GET /invoices/
    # POST /invoices/
    # GET /invoices/<id>/
    # PATCH /invoices/<id>/
    # DELETE /invoices/<id>/
    #
    # and same for payments
    path('', include(router.urls)),
]