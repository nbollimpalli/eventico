from ecore.models import Payment
from django.contrib.contenttypes.models import ContentType
import hashlib
from .config import *
from .constants import *
class PaymentService():
    payment = None
    def create_new_payment(self, object, payment_info):
        payment = Payment()
        payment.object_id = object.id
        payment.content_type = ContentType.objects.get_for_model(object)
        payment.type = payment_info['type']
        payment.mode = payment_info['mode']
        payment.amount = object.total
        payment.save()
        self.payment = payment
        if(payment.mode == 'payu'):
            res = self.load_payu_info(payment_info)
        return res

    def load_payu_info(self, payment_info):
        posted = {}
        posted['action'] = PAYMENT_URL_LIVE
        posted['key'] = KEY
        posted['amount'] = float(self.payment.amount)
        posted['productinfo'] = payment_info['productinfo']
        posted['firstname'] = payment_info['name']
        posted['email'] = payment_info['email']
        posted['phone'] = payment_info['phone']
        posted['surl'] = PAYMENT_SUCCESS_URL
        posted['furl'] = PAYMENT_FAILURE_URL
        posted['txnid'] = self.payment.txn_id
        hashSequence = "key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5|udf6|udf7|udf8|udf9|udf10"
        hash_string = ''
        hashVarsSeq = hashSequence.split('|')
        for i in hashVarsSeq:
            print(i)
            try:
                hash_string += str(posted[i])
                print(str(posted[i]))
            except Exception:
                hash_string += ''
            hash_string += '|'
        hash_string += SALT
        posted['amount'] = str(posted['amount'])
        print(hash_string)
        hash_string = hash_string.encode('utf-8')
        hash_val = hashlib.sha512(hash_string).hexdigest().lower()
        posted['hash'] = hash_val


        return posted