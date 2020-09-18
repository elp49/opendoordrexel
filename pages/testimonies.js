import testimonies from './testimonies.json';
import Layout, { isDefined, sortListByOrder, getTheme } from '../components/Layout';
import Section from '../components/Section';
import VideoCarousel from '../components/VideoCarousel'

const PAGE_NAME = 'testimonies';

function buildIntroSection(intro) {
  if (!isDefined(intro))
    return;

  const { order, sectionDetails } = intro;
  const videoCarouselList = sortListByOrder(intro.videoCarouselList);
  const introJsx = (
    <Section sectionDetails={sectionDetails}>
      {
        videoCarouselList.map((listItem, i) => {
          const key = `${sectionDetails.name}VideoCarousel-${i}`;

          return <VideoCarousel key={key} videoCarousel={listItem.videoCarousel} />;
        })
      }
    </Section>
  );

  return {
    order: order,
    name: sectionDetails.name,
    jsx: introJsx
  };
}

function buildSections(pageSections) {
  const introSection = buildIntroSection(pageSections.intro);

  return {
    intro: introSection
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

export default function Testimonies() {
  const sectionList = buildSectionList(testimonies.sections);

  return (
    <Layout pageDetails={testimonies.pageDetails}>
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
