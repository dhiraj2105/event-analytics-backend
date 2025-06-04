import mongoose from "mongoose";

const payloadSchema = new mongoose.Schema({}, { strict: false });

const eventSchema = new mongoose.Schema({
  event_id: {
    type: String,
    required: true,
    unique: true,
  },
  user_id: {
    type: String,
    required: true,
    index: true,
  },
  event_type: {
    type: String,
    required: true,
    enum: ["view", "click", "location"],
    index: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
    index: true,
  },
  payload: {
    type: payloadSchema,
    required: true,
  },
});

const eventModel = mongoose.model("Event", eventSchema);
export default eventModel;
