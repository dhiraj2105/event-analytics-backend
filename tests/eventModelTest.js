import eventModel from "../models/event.model.js";
import { v4 as uuidv4 } from "uuid";

const testEvent = new eventModel({
  event_id: uuidv4(),
  user_id: "test-user-1",
  event_type: "click",
  payload: {
    element_id: "submit-button",
    text: "Submit",
    xpath: "#submit",
  },
});

testEvent
  .save()
  .then(() => console.log("🧪 Test event inserted into DB"))
  .catch((err) => console.error("❌ Error inserting test event:", err.message));
