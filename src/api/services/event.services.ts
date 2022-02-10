import { EventDal } from '../../db/dal/event.dal';
import { EventInput, EventOutput } from '../../db/models/event.model';
import { IngestedCount } from '../../helpers/responses/ingested-count.response';

export class EventService {
  static async saveEvents(payload: EventInput[]): Promise<IngestedCount> {
    const inputsWithDate: any[] = payload.map((input) => ({
      ...input,
      date: new Date()
    }));

    const validatedInputForClickEvent =
      EventService._handleClickEvent(inputsWithDate);

    const validatedInputForPageViewEvent = EventService._handlePageViewEvent(
      validatedInputForClickEvent
    );

    await validatedInputForPageViewEvent.forEach(async (inputWithDate) => {
      await EventDal.create(inputWithDate);
    });
    return new IngestedCount(validatedInputForPageViewEvent.length);
  }

  private static _handleClickEvent(inputsWithDate: any[]) {
    const clickEventType = 'click';
    const maxWindowForClick = 3;
    const validatedInputForClickEvent = EventService._filterOverWindow(
      inputsWithDate,
      maxWindowForClick,
      clickEventType
    );
    return validatedInputForClickEvent;
  }

  private static _handlePageViewEvent(validatedInputForClickEvent: any[]) {
    const pageViewEventType = 'pageView';
    const maxWindowForPageView = 5;
    const validatedInputForPageViewEvent = EventService._filterOverWindow(
      validatedInputForClickEvent,
      maxWindowForPageView,
      pageViewEventType
    );
    return validatedInputForPageViewEvent;
  }

  private static _filterOverWindow(
    inputsWithDate: any[],
    maxWindow: number,
    eventType: string
  ) {
    let left = 0;
    let right = 0;
    let secondsWindow = 0;

    while (left < inputsWithDate.length) {
      const first = inputsWithDate[left];
      const second = inputsWithDate[right];
      secondsWindow =
        new Date(first?.date).getTime() - new Date(second?.date).getTime();

      if (secondsWindow <= maxWindow && right < inputsWithDate.length) {
        EventService._removeInvalidEventOverWindow(
          left,
          right,
          inputsWithDate,
          eventType
        );
        right++;
      } else if (secondsWindow > maxWindow && right < inputsWithDate.length) {
        left++;
        right++;
      } else {
        left++;
      }
    }
    const filteredInputWithoutNulls = inputsWithDate.filter((input) => !!input);
    return filteredInputWithoutNulls;
  }

  private static _removeInvalidEventOverWindow(
    left: number,
    right: number,
    inputsWithDate: any[],
    eventType: string
  ) {
    // TODO: Improve the run-time of this with the sliding window algorithm technique
    for (let i = left; i <= right; i++) {
      for (let j = i + 1; j <= right; j++) {
        if (
          inputsWithDate[i]?.user == inputsWithDate[j]?.user &&
          inputsWithDate[i]?.eventType === eventType &&
          inputsWithDate[j]?.eventType === eventType
        ) {
          inputsWithDate[j] = null;
        }
      }
    }
  }

  static async create(payload: EventInput): Promise<EventOutput> {
    return await EventDal.create(payload);
  }

  static async getAll(): Promise<EventOutput[]> {
    return await EventDal.getAll();
  }
}
