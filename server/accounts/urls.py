from django.urls import path, include
from .views import check_email,  Register, VerifyOTP
from .emails import re_send_otp

urlpatterns = [
    path('check_email', check_email ,name='check_email'),
    path('register/', Register.as_view(), name='register'),
    path('verify/', VerifyOTP.as_view(), name='verify'),
    path('re_send_otp/', re_send_otp, name='re_send_otp')
]