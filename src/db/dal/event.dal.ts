import { Event, EventInput, EventOutput } from '../models/event.model';

export class EventDal {
  static async create(payload: EventInput): Promise<EventOutput> {
    const event = await Event.create(payload);
    return event;
  }

  static async getAll(): Promise<EventOutput[]> {
    return Event.findAll();
  }
}
