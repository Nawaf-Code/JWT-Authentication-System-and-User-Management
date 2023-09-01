from djoser.serializers import UserCreateSerializer
from rest_framework import serializers
from .models import StudentProfile, SupervisorProfile
from django.contrib.auth import get_user_model


User = get_user_model()


class StudentProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentProfile
        fields = ['Status', 'Is_Leader', 'Major', 'Gender']

class SupervisorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = SupervisorProfile
        fields = ['Status', 'Major']

class UserSerializer(serializers.ModelSerializer):
    student_profile = StudentProfileSerializer(required=False)
    supervisor_profile = SupervisorProfileSerializer(required=False)

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'password', 'role', 'student_profile', 'supervisor_profile']

    def create(self, validated_data):
        role = validated_data.pop('role')
        password = validated_data.pop('password')

        # Pop the student_profile data from validated_data before creating User
        student_profile_data = validated_data.pop('student_profile', None)
        supervisor_profile_data = validated_data.pop('supervisor_profile', None)

        user = User.objects.create_user(role=role, **validated_data)
        user.set_password(password)
        user.save()

        # Create StudentProfile or SupervisorProfile
        if role == 'STUDENT' and student_profile_data is not None:
            StudentProfile.objects.create(user=user, **student_profile_data)
        elif role == 'SUPERVISOR' and supervisor_profile_data is not None:
            SupervisorProfile.objects.create(user=user, **supervisor_profile_data)

        return user
    
class VerifyAccountSerializer(serializers.Serializer):
    email = serializers.EmailField()
    code = serializers.CharField()