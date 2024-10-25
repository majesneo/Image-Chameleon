import { SetMetadata } from "@nestjs/common";
import { EventTypes } from "./event-types.enum";

export const EventHandler = (eventType: EventTypes) =>
  SetMetadata("eventType", eventType);
