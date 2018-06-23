import urllib3
import json
from rest_framework import status

class RestManager():
    http = urllib3.PoolManager()

    def get(self, request_data, url):
        response = {}
        print(request_data)
        print(url)
        if(request_data and url):
            response = self.http.request('GET', url, fields=request_data)
            print('----------')
            print(response)
            print('----------')
            if(response.status == status.HTTP_200_OK):
                response = json.loads(response.data.decode('utf-8'))
            print(response)
        return response

    def post(self):
        return