import { isDefined, getTheme, sortListByOrder, ICONS } from './Layout'

function sortTimelineEventList(eventList) {
  let events = eventList;
  events.forEach(event => {
    const { month, year } = event;
    event.order = Date.parse(`01 ${month} ${year}`);
  });

  events = sortListByOrder(events);
  return events;
}

export default function Timeline({ timeline }) {
  if (!isDefined(timeline))
    return;

  const id = isDefined(timeline.name) ? timeline.name : 'timeline';
  const theme = getTheme(timeline.theme);
  const eventList = sortTimelineEventList(timeline.eventList);

  return (
    <div id={`${id}Timeline`} className={`${theme} timeline`}>
      <ol className={'eventList'}>
        {
          eventList.map((event, i) => {
            const key = `${id}Event-${i}`;
            const { month, year, details } = event;

            return (
              <li key={key} id={key} className={'event'}>
                <div className={'eventMarker'}>
                  <i></i>
                </div>
                <div className={'eventDate'}>
                  <h2>{month}</h2>
                  <h2>{year}</h2>
                </div>
                <div className={'eventDetails'}>
                  <p>{details}</p>
                </div>
              </li>
            );
          })
        }
      </ol>
      <style jsx>
        {`
          .timeline {
            max-width: 1100px;
            margin: 30px 20px;
            padding: 45px;
            border-radius: 10px;
          }
          .white.timeline {
            background-color: #fff;
          }
          .blue.timeline {
            background-color: #24316F;
          }
          .eventList {
            border-left-width: 2px;
            border-left-style: solid;
            border-style: dotted;
          }
          .white .eventList {
            border-left-color: #24316F;
          }
          .blue .eventList {
            border-left-color: #fff;
          }
          .event {
            position: relative;
            top: -10px;
            width: 100%;
            margin: 20px 0;
            list-style: none;
          }
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
            background-image: url(${ICONS.magnifyingGlass.blue});
          }
          .blue .eventMarker>i {
            background-image: url(${ICONS.magnifyingGlass.white});
          }
          .eventDate {
            margin-left: 20px;
          }
          .white .eventDate {
            color: #24316F;
          }
          .blue .eventDate {
            color: #fff;
          }
          .eventDetails {
            margin-left: 20px;
            padding: 20px;
            border-radius: 10px;
          }
          .white .eventDetails {
            background-color: #24316F;
            color: #fff;
          }
          .blue .eventDetails {
            background-color: #fff;
            color: #000;
          }
          @media only screen and (min-width: 1000px) {
            .timeline {
              margin: 55px auto;
            }
            .event {
              margin: 45px 0;
            }
            .eventDate {
              margin-left: 45px;
            }
            .eventDetails {
              margin-left: 45px;
              padding: 45px;
            }
          }
        `}
      </style>
    </div>
  );
}
