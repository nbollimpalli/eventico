from django.core.mail import send_mail, EmailMultiAlternatives
from django.template.loader import get_template
from eventico import settings
from django.utils import timezone
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from io import BytesIO
import threading

TEMPLATES_PATH_INDEX = {
    'SIGNUP' : '/templates/email_templates/users/signup',
    'FORGOT_PWD_OTP' : '/templates/email_templates/users/otp',
    'SUBSCRIBE' : '/templates/email_templates/users/subscribe',
    'UNSUBSCRIBE' : '/templates/email_templates/users/unsubscribe',
    'CONFIRM_BOOKING' : '/templates/email_templates/booking/confirm_booking',
}

PDF_TEMPLATES = {
    'CONFIRM_BOOKING' : ''
}

STR_MESSAGE = 'message'

def generate_booking_confirmation_pdf():
    y = 700
    buffer = BytesIO()
    p = canvas.Canvas(buffer, pagesize=letter)
    p.setFont('Helvetica', 10)
    p.drawString(220, y, "PDF generate at " + timezone.now().strftime('%Y-%b-%d'))
    p.showPage()
    p.save()
    pdf = buffer.getvalue()
    buffer.close()
    return pdf

class MailService(threading.Thread):
    template_key=None
    subject=None
    recipient_list=None
    from_email=None
    context={}
    attachments = [
        # {
        #     'name':'',
        #     'attachment_object' : '',
        #     'type' : ''
        # }
    ]

    def __init__(self, input = {}):
        self.template_key =  input['template_key'];
        self.recipient_list = input['to_email'];
        self.subject = input['subject'];
        self.context = {} if input['context'] == None else input['context']
        threading.Thread.__init__(self)

    def render_template(self, input_dict):
        return True

    def update_subject(self, input_dict):
        return True

    def add_attachments(self, contexts=[]):
        for context in contexts:
            type = context[type]
            if(type == 'booking_confirmation'):
                generate_booking_confirmation_pdf(context)
        return True

    def send_email(self):
        res = False;
        messages = ['Successfully sent email']
        #try:
        with open(settings.BASE_DIR + TEMPLATES_PATH_INDEX[self.template_key]+'.txt') as f:
            body = f.read()
        html_body = get_template(settings.BASE_DIR + TEMPLATES_PATH_INDEX[self.template_key]+'.html').render(context=self.context)
        email = EmailMultiAlternatives(subject=self.subject, body=body, from_email=settings.EMAIL_HOST_USER, to=self.recipient_list)
        for attachment in self.attachments:
            email.attach(attachment['name'], attachment['object'], attachment['type'])
        email.attach_alternative(html_body, 'text/html')
        email.send()
        res = True
        # except EmailServiceException as e:
        #     res = False
        # except Exception as e:
        #     res = False
        #     messages = ['Sending email failed due to unknown error']
        # finally:
        #     res = False
        return {'success' : res, STR_MESSAGE : messages}

    def run(self):
        self.send_email()

def send_async_mail(input):
    MailService(input).start()



class EmailServiceException(Exception):
    def __init__(self, message, errors):
        super().__init__(message)
        self.errors = errors