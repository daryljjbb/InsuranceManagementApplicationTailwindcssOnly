from django.shortcuts import render
# activity/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import ActivityLog
from .serializers import ActivityLogSerializer
from rest_framework.pagination import PageNumberPagination


class ActivityPagination(PageNumberPagination):
    page_size = 20

class RecentActivityView(APIView):
    def get(self, request):
        logs = ActivityLog.objects.all()
        paginator = ActivityPagination()
        result = paginator.paginate_queryset(logs, request)
        serializer = ActivityLogSerializer(result, many=True)
        return paginator.get_paginated_response(serializer.data)