import fetch from 'node-fetch'
import home from './index.json'
import Layout from '../components/Layout'
import Slideshow from '../components/Slideshow'
import Section from '../components/Section'
import Carousel from '../components/Carousel'
import styles from './index.module.css'

// const test = {
//   _id: 'm8nyg65s4sd6wkjb',
//   name: 'home',
//   sections: {
//     special: {
//       _id: 'hgu5e66sczrtvkvqrzg',
//       section: {
//         _id: 'hgxvvw45e6bdtuhhyss',
//         name: 'slideshow',
//         theme: 'white',
//         title: [],
//         subtitle: [],
//         description: []
//       },
//     },
//     slideshow: {
//       _id: 'hgu5e66sczrtvkvqrzg',
//       section: {
//         _id: 'hgxvvw45e6bdtuhhyss',
//         name: 'slideshow',
//         theme: 'white',
//         title: [],
//         subtitle: [],
//         description: []
//       },
//       timeout: 7,
//       slides: [
//         { _id: '1', url: '/images/outreach/outreach-35-edit-1.jpg', title: 'Find out where your donations go', buttonText: 'Learn more', href: '/outreach', showOnMobile: true, showOnDesktop: true },
//         { _id: '2', url: '/images/dinner/dinner-26.jpg', title: 'Free dinner every Tuesday night', buttonText: 'Learn more', href: '/tuesdays', showOnMobile: true, showOnDesktop: false },
//         { _id: '3', url: '/images/dinner/dinner-17.jpg', title: 'Free dinner every Tuesday night', buttonText: 'Learn more', href: '/tuesdays', showOnMobile: false, showOnDesktop: true },
//         { _id: '4', url: '/images/donations/donations-9.jpg', title: 'Always accepting clothing donations', buttonText: 'Learn more', href: '/outreach', showOnMobile: true, showOnDesktop: false },
//         { _id: '4', url: '/images/donations/donations-13.jpg', title: 'Always accepting clothing donations', buttonText: 'Learn more', href: '/outreach', showOnMobile: false, showOnDesktop: true },
//         { _id: '5', url: '/images/worship/worship-20.jpg', title: 'Worship with us on Tuesday nights', buttonText: 'Learn more', href: '/tuesdays', showOnMobile: true, showOnDesktop: true },
//         { _id: '6', url: '/images/outreach/outreach-34.jpg', title: 'Find out where your donations go', buttonText: 'Learn more', href: '/outreach', showOnMobile: true, showOnDesktop: true },
//         { _id: '7', url: '/images/outreach/outreach-37-edit-1.jpg', title: 'Help those with the greatest needs', buttonText: 'Learn more', href: '/outreach', showOnMobile: true, showOnDesktop: true }
//       ]
//     },
//     intro: {
//       _id: '2135465jhgf',
//       order: 2
//     },
//     announcements: {
//       _id: '2135465jhgf',
//       order: 3
//     },
//     activities: {
//       _id: '2135465jhgf',
//       order: 4
//     },
//   }
// }

