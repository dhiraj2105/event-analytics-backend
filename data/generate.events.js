/**
 * Connects to MongoDB
 * Generates random event_type
 * Builds appropriate payload
 * Adds UUID + timestamp
 * Saves them in bulk
 * 📊 Event Distribution Strategy
 * We'll generate:
 * ~60% view
 * ~30% click
 * ~10% location
 * Timestamps will be randomly distributed across a date range, e.g., 2025-05-01 to 2025-05-30
*/

// data/generateEvents.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import eventModel from '../models/event.model.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/analyticsdb';

// Helper to get a random date in a range
function getRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Generate a single fake event object
function generateFakeEvent() {
    const eventTypes = ['view', 'click', 'location'];
    const event_type = faker.helpers.weightedArrayElement([
        { value: 'view', weight: 6 },
        { value: 'click', weight: 3 },
        { value: 'location', weight: 1 },
    ]);

    const payload = {};
    switch (event_type) {
        case 'view':
            payload.url = faker.internet.url();
            payload.title = faker.lorem.sentence(3);
            break;
        case 'click':
            if (faker.datatype.boolean()) payload.element_id = faker.string.alphanumeric(10);
            if (faker.datatype.boolean()) payload.text = faker.word.words(2);
            if (faker.datatype.boolean()) payload.xpath = `#${faker.word.words(1)}`;
            break;
        case 'location':
            payload.latitude = parseFloat(faker.location.latitude());
            payload.longitude = parseFloat(faker.location.longitude());
            if (faker.datatype.boolean()) payload.accuracy = faker.number.float({ min: 5, max: 100, precision: 0.1 });
            break;
    }

    return {
        event_id: uuidv4(),
        user_id: faker.string.alphanumeric(12),
        event_type,
        timestamp: getRandomDate(new Date('2025-05-01'), new Date('2025-05-30')),
        payload,
    };
}

async function generateAndInsertEvents() {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Connected to MongoDB for event generation');

        const total = faker.number.int({ min: 1000, max: 5000 });
        const events = [];

        for (let i = 0; i < total; i++) {
            events.push(generateFakeEvent());
        }

        await eventModel.insertMany(events);
        console.log(`✅ Successfully inserted ${total} fake events into MongoDB`);

        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
    } catch (err) {
        console.error('❌ Error during data generation:', err);
        process.exit(1);
    }
}

generateAndInsertEvents();
