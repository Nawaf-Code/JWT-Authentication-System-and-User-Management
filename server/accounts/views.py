from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from accounts.models import User
import json


@csrf_exempt  # Temporarily disable CSRF protection for demonstration purposes
def check_email(request):
    if request.method == 'POST':  # Change the method to POST
        data = json.loads(request.body)
        email = data.get('email')
        if User.objects.filter(email=email).exists():
            return JsonResponse({'email_exists': True}, status=200)
        else:
            return JsonResponse({'email_exists': False}, status=200)
    else:
        return JsonResponse({'error': 'Invalid request'}, status=400)