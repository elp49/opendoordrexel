import TimelineModel, { EventModel } from '../../models/components/TimelineModel';
import OrderedItem from '../../models/OrderedItem';
import { Color, getThemeName, ThemeName } from '../../models/ThemedModel';
import styles from '../../styles/timeline.module.css';
import { sortByOrder } from '../../utils/utils';
import TimelineEvent from './Event';

// Events are ordered by chronologically, so their order cannot be assigned in the data.
type OrderableEvent = OrderedItem & EventModel;

type TimelineProps = {
  sectionName: string;
  model: TimelineModel;
};

const Timeline = ({ sectionName, model }: TimelineProps): JSX.Element => {
  const id = sectionName !== '' ? sectionName : 'timeline';

  const getEventList = () => {
    const isEventValid = ({ details }: EventModel) => details !== '';

    const filteredList = model.eventList.filter(isEventValid).map((event) => {
      const order = Date.parse(`01 ${event.month} ${event.year}`);
      return { ...event, order };
    });

    return sortByOrder<OrderableEvent>(filteredList);
  };

  const eventList = getEventList();
  const themeName = getThemeName(model.theme);

  return (
    <div id={`${id}Timeline`} className={`${styles.timeline} ${themeName}`}>
      <ol className={styles.eventList}>
        {eventList.map((event, i) => (
          <TimelineEvent key={`${sectionName}Event-${i}`} themeName={themeName} model={event} />
        ))}
      </ol>
      <style jsx>
        {`
          .${ThemeName.White} {
            background-color: ${Color.White};
          }
          .${ThemeName.Blue} {
            background-color: ${Color.Blue};
          }
          .${ThemeName.White} > .${styles.eventList} {
            border-left-color: ${Color.Blue};
          }
          .${ThemeName.Blue} > .${styles.eventList} {
            border-left-color: ${Color.White};
          }
        `}
      </style>
    </div>
  );
};

export default Timeline;
