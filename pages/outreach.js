import outreach from './outreach.json'
import Layout, { isDefined, sortListByOrder } from '../components/Layout'
import Section from '../components/Section'
import Carousel from '../components/Carousel'

const PAGE_NAME = 'outreach';

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
    name: section.sectionDetails.name,
    jsx: carouselListJsx
  };
}

function buildSections(pageSections) {
  const introSection = buildCarouselSection(pageSections.intro);
  const donationsSection = buildCarouselSection(pageSections.donations);

  return {
    intro: introSection,
    donations: donationsSection,
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

  sortListByOrder(sectionList);

  return sectionList;
}

export default function Outreach() {
  const sectionList = buildSectionList(outreach.sections);

  return (
    <Layout pageDetails={outreach.pageDetails}>
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
