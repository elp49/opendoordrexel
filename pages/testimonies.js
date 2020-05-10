import Layout from '../components/Layout'
import Section from '../components/Section'
import styles from './testimonies.module.css'

const testimonies = {
  intro: {
    _id: 'testimonies',
    theme: 'white',
    title: [{ value: 'Testimonies' }],
    subtitle: [{ value: 'Hear what some of our members have to say' }],
    description: [{ value: 'Comming soon...' }],
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
