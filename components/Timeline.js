import styles from './Timeline.module.css'

function isDefined(a) {
  if (typeof a !== 'undefined')
    return true;

  return false;
}

function sortListByOrder(list) {
  return list.sort((a, b) => a.order - b.order);
}

function sortTimelineEvents(timelineEvents) {
  let events = timelineEvents;
  events.forEach(event => {
    const { month, year } = event;
    event.order = Date.parse(`01 ${month} ${year}`);
  });

  return sortListByOrder(events);
}

export default function Timeline({ timeline }) {
  if (!isDefined(timeline))
    return;

  const id = isDefined(timeline.name) ? timeline.name : 'timeline';
  const events = sortTimelineEvents(timeline.events);

  return (
    <div id={`${id}Timeline`} className={styles.timeline}>
      <ol className={styles.eventList}>
        {
          events.map((event, i) => {
            const key = `${id}Event-${i}`;
            const { month, year, details } = event;

            return (
              <li key={key} id={key} className={styles.event}>
                <div className={'eventMarker'}>
                  <i></i>
                </div>
                <div className={styles.eventDate}>
                  <h2>{month}</h2>
                  <h2>{year}</h2>
                </div>
                <div className={styles.eventDetails}>
                  <p>{details}</p>
                </div>
              </li>
            );
          })
        }
      </ol>
      <style jsk>
        {`
          .eventMarker {
            position: absolute;
            left: -3.83rem;
            height: 5rem;
            width: 5rem;
          }
          .eventMarker>i {
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
          }
          .white .eventMarker>i {
            background-image: url(${timeline.icons.magnifyingGlass.blue});
          }
          .blue .eventMarker>i {
            background-image: url(${timeline.icons.magnifyingGlass.white});
          }
        `}
      </style>
    </div>
  );
}
