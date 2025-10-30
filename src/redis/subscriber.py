import os
import redis
import threading
import json
from dotenv import load_dotenv
from src.analytics.service import process_event

load_dotenv()
def listen_for_events():
    redis_uri = os.getenv("REDIS_URI")
    r = redis.from_url(redis_uri)
    pubsub = r.pubsub()
    pubsub.subscribe('order-events')
    for message in pubsub.listen():
        if message and message['type'] == 'message':
            event = json.loads(message['data'])
            process_event(event)

def start_listener():
    threading.Thread(target=listen_for_events, daemon=True).start()
