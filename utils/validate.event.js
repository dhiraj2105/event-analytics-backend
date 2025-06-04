export function validateEventData(user_id, event_type, payload) {
  if (!user_id || typeof user_id != "string") {
    return "Invalid or missing user_id";
  }

  const allowedTypes = ["view", "click", "location"];
  if (!allowedTypes.includes(event_type)) {
    return "Invalid event_type";
  }
  
  if(typeof payload !== "object" || payload === null){
    return "Missing or Invalid payload";
  }

  // checking fields based on types
  switch(event_type){
    case 'view':
      if(!payload.url || typeof payload.url !== "string"){
        return "Missing or Invalid url in payload for view event";
      }
      break;
      case 'click':
        if (!payload.element_id && !payload.text && !payload.xpath) {
          return 'Payload for click must have at least one of: element_id, text, xpath';
        }
        break;
        case 'location':
      if (
        typeof payload.latitude !== 'number' ||
        typeof payload.longitude !== 'number' ||
        payload.latitude < -90 || payload.latitude > 90 ||
        payload.longitude < -180 || payload.longitude > 180
      ) {
        return 'Invalid latitude or longitude in location payload';
      }
      break;
  }

  return null;  // no validation errors

}
