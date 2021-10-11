import fetch from 'node-fetch';
import home from './index.json';
import Layout, { isDefined, sortListByOrder } from '../components/Layout';
import Slideshow from '../components/Slideshow';
import Section from '../components/Section';
import Carousel from '../components/Carousel';
import Announcements from '../components/Announcements';

const PAGE_NAME = 'home';

function buildWelcomeSection(welcome) {
  if (!isDefined(welcome))
    return;

  const { order, sectionDetails } = welcome;
  const slideshowList = sortListByOrder(welcome.slideshowList);
  const welcomeJsx = (
    <Section sectionDetails={sectionDetails} isRaw={true} isViewHeight={true}>
      {
        slideshowList.map((slideshowListItem, i) => {
          const { slideshow } = slideshowListItem;
          const key = `${slideshow.name}Slideshow-${i}`;

          return <Slideshow key={key} slideshow={slideshow} />;
        })
      }
    </Section>
  );

  return {
    order: order,
    name: sectionDetails.name,
    jsx: welcomeJsx
  };
}

function buildIntroLinks(links) {
  if (!isDefined(links))
    return '';

  return (
    <p className={'introLinks'}>
      {
        links.map((link, i) => {
          const key = `introLink-${i}`;
          const { text, href } = link;
          const spacer = i > 0 ? ' | ' : '';

          return (
            <span key={key} className={'link'}>
              {spacer}<a href={href}>{text}</a>
            </span>
          );
        })
      }
      <style jsx>
        {`
          .introLinks {
            text-align: center;
          }
          .link {
            color: #24316F;
            font-size: 2rem;
            font-weight: bold;
            text-decoration: none;
            transition-duration: .5s;
          }
          .link>a:visited {
            color: #24316F;
          }
          @media not all and (pointer: coarse) {
            .link>a:hover, .link>a:focus {
              color: #818181;
              text-decoration: underline;
              opacity: 1;
            }
          }
        `}
      </style>
    </p>
  );
}

function buildIntroSection(intro) {
  if (!isDefined(intro))
    return;

  const { order, sectionDetails } = intro;
  const introLinkJsx = buildIntroLinks(intro.links);
  const introJsx = (
    <Section sectionDetails={sectionDetails}>
      {introLinkJsx}
    </Section>
  );

  return {
    order: order,
    name: sectionDetails.name,
    jsx: introJsx
  };
}

function buildActivitiesSection(activities) {
  if (!isDefined(activities))
    return;

  const { order, sectionDetails } = activities;
  const activitiesList = sortListByOrder(activities.activitiesList);
  const carouselList = sortListByOrder(activities.carouselList);
  const activitiesJsx = (
    <Section sectionDetails={sectionDetails}>
      {
        carouselList.map((carouselListItem, i) => {
          const key = `${sectionDetails.name}Carousel-${i}`;

          return <Carousel key={key} carousel={carouselListItem.carousel} />;
        })
      }
      {
        /* activitiesList.map((activitiesListItem, i) => {
          const key = `${sectionDetails.name}Activites-${i}`;

          return <Announcements key={key} announcements={activitiesListItem.activities} />;
        }) */
      }
    </Section>
  );

  return {
    order: order,
    name: sectionDetails.name,
    jsx: activitiesJsx
  };
}

function buildSections(pageSections) {
  const welcomeSection = buildWelcomeSection(pageSections.welcome);
  const introSection = buildIntroSection(pageSections.intro);
  const activitiesSection = buildActivitiesSection(pageSections.activities);

  return {
    welcome: welcomeSection,
    intro: introSection,
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
      sectionList.push(sections[s]);

  sectionList = sortListByOrder(sectionList);

  return sectionList;
}

export default function Home({ pageSections }) {
  const sectionList = buildSectionList(home.sections);

  return (
    <Layout pageDetails={home.pageDetails}>
      {
        sectionList.map(section => {
          const key = `${PAGE_NAME}Section-${section.order}`;
          const id = `${section.name}`;

          return (
            <div key={key} id={id}>
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
