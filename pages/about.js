import Layout from '../components/Layout.js'
import Section from '../components/Section'
import styles from './about.module.css'

const about = {
  intro: {
    theme: 'white',
    title: 'About Us',
    subtitle: [],
    description: [
      { value: 'We are an open, welcoming Christian community that believes God’s love and mercy is for all people.  We invite you to gather with us.' },
      { value: 'We ask questions and together search out answers, believing God speaks to us in a multitude of ways.  We help one another along our faith journey, whether that is just beginning or life-long.' },
      { value: 'We believe our faith shapes our lives, giving us meaning and purpose in everything we do.  From figuring out our career paths to spending time serving others, we hope to make the world more reflective of God’s dream for creation.' },
    ]
  },
  timeline: {
    theme: 'blue',
    title: 'Our Story',
    subtitle: [
      { value: 'It all started with 2 crockpots and a few people...' }
    ],
    description: [],
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
  }
};

export default function About() {
  return (
    <Layout>
      <div id={'about'}>
        <Section section={about.intro}>
          <a href='#timeline' className={styles.chevronDown}><i></i></a>
        </Section>
        <Section id={'timeline'} section={about.timeline}>
          <ul className={styles.timeline}>
            {about.timeline.events.map((event, i) => {
              return (
                <li key={`event-${i}`} className={styles.event}>
                  <div className={styles.magnifyingGlass}>
                    <i style={{ backgroundImage: 'url(/icons/magnifying-glass.svg)' }}></i>
                  </div>
                  <div className={styles.eventDate}>
                    <h2>{event.month}</h2>
                    <h2>{event.year}</h2>
                  </div>
                  <div className={styles.eventDetails}>
                    <p>{event.details}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </Section>
      </div>
    </Layout>
  )
}
