import { Module } from '@nestjs/common';
import { CommentsModule } from '../modules/books_comments/books-comments.module';
import { EventsGateway } from './events.gateway';

@Module({
  imports: [CommentsModule],
  providers: [EventsGateway],
})
export class EventsModule {}
