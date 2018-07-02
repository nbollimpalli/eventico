
EVENT_VENUE_SEARCH = 'ev'
EETEVL_SEARCH = 'eetevl'

class SearchService():

    def search(self, search_type, search_key = '', pagination_params = { 'offset' : 0, 'pagesize' : 10 }, autocomplete_mode = False):
        search_results = []
        if(search_type == None):
            print('invalid search param')
        else:
            print('valid search params')
        return search_results