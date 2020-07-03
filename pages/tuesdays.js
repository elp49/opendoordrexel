import tuesdays from './tuesdays.json'
import styles from './tuesdays.module.css'
import Layout from '../components/Layout'
import Section from '../components/Section'
import Carousel from '../components/Carousel';

const PAGE_NAME = 'tuesdays';

function isDefined(a) {
  if (typeof a !== 'undefined')
    return true;

  return false;
}

function sortListByOrder(list) {
  return list.sort((a, b) => a.order - b.order);
}

function buildCarouselSection(section) {
  if (!isDefined(section))
    return;

  const carouselList = sortListByOrder(section.carouselList);
  const carouselListJsx = (
    <Section sectionDetails={section.sectionDetails}>
      {
        carouselList.map((carouselListItem, i) => {
          const key = `${section.name}Carousel-${i}`;

          return <Carousel key={key} carousel={carouselListItem.carousel} />
        })
      }
    </Section>
  );

  return {
    order: section.order,
    jsx: carouselListJsx
  };
}

function buildSections(pageSections) {
  const dinnerSection = buildCarouselSection(pageSections.dinner);
  const worshipSection = buildCarouselSection(pageSections.worship);

  return {
    dinner: dinnerSection,
    worship: worshipSection
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

export default function Tuesdays() {
  const sectionList = buildSectionList(tuesdays.sections);

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
