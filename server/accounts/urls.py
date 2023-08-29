from django.urls import path, include
from .views import check_email,  register
from .emails import send_otp

urlpatterns = [
    path('check_email', check_email ,name='check_email'),
    path('register/', register.as_view(), name='register'),
    path('send_otp/', send_otp, name='otp')
]