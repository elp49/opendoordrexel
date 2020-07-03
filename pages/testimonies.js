import testimonies from './testimonies.json'
import styles from './testimonies.module.css'
import Layout from '../components/Layout'
import Section from '../components/Section'

export default function Testimonies() {
  return (
    <Layout>
      <Section sectionDetails={testimonies.intro.sectionDetails}>
        <div style={{ height: 55 + 'vh' }}></div>
      </Section>
    </Layout>
  );
}
