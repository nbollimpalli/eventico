from django.urls import path
from django.conf.urls import url
from .views import *
from . import views
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_jwt.views import refresh_jwt_token
from rest_framework_jwt.views import verify_jwt_token


urlpatterns = [
    url(r'^create/$', CreateUserAPIView.as_view()),
    url(r'^usernames/', getUserNames),
    url(r'^api-token-auth/', authenticate_user),
    url(r'^social-auth/', social_signon),
    url(r'^forgot-password/', social_signon),
    url(r'^resend-otp/', social_signon),
    url(r'^api-token-refresh/', refresh_jwt_token),
    url(r'^api-token-verify/', verify_jwt_token),
    url(r'^profile/', fetchProfile),
    url(r'^fetch-users/', fetchUsers),
    url(r'^update-manage-user/', updateManageUsers),
    path('verify-user/', verifyUser, name='verify_user'),
    path('send-otp/', send_otp, name='send_otp'),
    path('verify-otp/', verify_otp, name='verify_otp'),
    path('reset-password/', reset_password, name='reset_password'),

]