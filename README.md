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

    ``` ini
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

```json
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
```
🔹 GET /analytics/event-counts-by-type
Returns count grouped by event type.

Response:

```json
{
  "view": 700,
  "click": 300,
  "location": 50
}

🛠️ Folder Structure

analytics-backend/
├── app.js
├── .env
├── models/
├── controllers/
├── routes/
├── utils/
├── data/
└── README.md

💡 Future Improvements
Use Redis/MQ for async ingestion

Add user authentication

Caching for aggregated data

Export reports as CSV/PDF

Real-time dashboard

👨‍💻 Author
Name: Dhiraj Kumar (Backend Intern Assignment – FAYM)

---

✅ Now your backend project is complete, production-ready, and submission-worthy!

---

## ✅ OPTIONAL BONUS (If You Want to Do It)

If you want to build a **basic frontend to send test events**, I can help you create:
- `index.html`
- `service-worker.js`

Just say **“help me with frontend demo”** and I’ll do it.

---

Let me know if:
- You want to **review/optimize anything**
- You want to **test on cloud** (e.g., Render, Railway)
- You want the **full zipped template**

You're now ready to submit 🚀  
Let me know how else I can support!