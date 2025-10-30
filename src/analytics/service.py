from .models import DailyStats

stats = DailyStats()

def process_event(event):
    stats.update(event)

def get_today_stats():
    return stats.get_today()

def get_week_stats():
    return stats.get_last_week()
