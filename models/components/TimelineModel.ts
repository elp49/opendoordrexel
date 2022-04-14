import { Month } from '../shared';
import ThemedModel from '../ThemedModel';

export type EventModel = {
  month: Month;
  year: number;
  details: string;
};

type TimelineModel = ThemedModel & {
  eventList: EventModel[];
};

export default TimelineModel;
