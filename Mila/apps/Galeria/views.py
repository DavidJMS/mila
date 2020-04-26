from django.shortcuts import render, redirect
from django.core.mail import EmailMessage
from django.http import HttpResponse
from .models import *
# Create your views here.
def galery(request):
	images = Image.objects.all()
	categories = Category.objects.all()
	return render(request, 'Galery/galeria.html', {'images':images,'categories':categories})
