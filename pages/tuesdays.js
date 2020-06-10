import Layout from '../components/Layout'
import Section from '../components/Section'
import Carousel from '../components/Carousel';
import styles from './tuesdays.module.css'

const tuesdays = {
  dinner: {
    name: 'dinner',
    theme: 'white',
    titles: ['Dinner'],
    subtitles: ['We serve a free dinner every tuesday night'],
    descriptions: ['Comming soon...'],
    carousel: {
      _id: 'dinner',
      theme: 'blue',
      cards: [
        { _id: '1', url: '/images/dinner/dinner-1.jpg' },
        { _id: '2', url: '/images/dinner/dinner-2.jpg' },
        { _id: '3', url: '/images/dinner/dinner-3.jpg' },
        { _id: '4', url: '/images/dinner/dinner-4.jpg' },
        { _id: '5', url: '/images/dinner/dinner-5.jpg' },
        { _id: '6', url: '/images/dinner/dinner-6.jpg' },
        { _id: '7', url: '/images/dinner/dinner-7.jpg' },
        { _id: '8', url: '/images/dinner/dinner-8.jpg' },
        { _id: '9', url: '/images/dinner/dinner-9.jpg' },
        { _id: '10', url: '/images/dinner/dinner-10.jpg' },
        { _id: '11', url: '/images/dinner/dinner-11.jpg' },
        { _id: '12', url: '/images/dinner/dinner-12.jpg' },
        { _id: '13', url: '/images/dinner/dinner-13.jpg' },
        { _id: '14', url: '/images/dinner/dinner-14.jpg' },
        { _id: '15', url: '/images/dinner/dinner-15.jpg' },
        { _id: '16', url: '/images/dinner/dinner-16.jpg' },
        { _id: '999', url: '/images/dinner/dinner-17.jpg' },
        { _id: '18', url: '/images/dinner/dinner-18.jpg' },
        { _id: '19', url: '/images/dinner/dinner-19.jpg' },
        { _id: '20', url: '/images/dinner/dinner-20.jpg' },
        { _id: '998', url: '/images/dinner/dinner-21.jpg' },
        { _id: '22', url: '/images/dinner/dinner-22.jpg' },
        { _id: '23', url: '/images/dinner/dinner-23.jpg' },
        { _id: '24', url: '/images/dinner/dinner-24.jpg' },
        { _id: '25', url: '/images/dinner/dinner-25.jpg' },
        { _id: '26', url: '/images/dinner/dinner-26.jpg' },
        { _id: '27', url: '/images/dinner/dinner-27.jpg' }
      ]
    }
  },
  worship: {
    name: 'worship',
    theme: 'blue',
    title: ['Worship'],
    subtitle: ['We ask questions and together search out answers, believing God speaks to us in a multitude of ways.  We help one another along our faith journey, whether that is just beginning or life-long.'],
    description: ['Comming soon...'],
    carousel: {
      name: 'worship',
      theme: 'white',
      cards: [
        { _id: '1', url: '/images/worship/worship-1.jpg' },
        { _id: '2', url: '/images/worship/worship-2.jpg' },
        { _id: '3', url: '/images/worship/worship-3.jpg' },
        { _id: '4', url: '/images/worship/worship-4.jpg' },
        { _id: '5', url: '/images/worship/worship-5.jpg' },
        { _id: '6', url: '/images/worship/worship-6.jpg' },
        { _id: '7', url: '/images/worship/worship-7.jpg' },
        { _id: '8', url: '/images/worship/worship-8.jpg' },
        { _id: '9', url: '/images/worship/worship-9.jpg' },
        { _id: '10', url: '/images/worship/worship-10.jpg' },
        { _id: '11', url: '/images/worship/worship-11.jpg' },
        { _id: '12', url: '/images/worship/worship-12.jpg' },
        { _id: '13', url: '/images/worship/worship-13.jpg' },
        { _id: '14', url: '/images/worship/worship-14.jpg' },
        { _id: '15', url: '/images/worship/worship-15.jpg' },
        { _id: '16', url: '/images/worship/worship-16.jpg' },
        { _id: '17', url: '/images/worship/worship-17.jpg' },
        { _id: '18', url: '/images/worship/worship-18.jpg' },
        { _id: '19', url: '/images/worship/worship-19.jpg' },
        { _id: '999', url: '/images/worship/worship-20.jpg' },
        { _id: '21', url: '/images/worship/worship-21.jpg' },
        { _id: '997', url: '/images/worship/worship-22.jpg' },
        { _id: '23', url: '/images/worship/worship-23.jpg' },
        { _id: '24', url: '/images/worship/worship-24.jpg' },
        { _id: '25', url: '/images/worship/worship-25.jpg' },
        { _id: '26', url: '/images/worship/worship-26.jpg' },
        { _id: '27', url: '/images/worship/worship-27.jpg' },
        { _id: '28', url: '/images/worship/worship-28.jpg' },
        { _id: '998', url: '/images/worship/worship-29.jpg' },
        { _id: '30', url: '/images/worship/worship-30.jpg' },
        { _id: '31', url: '/images/worship/worship-31.jpg' },
        { _id: '32', url: '/images/worship/worship-32.jpg' },
        { _id: '33', url: '/images/worship/worship-33.jpg' },
        { _id: '34', url: '/images/worship/worship-34.jpg' }
      ]
    }
  }
};

export default function Tuesdays() {
  return (
    <Layout>
      <Section section={tuesdays.dinner}>
        <div style={{ height: 35 + 'vh' }}></div>
        <Carousel carousel={tuesdays.dinner.carousel} />
      </Section>
      <Section section={tuesdays.worship}>
        <div style={{ height: 35 + 'vh' }}></div>
        <Carousel carousel={tuesdays.worship.carousel} />
      </Section>
    </Layout>
  )
}
