import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.views import APIView



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
    


class register(APIView):

    def post(self, request):
        try:
           data = request.data
           serializer_class = UserSerializer(data=data)
           if serializer_class.is_valid():
               serializer_class.save()
               return Response({
                   'status': 200,
                   'message': 'user created succefuly',
                   'data': serializer_class.data
                   })
           else:
               return Response({
                   'status': 400,
                   'message': 'something wrong',
                   'data': serializer_class.errors                   })
        except Exception as e:
            print(e) 
        

    




