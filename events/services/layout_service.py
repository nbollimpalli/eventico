from django.contrib.contenttypes.models import ContentType
from events.models import Layout
from events.serializers import LayoutSerializer


class LayoutService():
    def upsert_layout(layout):
        objId = layout['object_id']
        model = layout['model']
        app_label = 'events'#layout['app_label']
        contentType = ContentType.objects.get(app_label=app_label, model=model)
        kclass = contentType.model_class()
        kclass_instance = kclass.objects.get(id=objId)
        layout_input = layout
        layout_input = {'layout': layout_input['layout'], 'layout_type': layout_input['layout_type'],
                        'content_object': kclass_instance, 'content_type': contentType.id, 'object_id': int(objId)}
        if ("id" in layout):
            lId = layout['id'];
            layout_object = Layout.objects.get(id=lId)
            layout_serializer = LayoutSerializer(instance=layout_object, data=layout_input)
        else:
            layout_serializer = LayoutSerializer(data=layout_input)

        if layout_serializer.is_valid():
            layout_serializer.save()
            return {'success' : True, 'layout' : layout_serializer.data}
        else:
            return {'success' : False}


    def get_layout(input):
        if(input == None):
            return None
        objId = input['object_id']
        model = input['model']
        app_label = 'events'  # layout['app_label']
        contentType = ContentType.objects.get(app_label=app_label, model=model)
        kclass = contentType.model_class()
        kclass_instance = kclass.objects.get(id=objId)
        layouts = kclass_instance.layouts.all()
        if(layouts.count() > 0):
            return layouts[0]
        return None

    def copy_layout(layout, destination_instance):
        contentType = ContentType.objects.get_for_model(destination_instance)
        layout_input = {'layout': layout.layout, 'layout_type': layout.layout_type,
                        'content_object': destination_instance, 'content_type': contentType.id, 'object_id': int(destination_instance.id)}
        layout_serializer = LayoutSerializer(data=layout_input)
        if (layout_serializer.is_valid()):
            layout_serializer.save()
            return {'sucess' : True, 'layout' : layout_serializer.data}
        else:
            return {'success': False}


    def update_default_price(layout, default_price):
        layout_json = layout.layout
        priceList = layout_json['priceList']
        if(default_price):
            for price in priceList:
                if(price['name'] == 'default'):
                    for pkey in default_price:
                        price[pkey] = default_price[pkey]
            layout.save()
            return True
        else:
            return False

    def block_seats(layout, lids):
        layout_json = layout.layout
        groups = layout_json['groups']
        for group in groups:
            for row in group['rows']:
                for col in row['cols']:
                    if(col['type'] == 'active' and col['lid'] in lids):
                        col['type'] = 'na'

        layoutSerializer = LayoutSerializer(instance=layout, data={'layout': layout_json})
        if layoutSerializer.is_valid():
            layoutSerializer.save()
            return True
        else:
            return False