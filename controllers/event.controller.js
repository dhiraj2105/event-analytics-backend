import EventModel from "../models/event.model.js";
import { v4 as uuidv4 } from "uuid";
import { validateEventData } from "../utils/validate.event.js";

/**
 * Handles an incoming request to create a new event.
 * The request body should contain user_id, event_type and payload.
 * Validates the input and creates a new event document in the database.
 * Returns a 201 response with a success message if the event is created successfully.
 * Returns a 400 response with an error message if the input is invalid.
 * Returns a 500 response with an error message if there is a server error.
 */
export const createEvent = async (req, res) => {
    try {
        const { user_id, event_type, payload } = req.body;

        // validate input
        const error = validateEventData(user_id, event_type, payload);
        if (error) {
            return res.status(400).json({ error });
        }

        // create and save event
        const event = new EventModel({
            event_id: uuidv4(),
            user_id,
            event_type,
            payload,
            timestamp: new Date()
        });
        await event.save();
        return res.status(201).json({ message: "Event created successfully" });
    } catch (error) {
        console.error("Error creating event:", error);
        return res.status(500).json({ error: "Failed to create event" });
    }
}

/**
 * Handles an incoming request to get the count of events.
 * The request query should contain event_type and optional start_date and end_date.
 * Validates the input and returns the count of events in the database.
 * Returns a 200 response with the count of events if the request is successful.
 * Returns a 400 response with an error message if the input is invalid.
 * Returns a 500 response with an error message if there is a server error.
 */
export async function getEventCount(req, res) {
    try {
        const { event_type, start_date, end_date } = req.query;
        const filter = {};

        // add filters if provided
        if (event_type) {
            filter.event_type = event_type;
        }

        if (start_date || end_date) {
            filter.timestamp = {};
            if (start_date) filter.timestamp.$gte = new Date(start_date);
            if (end_date) filter.timestamp.$lte = new Date(end_date);
        }
        const count = await EventModel.countDocuments(filter);
        res.status(200).json({
            total_events: count
        })
    } catch (error) {
        console.error('Failed to get event count: ', error.message);
        return res.status(500).json({ error: "Failed to get event count" });
    }
}

/**
 * Handles an incoming request to get the count of events by type.
 * The request query should contain optional start_date and end_date.
 * Validates the input and returns the count of events in the database.
 * Returns a 200 response with the count of events if the request is successful.
 * Returns a 400 response with an error message if the input is invalid.
 * Returns a 500 response with an error message if there is a server error.
 */
export async function getEventCountByType(req, res) {
    try {
        const { start_date, end_date } = req.query;
        const match = {};

        if (start_date || end_date) {
            match.timestamp = {};
            if (start_date) match.timestamp.$gte = new Date(start_date);
            if (end_date) match.timestamp.$lte = new Date(end_date);
        }

        const results = await EventModel.aggregate([
            {
                $match: match
            },
            {
                $group: {
                    _id: "$event_type",
                    count: { $sum: 1 }
                }
            }
        ])
        const response = {};
        results.forEach(result =>{
            response[result._id] = result.count;
        })
        res.status(200).json(response)
    } catch (error) {
        console.error('Failed to get event count by type: ', error.message);
        return res.status(500).json({ error: "Failed to get event count by type" });
    }
}