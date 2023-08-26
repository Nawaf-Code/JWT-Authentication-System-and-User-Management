from django.contrib import admin
from .models import User, Student, Supervisor

users = [User, Student, Supervisor]
admin.site.register(users)