import Layout from '../components/Layout.js'
import Slideshow from '../components/Slideshow.js'
import styles from './index.module.css'

const index = {
  slides: [
    { imageUrl: '/images/kensington-4.jpg', title: 'Find out where your donations go', buttonText: 'Learn more', linkTo: '/outreach' },
    { imageUrl: '/images/dinner-5.jpg', title: 'Free dinner every Tuesday night', buttonText: 'Learn more', linkTo: '/tuesdays' },
    { imageUrl: '/images/clothing-14.jpg', title: 'Always accepting clothing donations', buttonText: 'Learn more', linkTo: '/outreach' },
    { imageUrl: '/images/kensington-1.jpg', title: 'Find out where your donations go', buttonText: 'Learn more', linkTo: '/outreach' },
    { imageUrl: '/images/kensington-5.jpg', title: 'Help those with the greatest needs', buttonText: 'Learn more', linkTo: '/outreach' }
  ],
  announcements: {
    title: 'Announcements',
    subTitle: 'Sign up for our mailing list to stay up to date on our latest announcements.',
    posts: [
      { header: 'We have some news', details: 'Something happend and now we would like to tell you about it. Read this to find out what it is we want to tell you. If something else happens we will also let you know about that.' },
      { header: 'This is another announcement', details: 'Something happend and now we would like to tell you about it. Read this to find out what it is we want to tell you. If something else happens we will also let you know about that.' },
      { header: 'We have something to announce', details: 'Something happend and now we would like to tell you about it. Read this to find out what it is we want to tell you. If something else happens we will also let you know about that.' },
      { header: 'Read this to know what happened', details: 'Something happend and now we would like to tell you about it. Read this to find out what it is we want to tell you. If something else happens we will also let you know about that.' },
    ]
  }
};

export default function Index() {
  return (
    <Layout>
      <div id={'index'}>
        <div className={styles.indexSlideshow}>
          <Slideshow slides={index.slides} />
        </div>
        <div className={styles.indexAnnouncements}>
          <div className={styles.announcements}>
            <div className={styles.announcementsTitle}>
              <h1>{index.announcements.title}</h1>
              <h3>{index.announcements.subTitle}</h3>
            </div>
            <ul>
              {index.announcements.posts.map((post, i) => {
                return (
                  <li key={`post-${i}`} className={styles.post}>
                    <div className={styles.postHeader}><h1>{post.header}</h1></div>
                    <div className={styles.postDetails}>
                      <p>{post.details}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  )
}
