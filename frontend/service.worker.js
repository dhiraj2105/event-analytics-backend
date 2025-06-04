// frontend/service-worker.js

self.addEventListener('install', event => {
    console.log('📦 Service Worker installed');
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    console.log('🚀 Service Worker activated');
});

self.addEventListener('message', async event => {
    const event_type = event.data?.type;
    const payload = event.data?.payload;

    if (!event_type || !payload) return;

    const data = {
        user_id: 'demo-user-' + Math.floor(Math.random() * 1000),
        event_type,
        payload
    };

    try {
        const res = await fetch('http://localhost:5000/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            console.log(`✅ Sent ${event_type} event`);
        } else {
            console.error('❌ Failed to send event:', res.status);
        }
    } catch (err) {
        console.error('❌ Fetch error:', err.message);
    }
});
