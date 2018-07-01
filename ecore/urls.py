from django.urls import path
from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^seed-permissions/$', views.seed_permissions),
    url(r'^fetch_roles/$', views.fetch_roles),
    url(r'upsert-role/', views.upsert_role_permission),
]