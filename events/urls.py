from django.urls import path
from django.conf.urls import url
from . import views


urlpatterns = [
    path('', views.index, name='index'),
    url(r'^eventvenue/create/$', views.create_event_venue),
    url(r'^eventvenue/update/$', views.update_event_venue),
    url(r'^eventprice/create/$', views.create_event_price),
    url(r'^eventtype/create/$', views.create_event_type),
    url(r'^event/create/$', views.create_event),
    url(r'^event/update/$', views.update_event),
    url(r'^events/$', views.get_events),
    url(r'^eventtypes/$', views.get_event_types),
    url(r'^eventvenues/$', views.get_event_venues),
    url(r'^eventpricelist/$', views.get_event_pricelists),
    url(r'^eventvenue/$', views.get_event_venue),
    url(r'^layout/upsert/$', views.upsert_layout),
]