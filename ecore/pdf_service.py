from io import BytesIO
from django.template.loader import get_template
from xhtml2pdf import pisa
from eventico import settings

TEMPLATES_PATH_INDEX = {
    'CONFIRM_BOOKING' : '/templates/email_templates/booking/confirm_booking',
}

class PdfService():

    def generatePdf(self, context={}, type=''):
        if(type != ''):
            template = get_template(settings.BASE_DIR + TEMPLATES_PATH_INDEX[type])
            html = template.render(context)
            result = BytesIO()
            pdf = pisa.pisaDocument(BytesIO(html.encode("ISO-8859-1")), result)
        else:
            raise PdfServiceException('INVALID PDF TYPE')
        return pdf


class PdfServiceException(Exception):
    def __init__(self, message, errors):
        super().__init__(message)
        self.errors = errors


