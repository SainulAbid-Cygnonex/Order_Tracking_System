from datetime import datetime, timedelta

class DailyStats:
    def __init__(self):
        self.stats = {}

    def update(self, event):
        date_str = datetime.now().strftime('%Y-%m-%d')
        if date_str not in self.stats:
            self.stats[date_str] = {'new_order': 0, 'order_updated': 0}
        self.stats[date_str][event['type']] += 1

    def get_today(self):
        date_str = datetime.now().strftime('%Y-%m-%d')
        return self.stats.get(date_str, {'new_order': 0, 'order_updated': 0})

    def get_last_week(self):
        today = datetime.now()
        result = []
        for i in range(7):
            day = (today - timedelta(days=i)).strftime('%Y-%m-%d')
            result.append({day: self.stats.get(day, {'new_order': 0, 'order_updated': 0})})
        return result
