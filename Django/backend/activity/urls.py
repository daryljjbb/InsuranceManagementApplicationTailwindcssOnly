# activity/urls.py
from django.urls import path
from .views import RecentActivityView

urlpatterns = [
    path("activity/", RecentActivityView.as_view()),
]
