import Layout from '../components/Layout'
import Section from '../components/Section'
import Carousel from '../components/Carousel';
import styles from './outreach.module.css'

const outreach = {
  intro: {
    name: 'outreach',
    theme: 'white',
    title: [{ value: 'Outreach' }],
    subtitle: [{ value: 'See how we reach out to those with the greatest needs' }],
    description: [{ value: 'Comming soon...' }],
    carousel: {
      name: 'dinner',
      theme: 'blue',
      cards: [
        { order: '1', url: '/images/outreach/outreach-1.jpg' },
        { _id: '2', url: '/images/outreach/outreach-2.jpg' },
        { _id: '3', url: '/images/outreach/outreach-3.jpg' },
        { _id: '4', url: '/images/outreach/outreach-4.jpg' },
        { _id: '5', url: '/images/outreach/outreach-5.jpg' },
        { _id: '6', url: '/images/outreach/outreach-6.jpg' },
        { _id: '7', url: '/images/outreach/outreach-7.jpg' },
        { _id: '8', url: '/images/outreach/outreach-8.jpg' },
        { _id: '9', url: '/images/outreach/outreach-9.jpg' },
        { _id: '10', url: '/images/outreach/outreach-10.jpg' },
        { _id: '11', url: '/images/outreach/outreach-11.jpg' },
        { _id: '12', url: '/images/outreach/outreach-12.jpg' },
        { _id: '13', url: '/images/outreach/outreach-13.jpg' },
        { _id: '14', url: '/images/outreach/outreach-14.jpg' },
        { _id: '15', url: '/images/outreach/outreach-15.jpg' },
        { _id: '16', url: '/images/outreach/outreach-16.jpg' },
        { _id: '17', url: '/images/outreach/outreach-17.jpg' },
        { _id: '18', url: '/images/outreach/outreach-18.jpg' },
        { _id: '19', url: '/images/outreach/outreach-19.jpg' },
        { _id: '20', url: '/images/outreach/outreach-20.jpg' },
        { _id: '21', url: '/images/outreach/outreach-21.jpg' },
        { _id: '22', url: '/images/outreach/outreach-22.jpg' },
        { _id: '23', url: '/images/outreach/outreach-23.jpg' },
        { _id: '24', url: '/images/outreach/outreach-24.jpg' },
        { _id: '25', url: '/images/outreach/outreach-25.jpg' },
        { _id: '26', url: '/images/outreach/outreach-26.jpg' },
        { _id: '27', url: '/images/outreach/outreach-27.jpg' },
        { _id: '998', url: '/images/outreach/outreach-28.jpg' },
        { _id: '989', url: '/images/outreach/outreach-29.jpg' },
        { _id: '990', url: '/images/outreach/outreach-30.jpg' },
        { _id: '991', url: '/images/outreach/outreach-31.jpg' },
        { _id: '992', url: '/images/outreach/outreach-32.jpg' },
        { _id: '993', url: '/images/outreach/outreach-33.jpg' },
        { _id: '994', url: '/images/outreach/outreach-34.jpg' },
        { _id: '995', url: '/images/outreach/outreach-35.jpg' },
        { _id: '996', url: '/images/outreach/outreach-36.jpg' },
        { _id: '997', url: '/images/outreach/outreach-37.jpg' },
        { _id: '38', url: '/images/outreach/outreach-38.jpg' },
        { _id: '39', url: '/images/outreach/outreach-39.jpg' },
        { _id: '40', url: '/images/outreach/outreach-40.jpg' },
        { _id: '41', url: '/images/outreach/outreach-41.jpg' },
        { _id: '999', url: '/images/outreach/outreach-42.jpg' },
        { _id: '43', url: '/images/outreach/outreach-43.jpg' },
        { _id: '44', url: '/images/outreach/outreach-44.jpg' },
        { _id: '45', url: '/images/outreach/outreach-45.jpg' },
        { _id: '46', url: '/images/outreach/outreach-46.jpg' }
      ]
    }
  },
  donations: {
    _id: 'donations',
    theme: 'blue',
    title: [{ value: 'Donations' }],
    subtitle: [{ value: 'Clothing and toiletry donations are always accepted. Several times a year, we organize all of the donations and then give them to those who need them the most.' }],
    description: [{ value: 'Comming soon...' }],
    carousel: {
      _id: 'donations',
      theme: 'white',
      cards: [
        { _id: '1', url: '/images/donations/donations-1.jpg' },
        { _id: '2', url: '/images/donations/donations-2.jpg' },
        { _id: '3', url: '/images/donations/donations-3.jpg' },
        { _id: '4', url: '/images/donations/donations-4.jpg' },
        { _id: '5', url: '/images/donations/donations-5.jpg' },
        { _id: '6', url: '/images/donations/donations-6.jpg' },
        { _id: '7', url: '/images/donations/donations-7.jpg' },
        { _id: '8', url: '/images/donations/donations-8.jpg' },
        { _id: '9', url: '/images/donations/donations-9.jpg' },
        { _id: '10', url: '/images/donations/donations-10.jpg' },
        { _id: '11', url: '/images/donations/donations-11.jpg' },
        { _id: '12', url: '/images/donations/donations-12.jpg' },
        { _id: '13', url: '/images/donations/donations-13.jpg' },
        { _id: '14', url: '/images/donations/donations-14.jpg' },
        { _id: '15', url: '/images/donations/donations-15.jpg' },
        { _id: '16', url: '/images/donations/donations-16.jpg' },
        { _id: '17', url: '/images/donations/donations-17.jpg' },
        { _id: '18', url: '/images/donations/donations-18.jpg' },
        { _id: '19', url: '/images/donations/donations-19.jpg' },
        { _id: '20', url: '/images/donations/donations-20.jpg' },
        { _id: '21', url: '/images/donations/donations-21.jpg' },
        { _id: '22', url: '/images/donations/donations-22.jpg' },
        { _id: '23', url: '/images/donations/donations-23.jpg' },
        { _id: '24', url: '/images/donations/donations-24.jpg' },
        { _id: '25', url: '/images/donations/donations-25.jpg' },
        { _id: '26', url: '/images/donations/donations-26.jpg' },
        { _id: '27', url: '/images/donations/donations-27.jpg' },
        { _id: '28', url: '/images/donations/donations-28.jpg' },
        { _id: '29', url: '/images/donations/donations-29.jpg' },
        { _id: '30', url: '/images/donations/donations-30.jpg' },
        { _id: '31', url: '/images/donations/donations-31.jpg' },
        { _id: '32', url: '/images/donations/donations-32.jpg' },
        { _id: '33', url: '/images/donations/donations-33.jpg' },
        { _id: '34', url: '/images/donations/donations-34.jpg' },
        { _id: '35', url: '/images/donations/donations-35.jpg' },
        { _id: '36', url: '/images/donations/donations-36.jpg' },
        { _id: '37', url: '/images/donations/donations-37.jpg' },
        { _id: '38', url: '/images/donations/donations-38.jpg' },
        { _id: '39', url: '/images/donations/donations-39.jpg' }
      ]
    }
  }
};

export default function Outreach() {
  return (
    <Layout>
      <Section section={outreach.intro}>
        <div style={{ height: 35 + 'vh' }}></div>
        <Carousel carousel={outreach.intro.carousel} />
      </Section>
      <Section section={outreach.donations}>
        <div style={{ height: 35 + 'vh' }}></div>
        <Carousel carousel={outreach.donations.carousel} />
      </Section>
    </Layout>
  )
}
