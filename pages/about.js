import Layout from '../components/Layout.js'
import Section from '../components/Section'
import styles from './about.module.css'

const about = {
  intro: {
    name: 'about',
    theme: 'white',
    titles: ['About Us'],
    subtitles: [],
    descriptions: [
      'We are an open, welcoming Christian community that believes God’s love and mercy is for all people. We invite you to gather with us.',
      'We ask questions and together search out answers, believing God speaks to us in a multitude of ways. We help one another along our faith journey, whether that is just beginning or life-long.',
      'We believe our faith shapes our lives, giving us meaning and purpose in everything we do. From figuring out our career paths to spending time serving others, we hope to make the world more reflective of God’s dream for creation.'
    ]
  },
  timeline: {
    name: 'timeline',
    theme: 'blue',
    titles: ['Our Story'],
    subtitles: ['It all started with 2 crockpots and a few people...'],
    descriptions: [],
    events: [
      { month: 'Jan', year: '2015', details: 'Piltz begins' },
      { month: 'Sep', year: '2015', details: 'Diana begins' },
      { month: 'Oct', year: '2015', details: '2 crockpots' },
      { month: 'Mar', year: '2016', details: 'Blind-Side All-Campus Discussion: Human Potential' },
      { month: 'May', year: '2016', details: 'Outside BBQ with 100 attendees' },
      { month: 'Jun', year: '2016', details: 'Conversations Unfiltered at Saxby\'s' },
      { month: 'Sep', year: '2016', details: 'Eddie begins' },
      { month: 'Oct', year: '2016', details: 'Student executive board begins' },
      { month: 'Mar', year: '2017', details: 'Collaborated with local church ministries' },
      { month: 'Mar', year: '2017', details: 'Dinner & Worship numbers grow' },
      { month: 'Oct', year: '2017', details: 'Labrynth' },
      { month: 'May', year: '2018', details: 'Blood Diamnond movie discussion' },
      { month: 'Sep', year: '2018', details: 'Jack begins and starts Bible study/spiritual discussion' },
      { month: 'Sep', year: '2018', details: 'Dinner & Worship numbers grow again' },
      { month: 'Oct', year: '2018', details: 'Kensington outreach begins' },
      { month: 'Oct', year: '2019', details: 'Kensington outreach grow: 13 clothing drive locations and partnerships created' }
    ]
  },
  icons: {
    chevronDown: { white: '/icons/chevron-down-white.svg', blue: '/icons/chevron-down-blue.svg' },
    magnifyingGlass: '/icons/magnifying-glass.svg'
  }
};

function scrollToTop(id) {
  document.getElementById(id).scrollIntoView(true);
}

export default function About() {
  const timelineId = `${about.timeline.name}Section`;
  return (
    <Layout>
      <Section section={about.intro}>
        <div onClick={() => { scrollToTop(timelineId) }} className={'chevronDown'}>
          <i></i>
        </div>
      </Section>
      <Section section={about.timeline}>
        <ul className={styles.timeline}>
          {
            about.timeline.events.map((event, i) => {
              const { month, year, details } = event;
              
              return (
                <li key={`event-${i}`} className={styles.event}>
                  <div className={styles.magnifyingGlass}>
                    <i style={{ backgroundImage: `url(${about.icons.magnifyingGlass})` }}></i>
                  </div>
                  <div className={styles.eventDate}>
                    <h2>{month}</h2>
                    <h2>{year}</h2>
                  </div>
                  <div className={styles.eventDetails}>
                    <p>{details}</p>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </Section>
      <style jsx>
        {`
          .chevronDown {
            position: relative;
            display: block;
            height: 45px;
            width: 45px;
            margin: auto;
          }
          .chevronDown>i {
            position: absolute;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
            -moz-transform: translate(-500%, -50%);
            -ms-transform: translate(-50%, -50%);
            -o-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            transition-duration: .3s;
            display: block;
            height: 30px;
            width: 30px;
            background-color: #eee;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            background-image: url(${about.icons.chevronDown.blue});
            border-radius: 50%;
            cursor: pointer;
          }
          @media not all and (pointer: coarse) {
            .chevronDown}>i:hover, .chevronDown>i:active {
              height: 45px;
              width: 45px;
              background-color: #24316F;
              background-image: url(${about.icons.chevronDown.white});
            }
          }
        `}
      </style>
    </Layout>
  )
}
