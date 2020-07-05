import outreach from './outreach.json'
import Layout, { isDefined, sortListByOrder } from '../components/Layout'
import Section from '../components/Section'
import Carousel from '../components/Carousel'

const PAGE_NAME = 'outreach';

function buildIntroSection(intro) {
  if (!isDefined(intro))
    return;

  const carouselList = sortListByOrder(intro.carouselList);
  const carouselListJsx = (
    <Section sectionDetails={intro.sectionDetails}>
      {
        carouselList.map((carouselListItem, i) => {
          const key = `${intro.name}Carousel-${i}`;

          return <Carousel key={key} carousel={carouselListItem.carousel} />
        })
      }
    </Section>
  );

  return {
    order: intro.order,
    jsx: carouselListJsx
  };
}

function buildDonationsSection(donations) {
  if (!isDefined(donations))
    return;

  const carouselList = sortListByOrder(donations.carouselList);
  const carouselListJsx = (
    <Section sectionDetails={donations.sectionDetails}>
      {
        carouselList.map((carouselListItem, i) => {
          const key = `${donations.name}Carousel-${i}`;

          return <Carousel key={key} carousel={carouselListItem.carousel} />
        })
      }
    </Section>
  );

  return {
    order: donations.order,
    jsx: carouselListJsx
  };
}

function buildSections(pageSections) {
  const introSection = buildIntroSection(pageSections.intro);
  const donationsSection = buildDonationsSection(pageSections.donations);

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
  for (const s in sections) {

    if (isDefined(sections[s])) {

      const { order, jsx } = sections[s];
      if (isDefined(order) && isDefined(jsx))
        sectionList.push({ order: order, jsx: jsx });

    }

  }

  sortListByOrder(sectionList);

  return sectionList;
}

export default function Outreach() {
  const sectionList = buildSectionList(outreach.sections);

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