// const home = {
//   slideshow: {
//     _id: 'slideshow',
//     theme: 'white',
//     title: [],
//     subtitle: [],
//     description: [],
//     timeout: 7,
//     slides: [
//       { _id: '1', url: '/images/outreach/outreach-35-edit-1.jpg', title: 'Find out where your donations go', buttonText: 'Learn more', href: '/outreach', showOnMobile: true, showOnDesktop: true },
//       { _id: '2', url: '/images/dinner/dinner-26.jpg', title: 'Free dinner every Tuesday night', buttonText: 'Learn more', href: '/tuesdays', showOnMobile: true, showOnDesktop: false },
//       { _id: '3', url: '/images/dinner/dinner-17.jpg', title: 'Free dinner every Tuesday night', buttonText: 'Learn more', href: '/tuesdays', showOnMobile: false, showOnDesktop: true },
//       { _id: '4', url: '/images/donations/donations-9.jpg', title: 'Always accepting clothing donations', buttonText: 'Learn more', href: '/outreach', showOnMobile: true, showOnDesktop: false },
//       { _id: '4', url: '/images/donations/donations-13.jpg', title: 'Always accepting clothing donations', buttonText: 'Learn more', href: '/outreach', showOnMobile: false, showOnDesktop: true },
//       { _id: '5', url: '/images/worship/worship-20.jpg', title: 'Worship with us on Tuesday nights', buttonText: 'Learn more', href: '/tuesdays', showOnMobile: true, showOnDesktop: true },
//       { _id: '6', url: '/images/outreach/outreach-34.jpg', title: 'Find out where your donations go', buttonText: 'Learn more', href: '/outreach', showOnMobile: true, showOnDesktop: true },
//       { _id: '7', url: '/images/outreach/outreach-37-edit-1.jpg', title: 'Help those with the greatest needs', buttonText: 'Learn more', href: '/outreach', showOnMobile: true, showOnDesktop: true }
//     ]
//   },
//   intro: {
//     _id: 'welcome',
//     theme: 'white',
//     title: [{ value: 'Welcome to Open Door Christian Community' }],
//     subtitle: [],
//     description: [{ value: 'We are an open, welcoming Christian community that believes God’s love and mercy is for all people.  We invite you to gather with us.' }],
//     links: [{ href: '/about', text: 'Learn more about us' }]
//   },
//   announcements: {
//     _id: 'announcements',
//     theme: 'blue',
//     title: [{ value: 'Announcements' }],
//     subtitle: [{ value: 'Sign up for our mailing list to stay up to date on our latest announcements.' }],
//     description: [],
//     posts: [
//       { _id: '1', header: 'We have some news', date: '2020-05-03T14:29:45.708Z', details: 'Something happend and now we would like to tell you about it. Read this to find out what it is we want to tell you.' },
//       { _id: '2', header: 'This is another announcement', date: '2020-05-02T14:29:45.708Z', details: 'Something happend and now we would like to tell you about it. Read this to find out what it is we want to tell you. If something else happens we will also let you know about that.' },
//       { _id: '3', header: 'We have something to announce', date: '2020-05-01T14:29:45.708Z', details: 'Something happend and now we would like to tell you about it. Read this to find out what it is we want to tell you. If something else happens we will also let you know about that. Something happend and now we would like to tell you about it. Read this to find out what it is we want to tell you. If something else happens we will also let you know about that.' },
//       { _id: '4', header: 'Read this to know what happened', date: '2020-04-30T14:29:45.708Z', details: 'Something happend and now we would like to tell you about it. Read this to find out what it is we want to tell you. If something else happens we will also let you know about that. Something happend and now we would like to tell you about it. Read this to find out what it is we want to tell you.' },
//       { _id: '5', header: 'This is another announcement', date: '2020-04-29T14:29:45.708Z', details: 'Something happend and now we would like to tell you about it. Read this to find out what it is we want to tell you. If something else happens we will also let you know about that.' }
//     ]
//   },
//   activities: {
//     _id: 'activities',
//     theme: 'white',
//     title: [{ value: 'Activities' }],
//     subtitle: [{ value: 'Open Door\'s ministry on campus is constantly growing. We create fun and inclusive events where people from all walks of life are welcome.' }],
//     description: [],
//     carousel: {
//       _id: 'activities',
//       theme: 'blue',
//       cards: [
//         { _id: '1', url: '/images/activities/activities-1.jpg' },
//         { _id: '2', url: '/images/activities/activities-2.jpg' },
//         { _id: '3', url: '/images/activities/activities-3.jpg' },
//         { _id: '4', url: '/images/activities/activities-4.jpg' },
//         { _id: '5', url: '/images/activities/activities-5.jpg' },
//         { _id: '6', url: '/images/activities/activities-6.jpg' },
//         { _id: '7', url: '/images/activities/activities-7.jpg' },
//         { _id: '8', url: '/images/activities/activities-8.jpg' },
//         { _id: '9', url: '/images/activities/activities-9.jpg' },
//         { _id: '10', url: '/images/activities/activities-10.jpg' },
//         { _id: '11', url: '/images/activities/activities-11.jpg' },
//         { _id: '12', url: '/images/activities/activities-12.jpg' },
//         { _id: '13', url: '/images/activities/activities-13.jpg' },
//         { _id: '14', url: '/images/activities/activities-14.jpg' },
//         { _id: '15', url: '/images/activities/activities-15.jpg' },
//         { _id: '16', url: '/images/activities/activities-16.jpg' },
//         { _id: '17', url: '/images/activities/activities-17.jpg' },
//         { _id: '18', url: '/images/activities/activities-18.jpg' },
//         { _id: '19', url: '/images/activities/activities-19.jpg' },
//         { _id: '20', url: '/images/activities/activities-20.jpg' },
//         { _id: '21', url: '/images/activities/activities-21.jpg' },
//         { _id: '22', url: '/images/activities/activities-22.jpg' },
//         { _id: '23', url: '/images/activities/activities-23.jpg' },
//         { _id: '24', url: '/images/activities/activities-24.jpg' },
//         { _id: '25', url: '/images/activities/activities-25.jpg' },
//         { _id: '26', url: '/images/activities/activities-26.jpg' },
//         { _id: '27', url: '/images/activities/activities-27.jpg' },
//         { _id: '28', url: '/images/activities/activities-28.jpg' },
//         { _id: '29', url: '/images/activities/activities-29.jpg' },
//         { _id: '30', url: '/images/activities/activities-30.jpg' },
//         { _id: '31', url: '/images/activities/activities-31.jpg' },
//         { _id: '32', url: '/images/activities/activities-32.jpg' },
//         { _id: '33', url: '/images/activities/activities-33.jpg' }
//       ]
//     }
//   }
// };

