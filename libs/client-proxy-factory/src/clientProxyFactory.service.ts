import { Injectable } from "@nestjs/common";
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";
import { ClientProxyFactoryI } from "./clientProxyFactory.interface";
import { EventQueue } from "event-module";

@Injectable()
export class ClientProxyFactoryService implements ClientProxyFactoryI {
  constructor(private readonly configService: ConfigService) {}

  createClient(eventQueue: EventQueue): ClientProxy {
    const amqpUrl =
      this.configService.get("AMQP_URL") ||
      "amqp://rabbitmq:rabbitmq@localhost:5672";

    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [amqpUrl],
        queue: eventQueue,
        queueOptions: {
          durable: true,
        },
      },
    });
  }
}
