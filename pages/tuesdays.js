import tuesdays from './tuesdays.json'
import styles from './tuesdays.module.css'
import Layout from '../components/Layout'
import Section from '../components/Section'
import Carousel from '../components/Carousel';

export default function Tuesdays() {
  return (
    <Layout>
      <Section sectionDetails={tuesdays.dinner.sectionDetails}>
        <div style={{ height: 35 + 'vh' }}></div>
        <Carousel carousel={tuesdays.dinner.carousel} />
      </Section>
      <Section sectionDetails={tuesdays.worship.sectionDetails}>
        <div style={{ height: 35 + 'vh' }}></div>
        <Carousel carousel={tuesdays.worship.carousel} />
      </Section>
    </Layout>
  );
}
