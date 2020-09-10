import staff from './staff.json';

import Layout, { isDefined, sortListByOrder } from '../components/Layout';
import Section from '../components/Section';

const PAGE_NAME = 'staff';

function buildMinisterSection(minister) {
  if (!isDefined(minister))
    return;

  const { order, sectionDetails, image } = minister;
  const ministerJsx = <Section sectionDetails={sectionDetails}></Section>;

  return {
    order: order,
    name: sectionDetails.name,
    jsx: ministerJsx
  };
}

function buildSections(pageSections) {
  const piltzSection = buildMinisterSection(pageSections.piltz);
  const dianaSection = buildMinisterSection(pageSections.diana);

  return {
    piltz: piltzSection,
    diana: dianaSection,
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

export default function Staff() {
  const sectionList = buildSectionList(staff.sections);

  return (
    <Layout pageDetails={staff.pageDetails}>
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
