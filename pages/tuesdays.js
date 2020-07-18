import tuesdays from './tuesdays.json'
import Layout, { isDefined, sortListByOrder } from '../components/Layout'
import Section from '../components/Section'
import Carousel from '../components/Carousel';

const PAGE_NAME = 'tuesdays';

function buildCarouselSection(section) {
  if (!isDefined(section))
    return;

  const { order, sectionDetails } = section;
  const carouselList = sortListByOrder(section.carouselList);
  const carouselListJsx = (
    <Section sectionDetails={sectionDetails}>
      {
        carouselList.map((carouselListItem, i) => {
          const key = `${sectionDetails.name}Carousel-${i}`;

          return <Carousel key={key} carousel={carouselListItem.carousel} />
        })
      }
    </Section>
  );

  return {
    order: order,
    name: sectionDetails.name,
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
      sectionList.push(sections[s]);

  sectionList = sortListByOrder(sectionList);

  return sectionList;
}

export default function Tuesdays() {
  const sectionList = buildSectionList(tuesdays.sections);

  return (
    <Layout pageDetails={tuesdays.pageDetails}>
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
