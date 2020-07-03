import fetch from 'node-fetch'
import home from './index.json'
import styles from './index.module.css'
import Layout from '../components/Layout'
import Slideshow from '../components/Slideshow'
import Section from '../components/Section'
import Carousel from '../components/Carousel'
import Announcements from '../components/Announcements'

const PAGE_NAME = 'home';

function isDefined(a) {
  if (typeof a !== 'undefined')
    return true;

  return false;
}

function sortListByOrder(list) {
  return list.sort((a, b) => a.order - b.order);
}

function buildSlideshowSection(slideshow) {
  if (!isDefined(slideshow))
    return;

  const slideshowList = sortListByOrder(slideshow.slideshowList);
  const slideshowListJsx = (
    <div>
      {
        slideshowList.map((slideshowListItem, i) => {
          const key = `${slideshowListItem.name}Slideshow-${i}`;

          return (
            <div key={key} className={styles.slideshow}>
              <Slideshow slideshow={slideshowListItem.slideshow} />
            </div>
          );
        })
      }
    </div>
  );

  return {
    order: slideshow.order,
    jsx: slideshowListJsx
  };
}

function buildIntroLinks(links) {
  if (!isDefined(links))
    return '';

  return (
    <p className={styles.introLinks}>
      {
        links.map((link, i) => {
          const key = `introLink-${i}`;
          const { text, href } = link;
          const spacer = i > 0 ? ' | ' : '';

          return (
            <span key={key} className={styles.link}>
              {spacer}<a href={href}>{text}</a>
            </span>
          );
        })
      }
    </p>
  );
}

function buildIntroSection(intro) {
  if (!isDefined(intro))
    return;

  const introLinkJsx = buildIntroLinks(intro.links);
  const introJsx = (
    <Section sectionDetails={intro.sectionDetails}>
      {introLinkJsx}
    </Section>
  );

  return {
    order: intro.order,
    jsx: introJsx
  };
}

function buildNewsSection(news) {
  if (!isDefined(news))
    return;

  //const posts = announcements.posts
  // put sortListByDate(list) {} in announcements component.

  const announcementsList = sortListByOrder(news.announcementsList);
  const announcementsListJsx = (
    <Section sectionDetails={news.sectionDetails}>
      {
        announcementsList.map((announcementsListItem, i) => {
          const key = `${news.name}Announcements-${i}`;

          return <Announcements key={key} announcements={announcementsListItem.announcements} />
        })
      }
    </Section>
  );

  return {
    order: news.order,
    jsx: announcementsListJsx
  };
}

function buildActivitiesSection(activities) {
  if (!isDefined(activities))
    return;

  const carouselList = sortListByOrder(activities.carouselList);
  const carouselListJsx = (
    <Section sectionDetails={activities.sectionDetails}>
      {
        carouselList.map((carouselListItem, i) => {
          const key = `${activities.name}Carousel-${i}`;

          return <Carousel key={key} carousel={carouselListItem.carousel} />
        })
      }
    </Section>
  );

  return {
    order: activities.order,
    jsx: carouselListJsx
  };
}

function buildSections(pageSections) {
  const slideshowSection = buildSlideshowSection(pageSections.slideshow);
  const introSection = buildIntroSection(pageSections.intro);
  const newsSection = buildNewsSection(pageSections.news);
  const activitiesSection = buildActivitiesSection(pageSections.activities);

  return {
    slideshow: slideshowSection,
    intro: introSection,
    news: newsSection,
    activities: activitiesSection
  };
}

function buildSectionList(pageSections) {
  if (!isDefined(pageSections))
    return;

  const sections = buildSections(pageSections);
  let sectionList = [];
  for (const s in sections)
    if (isDefined(sections[s]))
      sectionList.push({ order: sections[s].order, jsx: sections[s].jsx });

  sectionList = sortListByOrder(sectionList);

  return sectionList;
}

export default function Home({ pageSections }) {
  const sectionList = buildSectionList(home.sections);

  return (
    <Layout>
      {
        sectionList.map(section => {
          const key = `${PAGE_NAME}Section-${section.order}`;

          return (
            <div key={key} id={key}>
              {section.jsx}
            </div>
          );
        })
      }
    </Layout>
  );
}

// export async function getStaticProps() {
//   const res = await fetch(process.env.OPEN_DOOR_API + `/pages/${PAGE_NAME}/sections`);
//   const page = await res.json();
//   return {
//     props: {
//       pageSections: page.sections
//     }
//   };
// }
