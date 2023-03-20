import { Module } from '@nestjs/common';
import { EventsGateway } from '../socket/event.gateway';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
@Module({
  imports: [InMemoryDBModule],
  providers: [EventsGateway],
})
export class EventsModule {}
