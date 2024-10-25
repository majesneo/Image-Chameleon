import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { ClientProxyFactoryI } from "./clientProxyFactory.interface";
import { EventQueue, EventTypes } from "event-module";
import { ClientProxySendEventI } from "./clientProxySendEvent.interface";
import { ClientProxyFactoryService } from "./clientProxyFactory.service";

@Injectable()
export class ClientProxySendEventService implements ClientProxySendEventI {
  private client: ClientProxy | undefined;

  constructor(
    @Inject(ClientProxyFactoryService)
    private readonly clientProxyFactoryService: ClientProxyFactoryI,
  ) {}

  async sendEvent<D, R>(
    event: EventTypes,
    eventQueue: EventQueue,
    dto: D,
  ): Promise<R> {
    this.client = this.clientProxyFactoryService.createClient(eventQueue);
    return await firstValueFrom(this.client.send(event, dto));
  }
}
