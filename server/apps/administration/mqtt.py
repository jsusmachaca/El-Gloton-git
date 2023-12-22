import paho.mqtt.client as mqtt
from django.conf import settings
from .models import Product
import re

def on_connect(client, userdata, flags, rc):
    client.subscribe("esp/gloton")

def on_message(client, userdata, msg):
    mqtt_data = re.split(r'\s*\| \s*|\s*t: \s*|\s*w: \s*', msg.payload.decode())
    data = Product.objects.filter(name=mqtt_data[0]).first()
    data.temperature = mqtt_data[2]
    data.weight = mqtt_data[3]
    data.save()

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
client.connect(settings.MQTT_BROKER_ADDRESS, settings.MQTT_BROKER_PORT, 60)

client.loop_start()
