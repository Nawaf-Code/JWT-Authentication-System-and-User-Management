from gpms import settings
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
from email.mime.image import MIMEImage

@csrf_exempt
def send_otp(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        userEmail = data.get('email')
        code = "246810"
        to_email = userEmail
        email_subject = "Your verification code"

        # Load the email template
        message = render_to_string('emailTemplates/otp.html', {
            'otp': code
        })

        email = EmailMessage(email_subject, message, settings.EMAIL_HOST_USER, [to_email])
        email.fail_silently = True
        email.content_subtype = 'html'

        # Open the logo file in binary mode
        with open(settings.MEDIA_ROOT+'/collegelogo2.353feb3d15c484346d8f.png', 'rb') as img:
            logo_img = MIMEImage(img.read())

        # Define the image's ID (used in the src attribute in the HTML)
        logo_img.add_header('Content-ID', '<logo>')

        # Attach the image
        email.attach(logo_img)

        email.send()
        return JsonResponse({"message": "Email has been sent."})
    else:
        return JsonResponse({'error': 'Invalid request'}, status=400)

