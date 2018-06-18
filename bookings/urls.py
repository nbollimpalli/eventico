from django.urls import path
from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^skip-and-book/$', views.skip_and_book),
]