export default function Home({ pageSections }) {
  let sections = [];
  const slideshow = pageSections.slideshow;
  const intro = pageSections.intro;
  const announcements = pageSections.announcements;
  const activities = pageSections.activities;
  // const slideshowSection = home.sections.slideshow;
  // const introSection = home.sections.intro;
  // const announcementsSection = home.sections.announcements;
  // const activitiesSection = home.sections.activities;

  if (typeof slideshowSection !== 'undefined') {
    const slideshowList = slideshowSection.slideshowList.sort((a, b) => { a.order - b.order });
    const slideshowListJsx = (
      <div>
        {
          slideshowList.map((slideshow, i) => {
            const key = `${slideshowSection.name}Slideshow-${i}`;

            return (
              <div key={key} className={styles.slideshow}>
                <Slideshow slideshow={slideshow.slideshow} />
              </div>
            )
          })
        }
      </div>
    );

    sections.push({ order: slideshowSection.order, jsx: slideshowListJsx });
  }

  if (typeof introSection !== 'undefined') {
    const links = introSection.links;
    const introJsx = (
      <Section section={introSection}>
        <p className={styles.introLinks}>
          {
            links.map((link, i) => {
              const { text, href } = link;
              const spacer = i > 0 ? ' | ' : '';

              return (
                <span key={`introLink-${i}`} className={styles.link}>
                  {spacer}<a href={href}>{text}</a>
                </span>
              )
            })
          }
        </p>
      </Section>
    );

    sections.push({ order: introSection.order, jsx: introJsx });
  }

  if (typeof announcementsSection !== 'undefined') {
    const posts = announcementsSection.posts;
    const announcementsJsx = (
      <Section section={announcementsSection}>
        <ul className={styles.announcements}>
          {
            posts.map((post, i) => {
              const key = `${announcementsSection.name}Post-${i}`;
              const className = i % 2 === 0 ? styles.leftPost : styles.rightPost;
              const { date, header, details } = post;
              let dateStr = new Date(date).toLocaleDateString();
              if (dateStr === 'Invalid Date' || dateStr === '1970-01-01T00:00:00.000Z') dateStr = '';

              return (
                <li key={key} className={className} >
                  <div className={styles.postHeader}>
                    <h1>{header}</h1>
                    <p>{dateStr}</p>
                  </div>
                  <div className={styles.postDetails}>
                    <p>{details}</p>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </Section>
    );

    sections.push({ order: activitiesSection.order, jsx: announcementsJsx });
  }

  if (typeof activitiesSection !== 'undefined') {
    const carouselList = activitiesSection.carouselList.sort((a, b) => { a.order - b.order });
    const carouselListJsx = (
      <Section section={activitiesSection}>
        {
          carouselList.map((carousel, i) => {
            const key = `${activitiesSection.name}Carousel-${i}`;

            return <Carousel key={key} carousel={carousel.carousel} />
          })
        }
      </Section>
    );

    sections.push({ order: activitiesSection.order, jsx: carouselListJsx });
  }

  sections.sort((a, b) => a.order - b.order);

  return (
    <Layout>
      {sections.map(section => section.jsx)}
    </Layout>



    // <Layout>
    //   <Section section={props.sections[0]}>
    //     <div className={styles.slideshow}>
    //       <Slideshow slideshow={props.sections[0].slideshow} />
    //     </div>
    //   </Section>
    //   <Section section={props.sections[1]}>
    //     <p className={styles.introLinks}>
    //       {props.sections[1].content.links.map((link, i) => {
    //         var spacer = i > 0 ? ' | ' : '';
    //         return (
    //           <span key={`indexIntroLink-${i}`} className={styles.link}>
    //             {spacer}<a href={link.href}>{link.text}</a>
    //           </span>
    //         )
    //       })}
    //     </p>
    //   </Section>
    //   <Section section={props.sections[2]}>
    //     <ul className={styles.announcements}>
    //       {home.announcements.posts.map((post, i) => {
    //         var className = i % 2 === 0 ? styles.leftPost : styles.rightPost;
    //         return (
    //           <li key={`post-${i}`} className={className} >
    //             <div className={styles.postHeader}>
    //               <h1>{post.header}</h1>
    //               <p>{new Date(post.date).toLocaleDateString()}</p>
    //             </div>
    //             <div className={styles.postDetails}>
    //               <p>{post.details}</p>
    //             </div>
    //           </li>
    //         )
    //       })}
    //     </ul>
    //   </Section>
    //   <Section section={props.sections[3]}>
    //     <Carousel carousel={props.sections[3].carousel} />
    //   </Section>
    // </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(process.env.OPEN_DOOR_API + '/pages/home/sections');
  const page = await res.json();
  return {
    props: {
      pageSections: page.sections
    }
  }
}
