import Layout from '../components/Layout'
import Slideshow from '../components/Slideshow'
import Section from '../components/Section'
import styles from './index.module.css'

const index = {
  slideshow: {
    slides: [
      { imageUrl: '/images/kensington-4.jpg', title: 'Find out where your donations go', buttonText: 'Learn more', linkTo: '/outreach' },
      { imageUrl: '/images/dinner-5.jpg', title: 'Free dinner every Tuesday night', buttonText: 'Learn more', linkTo: '/tuesdays' },
      { imageUrl: '/images/clothing-14.jpg', title: 'Always accepting clothing donations', buttonText: 'Learn more', linkTo: '/outreach' },
      { imageUrl: '/images/kensington-1.jpg', title: 'Find out where your donations go', buttonText: 'Learn more', linkTo: '/outreach' },
      { imageUrl: '/images/kensington-5.jpg', title: 'Help those with the greatest needs', buttonText: 'Learn more', linkTo: '/outreach' }
    ]
  },
  intro: {
    theme: 'white',
    title: 'Welcome to Open Door Christian Community',
    subtitle: [],
    description: [
      { value: 'We are an open, welcoming Christian community that believes God’s love and mercy is for all people.  We invite you to gather with us.' }
    ],
    links: [
      { href: '/about', text: 'Learn more about us' }
    ]
  },
  announcements: {
    theme: 'blue',
    title: 'Announcements',
    subtitle: [
      { value: 'Sign up for our mailing list to stay up to date on our latest announcements.' }
    ],
    description: [],
    posts: [
      { header: 'We have some news', date: '4/30/2020', details: 'Something happend and now we would like to tell you about it. Read this to find out what it is we want to tell you.' },
      { header: 'This is another announcement', date: '4/29/2020', details: 'Something happend and now we would like to tell you about it. Read this to find out what it is we want to tell you. If something else happens we will also let you know about that.' },
      { header: 'We have something to announce', date: '4/28/2020', details: 'Something happend and now we would like to tell you about it. Read this to find out what it is we want to tell you. If something else happens we will also let you know about that. Something happend and now we would like to tell you about it. Read this to find out what it is we want to tell you. If something else happens we will also let you know about that.' },
      { header: 'Read this to know what happened', date: '4/27/2020', details: 'Something happend and now we would like to tell you about it. Read this to find out what it is we want to tell you. If something else happens we will also let you know about that. Something happend and now we would like to tell you about it. Read this to find out what it is we want to tell you.' },
      { header: 'This is another announcement', date: '4/26/2020', details: 'Something happend and now we would like to tell you about it. Read this to find out what it is we want to tell you. If something else happens we will also let you know about that.' }
    ]
  }
};

export default function Index() {
  return (
    <Layout>
      <div id={'index'}>
        <div className={styles.indexSlideshow}>
          <Slideshow slideshow={index.slideshow} />
        </div>
        <Section section={index.intro}>
          <p className={styles.introLinks}>
            {index.intro.links.map((link, i) => {
              var spacer = i > 0 ? ' | ' : '';
              return (
                <span key={`indexIntroLink-${i}`} className={styles.link}>
                  {spacer}<a href={link.href}>{link.text}</a>
                </span>
              )
            })}
          </p>
        </Section>
        <Section section={index.announcements}>
          <ul className={styles.announcements}>
            {index.announcements.posts.map((post, i) => {
              var className = i % 2 === 0 ? styles.leftPost : styles.rightPost;
              return (
                <li key={`post-${i}`} className={className} >
                  <div className={styles.postHeader}>
                    <h1>{post.header}</h1>
                    <p>{post.date}</p>
                  </div>
                  <div className={styles.postDetails}>
                    <p>{post.details}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </Section>
        <section className={styles.whiteSection}></section>
      </div>
    </Layout>
  )
}
