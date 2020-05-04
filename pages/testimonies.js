import Layout from '../components/Layout'
import Section from '../components/Section'
import styles from './testimonies.module.css'

const testimonies = {
  intro: {
    theme: 'white',
    title: 'Testimonies',
    subtitle: [{value:'Hear what some of our members have to say'}],
    description: [{value:''}],
  }
};

export default function Testimonies() {
  return (
    <Layout>
      <div id={'testimonies'}>
        <Section section={testimonies.intro}>
          <div></div>
        </Section>
      </div>
    </Layout>
  )
}
