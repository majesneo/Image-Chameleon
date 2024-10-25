import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CLIENT_PROXY } from "./constants";
import { ClientProxySendEventService } from "./clientProxySendEvent.service";
import { ClientProxyFactoryService } from "./clientProxyFactory.service";

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    { provide: CLIENT_PROXY, useClass: ClientProxySendEventService },
    ClientProxyFactoryService,
  ],
  exports: [CLIENT_PROXY],
})
export class ClientProxyFactoryModule {}
