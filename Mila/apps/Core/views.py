from django.shortcuts import render
from django.core.mail import send_mail 
from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from django.template.loader import render_to_string
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
def home(request):
	return render(request, 'Core/home.html')

def about(request):
	return render(request, "Core/about.html")

@api_view(['POST'])
def message(request): 
	try:
		if len(request.data.get('email')) == 0 or len(request.data.get('message')) == 0:
			return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
		subject, from_email, recipient_list = request.data.get('subject'), settings.EMAIL_HOST_USER, ['soymilaortiz@gmail.com']
		text_content = 'This is an important message.'
		html_content = render_to_string('core/email.html',{'data':request.data})
		msg = EmailMultiAlternatives(subject, text_content, from_email, recipient_list)
		msg.attach_alternative(html_content, "text/html")
		msg.send()
		text_content = 'This is an important message.'
		html_content = render_to_string('core/email.html',{'data':request.data})
		subject,recipient_list = 'Copia De Tu Mensaje A Milagros ', [request.data.get('email')]
		msg_copy = EmailMultiAlternatives(subject, text_content, from_email, recipient_list)
		msg_copy.attach_alternative(html_content, "text/html")
		msg_copy.send()
	except ValueError as e:
		return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
	except Exception as e:
		return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
	return Response({"detail": str('Mensaje Enviado Correctamente')}, status=status.HTTP_200_OK)