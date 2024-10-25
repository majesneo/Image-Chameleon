import { ClientProxy } from "@nestjs/microservices";
import { EventQueue } from "event-module";

export interface ClientProxyFactoryI {
  createClient(eventQueue: EventQueue): ClientProxy;
}
