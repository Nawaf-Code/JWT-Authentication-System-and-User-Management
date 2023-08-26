from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db.models.query import QuerySet
from django.db.models.signals import post_save
from django.dispatch import receiver


class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = "ADMIN", "Admin"
        STUDENT = "STUDENT", "Student"
        SUPERVISOR = "SUPERVISOR", "Supervisor"

    # Set 'ADMIN' as the base role for super user
    base_role = Role.ADMIN

    role = models.CharField(choices=Role.choices, null=True)
    is_active = models.BooleanField(default=False)
    otp = models.CharField(max_length=6,blank=True, null=True)

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email", "first_name", "last_name", 'role']

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)


class StudentManager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        result = super().get_queryset(*args, **kwargs)
        return result.filter(role=User.Role.STUDENT)

    def create_user(self, username, email, first_name, last_name, role, password=None, **extra_fields):
        if not email:
            raise ValueError("User must have an email address")
        email = self.normalize_email(email)
        user = self.model(
            email=email, username=username, first_name=first_name, last_name=last_name, role=role
        )
        user.set_password(password)
        user.save()

        return user


class Student(User):
    base_role = User.Role.STUDENT

    student = StudentManager()

    class Meta:
        proxy = True

    def welcome(self):
        return "only for students"
    

@receiver(post_save, sender=Student)
def create_user_profile(sender, instance, created, **kwargs):
    if created and instance.role == 'STUDENT':
        StudentProfile.objects.create(user=instance)

class StudentProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    Status = models.BooleanField(default=False, null=True, blank=True)
    Is_Leader = models.BooleanField(default=False, null=True, blank=True)
    Major = models.CharField(max_length=2, null=True, blank=True)
    Gender = models.CharField(
        default="none", choices=[("MALE", "Male"), ("FEMALE", "Female")]
    )


class SupervisorManager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        result = super().get_queryset(*args, **kwargs)
        return result.filter(role=User.Role.SUPERVISOR)


class Supervisor(User):
    base_role = User.Role.SUPERVISOR

    supervisor = SupervisorManager()

    class Meta:
        proxy = True

    def welcome(self):
        return "only for SUPERVISORs"
    
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created and instance.role == 'SUPERVISOR':
        SupervisorProfile.objects.create(user=instance)

class SupervisorProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    Status = models.BooleanField(default=False, null=True, blank=True) #is free to receive projects or not

    Major = models.CharField(max_length=2, null=True, blank=True)
    Supervisor_For = models.CharField(
        default="none", choices=[("MALE", "Male"), ("FEMALE", "Female"), ('MALE_FEMALE', 'Male_Female')]
    )
