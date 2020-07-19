import donate from './donate.json';
import Layout, { isDefined, sortListByOrder } from '../components/Layout';
import Section from '../components/Section';
import Checkout from '../components/Checkout';

const PAGE_NAME = 'donate';

function buildDonateSection(donate) {
  if (!isDefined(donate))
    return;

  const { order, sectionDetails, cardElement } = donate;
  const donateJsx = (
    <Section sectionDetails={sectionDetails}>
      <div className={'donate'}>
        <Checkout cardElement={cardElement} />
      </div>
      <style jsx>
        {`
          .donate {
            position: relative;
            height: 210px;
            max-width: 450px;
            margin-top: 20px;
            border-radius: 10px;
            text-align: center;
          }
          @media only screen and (min-width: 1000px) {
            .donate {
              margin: 55px auto;
            }
          }
        `}
      </style>
    </Section>
  );

  return {
    order: order,
    name: sectionDetails.name,
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