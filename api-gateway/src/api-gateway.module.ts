import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ConfigModule } from '@nestjs/config';
import { ApiGatewayService } from './api-gateway.service';
import { ClientProxyFactoryModule } from 'client-proxy-factory';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env',
    }),
    ClientProxyFactoryModule,
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
