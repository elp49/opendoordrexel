import Month from '../shared/Month';

export type EventModel = {
  month: Month;
  year: number;
  details: string;
};

type TimelineModel = {
  eventList: EventModel[];
};

export default TimelineModel;
