from django.urls import path
from .views import check_email


urlpatterns = [
    path('check_email', check_email ,name='check_email'),
]