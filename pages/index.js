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
  ]
};

export default function Index() {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.slideshowContainer}>
          <Slideshow slides={index.slides} />
        </div>
      </div>
    </Layout>
  )
}
