from fastapi import APIRouter
from .service import get_today_stats, get_week_stats

router = APIRouter()

@router.get("/analytics/daily")
def daily_stats():
    return get_today_stats()

@router.get("/analytics/weekly")
def weekly_stats():
    return get_week_stats()
