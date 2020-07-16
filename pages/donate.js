import donate from './donate.json'
import Layout, { isDefined, sortListByOrder } from '../components/Layout'
import Section from '../components/Section'

const PAGE_NAME = 'donate';

function buildDonateSection(donate) {
  if (!isDefined(donate))
    return;

  const donateJsx = (
    <Section sectionDetails={donate.sectionDetails}>
      <p>This is from the donation section</p>
    </Section>
  );

  return {
    order: donate.order,
    name: donate.sectionDetails.name,
    jsx: donateJsx
  };
}

function buildSections(pageSections) {
  const donateSection = buildDonateSection(pageSections.donate);

  return {
    donate: donateSection,
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
    <Layout isDonationPage={true}>
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