import Layout from '../components/Layout'
import Section from '../components/Section'
import styles from './outreach.module.css'

const outreach = {
  intro: {
    theme: 'white',
    title: 'Outreach',
    subtitle: [{value:'See how we reach out to those with the greatest needs'}],
    description: [{value:''}],
  }
};

export default function Outreach() {
  return (
    <Layout>
      <div id={'outreach'}>
        <Section section={outreach.intro}>
          <div></div>
        </Section>
      </div>
    </Layout>
  )
}
