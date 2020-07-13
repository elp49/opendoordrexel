import testimonies from './testimonies.json'
import Layout, { isDefined, sortListByOrder } from '../components/Layout'
import Section from '../components/Section'

const PAGE_NAME = 'testimonies';

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
      <style jsx>{``}</style>
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
    name: intro.sectionDetails.name,
    jsx: introJsx
  };
}

function buildTestimoniesSection(testimonies) {
  if (!isDefined(testimonies))
    return;

  // const testimonyList = sortListByOrder(testimonies.testimonyList);
  // const testimonyListJsx = (
  //   <Section sectionDetails={testimonies.sectionDetails}>
  //     <Testimonies testimonies={testimonyList} />
  //   </Section>
  // );
  const testimonyListJsx = <div></div>;

  return {
    order: testimonies.order,
    name: testimonies.sectionDetails.name,
    jsx: testimonyListJsx
  };
}

function buildSections(pageSections) {
  const introSection = buildIntroSection(pageSections.intro);
  const testimoniesSection = buildTestimoniesSection(pageSections.testimonies);

  return {
    intro: introSection,
    testimonies: testimoniesSection
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
    <Layout>
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
