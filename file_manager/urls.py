from django.urls import path
from django.conf.urls import url
from .views import FileView

urlpatterns = [
    url(r'^upload/$', FileView.as_view(), name='file-upload'),
    #url(r'^delete/$', views.delete),
]