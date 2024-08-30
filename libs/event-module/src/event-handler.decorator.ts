import { SetMetadata } from '@nestjs/common';
import { EventTypes } from './event-types.enum';

export const EventHandler = (eventType: EventTypes): MethodDecorator => {
  return (target, propertyKey, descriptor) => {
    SetMetadata('eventType', eventType)(target, propertyKey, descriptor);
  };
};
