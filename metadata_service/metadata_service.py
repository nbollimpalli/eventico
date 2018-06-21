EVENT_METADATA = 'EVENT_METADATA'
INDEX = 'index'
from events.models import Event
from events.serializers import EventSerializer
class MetadataService():
    def __init__(self, metadata_key, input, user_agent):
        self.metadata_key = metadata_key  # public
        self.input = input
        self.user_agent = user_agent

    def fetch_event_meta_data(self):
        event_id = self.input['event_id']
        event_object = Event.objects.get(id=event_id)
        eventSerializer = EventSerializer(instance=event_object)
        event_data = eventSerializer.data
        print(event_data)
        return {'title': event_data['name'], 'desc': event_data['desc'], 'image_url': 'https://algovent-s3-static.s3.amazonaws.com/eventico/media/Code_data_P0UNmn7.jpg'}

    def fetch_default_meta_data(self):
        return {'title': 'Sample title', 'desc': 'description', 'image_url': 'https://algovent-s3-static.s3.amazonaws.com/eventico/media/Code_data_P0UNmn7.jpg'}

    def fetch_metadata_details(self):
        metadata_details = {}
        bots = ['Facebot', 'Twitterbot']
        if(self.metadata_key == EVENT_METADATA and self.input and self.user_agent in bots):
            metadata_details = self.fetch_event_meta_data()
        else:
            metadata_details = self.fetch_default_meta_data()
        return metadata_details
