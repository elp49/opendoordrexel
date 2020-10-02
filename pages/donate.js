import donate from './donate.json';
import Layout, { isDefined, sortListByOrder } from '../components/Layout';
import Section from '../components/Section';

const PAGE_NAME = 'donate';

function buildInfoSection(info) {
  if (!isDefined(info))
    return;

  const { order, sectionDetails } = info;
  const infoJsx = (
    <Section sectionDetails={sectionDetails}>
    </Section>
  );

  return {
    order: order,
    name: sectionDetails.name,
    jsx: infoJsx
  };
}

function buildSections(pageSections) {
  const infoSection = buildInfoSection(pageSections.info);

  return {
    info: infoSection,
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

export default function Donate() {
  const sectionList = buildSectionList(donate.sections);

  return (
    <Layout pageDetails={donate.pageDetails}>
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
