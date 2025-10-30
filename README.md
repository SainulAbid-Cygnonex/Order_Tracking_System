# Order Analytics Microservice - Python FastAPI

## Overview

This microservice listens to Redis order events and maintains daily & weekly analytics, exposing these stats via FastAPI REST endpoints.

---

## Technologies

- Python 3.11+
- FastAPI framework
- Redis for Pub/Sub messaging
- MongoDB for data storage
- python-dotenv for environment settings
- Uvicorn ASGI server

---

## Folder Structure

```
python-analytics/
├── src/
│   ├── analytics/
│   ├── db/
│   ├── redis/
│   ├── main.py
├── requirements.txt
├── Dockerfile
├── docker-compose.yml
├── .env
```

---

## Setup & Run

1. Navigate into `Python`
2. Create and activate virtual environment:

```
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

3. Install dependencies:

```
pip install -r requirements.txt
```

4. Create `.env` file with:

```
MONGO_URI=your_mongodb_connection_string
REDIS_URI=redis://localhost:6379/0
```

5. Run the FastAPI app:

```
uvicorn src.main:app --reload
```

---

## API Endpoints

- `GET /analytics/daily` — Get today's order analytics
- `GET /analytics/weekly` — Get last 7 days order analytics

---

## Workflow

- Subscribes to Redis channel `order-events`.
- Updates in-memory daily statistics on receiving events.
- Provides aggregated analytics data through REST APIs.

---

## Testing

- Use browser or tools like Postman to verify analytics endpoints.
- Confirm events propagate through Redis from Node.js service.

---

## License

MIT License


