# Web Analytics Event Service

A backend service that collects user interaction events (view, click, location), stores them in MongoDB, and provides real-time analytics APIs.

---

## 📦 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Validation**: Custom validator
- **Data Generator**: Faker.js

---

## 🚀 Setup Instructions

1. Clone this repo:

   ```bash
   git clone <your-repo-url>
   cd analytics-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a .env file:

   ```ini
   MONGO_URI=<your-mongodb-uri>
   PORT=5000
   ```

   Run the backend server:

   ```bash
   npm run dev
   ```

   (Optional) Generate test data:

   ```bash
   node data/generateEvents.js
   ```

📊 API Documentation
🔹 POST /events
Receive a user event.

Body Example:

````json
{
  "user_id": "abc123",
  "event_type": "view",
  "payload": {
    "url": "https://example.com",
    "title": "Welcome Page"
  }
}
✅ 202 Accepted | ❌ 400 Bad Request | ❌ 500 Internal Server Error

🔹 GET /analytics/event-counts
Returns total event count.

Query Parameters (optional):

event_type=view

start_date=2025-05-01

end_date=2025-05-29

Response:

```json
{ "total_events": 1234 }
````

🔹 GET /analytics/event-counts-by-type
Returns count grouped by event type.

Response:

```json
{
  "view": 700,
  "click": 300,
  "location": 50
}
```

## 🛠️ Folder Structure

```
analytics-backend/
├── server.js
├── .env
├── models/
├── controllers/
├── routes/
├── utils/
├── data/
└── README.md



👨‍💻 Author
Name: Dhiraj Kumar (Backend Intern Assignment – FAYM)

---
```
