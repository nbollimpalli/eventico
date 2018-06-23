from __future__ import unicode_literals
from django.db import models
from django.db import transaction
from ecore.models import Role
from django.contrib.auth.models import (
    AbstractBaseUser, PermissionsMixin, BaseUserManager
)


class UserManager(BaseUserManager):

    def _create_user(self, email, password, **extra_fields):
        """
        Creates and saves a User with the given email,and password.
        """
        if not email:
            raise ValueError('The given email must be set')
        try:
            with transaction.atomic():
                user = self.model(email=self.normalize_email(email), **extra_fields)
                user.set_password(password)
                user.save(using=self._db)
                return user
        except:
            raise Exception

    def create_user(self, email, password=None, **extra_fields):
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        return self._create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=80, unique=True, blank=False)
    name = models.CharField(max_length=255, blank=True)
    mobile = models.CharField(max_length=30, blank=True)
    role = models.ForeignKey(Role, on_delete=models.DO_NOTHING, default=1)
    status = models.CharField(max_length=255, default='pending')
    fb_pic = models.URLField(max_length=255, null=True)
    google_pic = models.URLField(max_length=255, null=True)
    user_pic = models.URLField(max_length=255, null=True)
    fb_verified = models.BooleanField(default=False)
    google_verified = models.BooleanField(default=False)
    otp = models.CharField(max_length=10, null=True)
    otp_created_at = models.DateTimeField(null=True)
    otp_expires_at = models.DateTimeField(null=True)
    otps_sent = models.IntegerField(default=0)
    otp_limit_start_time = models.DateTimeField(null=True)
    otp_limit_end_time = models.DateTimeField(null=True)
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def save(self, *args, **kwargs):
        super(User, self).save(*args, **kwargs)
        return self