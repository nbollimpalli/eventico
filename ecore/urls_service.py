from django.urls import reverse
from django.http import HttpRequest

def ecore_reverse(viewname, params, reverse_complete_url, request):
    url = reverse(viewname)
    if(reverse_complete_url == True):
        url = request.build_absolute_uri(url)
    if(params != None):
        params_string = ''
        for key in params:
            val = params[key]
            if(params_string == ''):
                params_string = params_string + '?'+key+'='+str(val)
            else:
                params_string = params_string + '&'+key+'='+str(val)
        url = url + params_string
    return url

