from django.urls import path, include
from .views import check_email,  CreateUserView

urlpatterns = [
    path('check_email', check_email ,name='check_email'),
    path('register/', CreateUserView.as_view(), name='register')
]