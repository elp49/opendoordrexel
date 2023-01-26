import TimelineModel, { EventModel } from '../../models/components/TimelineModel';
import OrderedItem from '../../models/shared/OrderedItem';
import { Color, getThemeName, Theme, ThemeName } from '../../models/shared/ThemedModel';
import styles from '../../styles/timeline.module.css';
import { sortByOrder } from '../../utils/utils';
import TimelineEvent from './Event';

// Events are ordered by chronologically, so their order cannot be assigned in the data.
type OrderableEvent = OrderedItem & EventModel;

type TimelineProps = {
  id: string;
  theme: Theme;
  model: TimelineModel;
};

const Timeline = ({ id, theme, model }: TimelineProps): JSX.Element => {
  const getEventList = () => {
    const isEventValid = ({ details }: EventModel) => details !== '';

    const filteredList = model.eventList.filter(isEventValid).map((event) => {
      const order = Date.parse(`01 ${event.month} ${event.year}`);
      return { ...event, order };
    });

    return sortByOrder<OrderableEvent>(filteredList);
  };

  const eventList = getEventList();
  const themeName = getThemeName(theme);

  return (
    <div id={id} className={`${styles.timeline} ${themeName}`}>
      <ol className={styles.eventList}>
        {eventList.map((event, i) => (
          <TimelineEvent key={`${id}Event${i}`} themeName={themeName} model={event} />
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
