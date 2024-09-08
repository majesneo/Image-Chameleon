import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Message } from 'amqplib';

export const ReplyTo = createParamDecorator<string>(
  (data: unknown, ctx: ExecutionContext): string => {
    const message = ctx.switchToRpc().getData() as Message;
    return message.properties.replyTo;
  },
);

export const CorrelationId = createParamDecorator<string>(
  (data: unknown, ctx: ExecutionContext): string => {
    const message = ctx.switchToRpc().getData() as Message;
    return message.properties.correlationId;
  },
);
