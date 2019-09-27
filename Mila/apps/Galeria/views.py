from django.shortcuts import render, redirect
from django.core.mail import EmailMessage
from django.http import HttpResponse
# Create your views here.
def Inicio(request):
	return render(request, 'Inicio/index.html')
