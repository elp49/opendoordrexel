import Layout from '../components/Layout'
import Section from '../components/Section'
import styles from './testimonies.module.css'

const testimonies = {
  intro: {
    name: 'testimonies',
    theme: 'white',
    titles: ['Testimonies'],
    subtitles: ['Hear what some of our members have to say'],
    descriptions: ['Comming soon...'],
  }
};

export default function Testimonies() {
  return (
    <Layout>
      <Section section={testimonies.intro}>
        <div style={{ height: 55 + 'vh' }}></div>
      </Section>
    </Layout>
  )
}
