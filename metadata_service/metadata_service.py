EVENT_METADATA = 'EVENT_METADATA'
INDEX = 'index'
class MetadataService():
    def __init__(self, metadata_key, input):
        self.metadata_key = metadata_key  # public
        self.input = input

    def fetch_event_meta_data(self):
        return {'title': 'Sample title', 'desc': 'description', 'image_url': 'https://algovent-s3-static.s3.amazonaws.com/eventico/media/Code_data_P0UNmn7.jpg'}

    def fetch_index_meta_data(self):
        return {'title': 'Sample title', 'desc': 'description', 'image_url': 'https://algovent-s3-static.s3.amazonaws.com/eventico/media/Code_data_P0UNmn7.jpg'}

    def fetch_metadata_details(self, metadata_key, input):
        metadata_details = {}
        if(metadata_key == EVENT_METADATA):
            metadata_details = self.fetch_event_meta_data(input)
        elif(metadata_key == INDEX):
            metadata_details = self.fetch_index_meta_data(input)
        return metadata_details
