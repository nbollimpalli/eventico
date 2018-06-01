from django.urls import path
from django.conf.urls import url
from . import views


urlpatterns = [
    path('', views.index, name='index'),
    url(r'^eventtype/create/$', views.create_event_type),
    url(r'^event/create/$', views.create_event),
    url(r'^events$', views.get_events),
    url(r'^eventtypes/$', views.get_event_types),
]