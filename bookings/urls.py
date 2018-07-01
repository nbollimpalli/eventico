from django.urls import path
from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^book/$', views.book),
    url(r'^pay/$', views.pay),
    url(r'^success/$', views.success),
    url(r'^failure/$', views.failure),
]