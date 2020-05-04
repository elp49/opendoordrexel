import Layout from '../components/Layout'
import Section from '../components/Section'
import styles from './tuesdays.module.css'

const tuesdays = {
  dinner: {
    theme: 'white',
    title: 'Dinner',
    subtitle: [{value:'We serve a free dinner every tuesday night'}],
    description: [{value:''}],
  },
  worship: {
    theme: 'blue',
    title: 'Worship',
    subtitle: [{value:'We ask questions and together search out answers, believing God speaks to us in a multitude of ways.  We help one another along our faith journey, whether that is just beginning or life-long.'}],
    description: [{value:''}],
  }
};

export default function Tuesdays() {
  return (
    <Layout>
      <div id={'tuesdays'}>
        <Section section={tuesdays.dinner}></Section>
        <Section section={tuesdays.worship}></Section>
      </div>
    </Layout>
  )
}
