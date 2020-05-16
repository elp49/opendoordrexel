import Layout from '../components/Layout'
import Slideshow from '../components/Slideshow'
import Section from '../components/Section'
import Carousel from '../components/Carousel'
import styles from './index.module.css'

const home = {
  slideshow: {
    _id: 'home',
    theme: 'white',
    title: [],
    subtitle: [],
    description: [],
    timeout: 7,
    slides: [
      { _id: '1', url: '/images/outreach/outreach-35-edit-1.jpg', title: 'Find out where your donations go', buttonText: 'Learn more', href: '/outreach' },
      { _id: '2', url: '/images/dinner/dinner-17.jpg', title: 'Free dinner every Tuesday night', buttonText: 'Learn more', href: '/tuesdays' },
      { _id: '3', url: '/images/donations/donations-13.jpg', title: 'Always accepting clothing donations', buttonText: 'Learn more', href: '/outreach' },
      { _id: '4', url: '/images/outreach/outreach-34.jpg', title: 'Find out where your donations go', buttonText: 'Learn more', href: '/outreach' },
      { _id: '5', url: '/images/outreach/outreach-37-edit-1.jpg', title: 'Help those with the greatest needs', buttonText: 'Learn more', href: '/outreach' }
    ]
  },
  intro: {
    _id: 'home',
    theme: 'white',
    title: [{ value: 'Welcome to Open Door Christian Community' }],
    subtitle: [],
    description: [{ value: 'We are an open, welcoming Christian community that believes God’s love and mercy is for all people.  We invite you to gather with us.' }],
    links: [{ href: '/about', text: 'Learn more about us' }]
  },
  announcements: {
    _id: 'announcements',
    theme: 'blue',
    title: [{ value: 'Announcements' }],
    subtitle: [{ value: 'Sign up for our mailing list to stay up to date on our latest announcements.' }],
    description: [],
    posts: [
      { _id: '1', header: 'We have some news', date: '2020-05-03T14:29:45.708Z', details: 'Something happend and now we would like to tell you about it. Read this to find out what it is we want to tell you.' },
      { _id: '2', header: 'This is another announcement', date: '2020-05-02T14:29:45.708Z', details: 'Something happend and now we would like to tell you about it. Read this to find out what it is we want to tell you. If something else happens we will also let you know about that.' },
      { _id: '3', header: 'We have something to announce', date: '2020-05-01T14:29:45.708Z', details: 'Something happend and now we would like to tell you about it. Read this to find out what it is we want to tell you. If something else happens we will also let you know about that. Something happend and now we would like to tell you about it. Read this to find out what it is we want to tell you. If something else happens we will also let you know about that.' },
      { _id: '4', header: 'Read this to know what happened', date: '2020-04-30T14:29:45.708Z', details: 'Something happend and now we would like to tell you about it. Read this to find out what it is we want to tell you. If something else happens we will also let you know about that. Something happend and now we would like to tell you about it. Read this to find out what it is we want to tell you.' },
      { _id: '5', header: 'This is another announcement', date: '2020-04-29T14:29:45.708Z', details: 'Something happend and now we would like to tell you about it. Read this to find out what it is we want to tell you. If something else happens we will also let you know about that.' }
    ]
  },
  activities: {
    _id: 'activities',
    theme: 'white',
    title: [{ value: 'Activities' }],
    subtitle: [{ value: 'Open Door\'s ministry on campus is constantly growing. We create fun and inclusive events where people from all walks of life are welcome.' }],
    description: [],
    carousel: {
      _id: 'activities',
      theme: 'blue',
      cards: [
        { _id: '1', url: '/images/activities/activities-1.jpg' },
        { _id: '2', url: '/images/activities/activities-2.jpg' },
        { _id: '3', url: '/images/activities/activities-3.jpg' },
        { _id: '4', url: '/images/activities/activities-4.jpg' },
        { _id: '5', url: '/images/activities/activities-5.jpg' },
        { _id: '6', url: '/images/activities/activities-6.jpg' },
        { _id: '7', url: '/images/activities/activities-7.jpg' },
        { _id: '8', url: '/images/activities/activities-8.jpg' },
        { _id: '9', url: '/images/activities/activities-9.jpg' },
        { _id: '10', url: '/images/activities/activities-10.jpg' },
        { _id: '11', url: '/images/activities/activities-11.jpg' },
        { _id: '12', url: '/images/activities/activities-12.jpg' },
        { _id: '13', url: '/images/activities/activities-13.jpg' },
        { _id: '14', url: '/images/activities/activities-14.jpg' },
        { _id: '15', url: '/images/activities/activities-15.jpg' },
        { _id: '16', url: '/images/activities/activities-16.jpg' },
        { _id: '17', url: '/images/activities/activities-17.jpg' },
        { _id: '18', url: '/images/activities/activities-18.jpg' },
        { _id: '19', url: '/images/activities/activities-19.jpg' },
        { _id: '20', url: '/images/activities/activities-20.jpg' },
        { _id: '21', url: '/images/activities/activities-21.jpg' },
        { _id: '22', url: '/images/activities/activities-22.jpg' },
        { _id: '23', url: '/images/activities/activities-23.jpg' },
        { _id: '24', url: '/images/activities/activities-24.jpg' },
        { _id: '25', url: '/images/activities/activities-25.jpg' },
        { _id: '26', url: '/images/activities/activities-26.jpg' },
        { _id: '27', url: '/images/activities/activities-27.jpg' },
        { _id: '28', url: '/images/activities/activities-28.jpg' },
        { _id: '29', url: '/images/activities/activities-29.jpg' },
        { _id: '30', url: '/images/activities/activities-30.jpg' },
        { _id: '31', url: '/images/activities/activities-31.jpg' },
        { _id: '32', url: '/images/activities/activities-32.jpg' },
        { _id: '33', url: '/images/activities/activities-33.jpg' }
      ]
    }
  }
};

export default function Index() {
  return (
    <Layout>
      <div className={styles.indexSlideshow}>
        <Slideshow slideshow={home.slideshow} />
      </div>
      <Section section={home.intro}>
        <p className={styles.introLinks}>
          {home.intro.links.map((link, i) => {
            var spacer = i > 0 ? ' | ' : '';
            return (
              <span key={`indexIntroLink-${i}`} className={styles.link}>
                {spacer}<a href={link.href}>{link.text}</a>
              </span>
            )
          })}
        </p>
      </Section>
      <Section section={home.announcements}>
        <ul className={styles.announcements}>
          {home.announcements.posts.map((post, i) => {
            var className = i % 2 === 0 ? styles.leftPost : styles.rightPost;
            return (
              <li key={`post-${i}`} className={className} >
                <div className={styles.postHeader}>
                  <h1>{post.header}</h1>
                  <p>{new Date(post.date).toLocaleDateString()}</p>
                </div>
                <div className={styles.postDetails}>
                  <p>{post.details}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </Section>
      <Section section={home.activities}>
        <Carousel carousel={home.activities.carousel} />
      </Section>
    </Layout>
  )
}
