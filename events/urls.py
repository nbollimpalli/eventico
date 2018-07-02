from django.urls import path
from django.conf.urls import url
from . import views


urlpatterns = [
    path('', views.index, name='index'),
    url(r'^eventvenue/upsert/$', views.upsert_event_venue),
    url(r'^eventprice/upsert/$', views.upsert_event_price),
    url(r'^eventtype/upsert/$', views.upsert_event_type),
    url(r'^event/upsert/$', views.upsert_event),
    url(r'^events/$', views.get_events),
    url(r'^event/$', views.get_event),
    url(r'^eventtypes/$', views.get_event_types),
    url(r'^eventvenues/$', views.get_event_venues),
    url(r'^eventpricelist/$', views.get_event_pricelists),
    url(r'^eventvenue/$', views.get_event_venue),
    url(r'^layout/upsert/$', views.upsert_layout),
]