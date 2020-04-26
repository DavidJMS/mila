from django.urls import path
from apps.Galeria.views import *

urlpatterns = [
    path('', galery, name='galery'),
]