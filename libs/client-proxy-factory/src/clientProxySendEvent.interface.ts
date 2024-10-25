import { EventQueue, EventTypes } from "event-module";

export interface ClientProxySendEventI {
  sendEvent<D, R>(
    event: EventTypes,
    eventQueue: EventQueue,
    dto: D,
  ): Promise<R>;
}
