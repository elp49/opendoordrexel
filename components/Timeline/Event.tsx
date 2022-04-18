import icons from '../../data/icons.json';
import { EventModel } from '../../models/components/TimelineModel';
import { getMonthName } from '../../models/shared/Month';
import { Color, ThemeName } from '../../models/shared/ThemedModel';
import styles from '../../styles/timeline.module.css';

type TimelineEventProps = {
  themeName: string;
  model: EventModel;
};

const TimelineEvent = ({ themeName, model }: TimelineEventProps) => {
  const { year, details } = model;
  const monthName = getMonthName(model.month);

  return (
    <li className={`${styles.event} ${themeName}`}>
      <div className={styles.eventMarker}>
        <i />
      </div>
      <div className={styles.eventDate}>
        <h2>
          {monthName} {year}
        </h2>
      </div>
      <div className={styles.eventDetails}>
        <p>{details}</p>
      </div>
      <style jsx>
        {`
          .${ThemeName.White} > .${styles.eventMarker} > i {
            background-image: url(${icons.magnifyingGlass.blue});
          }
          .${ThemeName.Blue} > .${styles.eventMarker} > i {
            background-image: url(${icons.magnifyingGlass.white});
          }
          .${ThemeName.White} > .${styles.eventDate} {
            color: ${Color.Blue};
          }
          .${ThemeName.Blue} > .${styles.eventDate} {
            color: ${Color.White};
          }
          .${ThemeName.White} > .${styles.eventDetails} {
            background-color: ${Color.Blue};
            color: ${Color.White};
          }
          .${ThemeName.Blue} > .${styles.eventDetails} {
            background-color: ${Color.White};
            color: ${Color.Black};
          }
        `}
      </style>
    </li>
  );
};

export default TimelineEvent;
