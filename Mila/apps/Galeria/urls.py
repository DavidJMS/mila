from django.urls import path
from apps.Galeria.views import Inicio

urlpatterns = [
    path('', Inicio, name='Inicio'),
]