from fastapi import FastAPI
from src.analytics.router import router as analytics_router
from src.redis.subscriber import start_listener

app = FastAPI(title="Order Analytics Microservice")
app.include_router(analytics_router)
start_listener()
