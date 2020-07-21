import donate from './donate.json';
import Layout, { isDefined, sortListByOrder } from '../components/Layout';
import Section from '../components/Section';
import Checkout from '../components/Checkout';
import styles from './donate.module.css'

const PAGE_NAME = 'donate';

function buildCustomizeSection(customize) {
  if (!isDefined(customize))
    return;

  const { order, sectionDetails, amounts, frequencies, methods } = customize;
  const customizeJsx = (
    <Section sectionDetails={sectionDetails}>
      <div className={styles.donateSection}>
        <div className={'customize'}>
          <form>
            <p>This form will contain: suggested donation amounts, custom donation amount, frequency (one time, monthly), and payment method (card)</p>
            <p>amounts: {amounts.map(amount => <p>{amount}</p>)}</p>
            <p>frequency: {frequencies.map(frequency => <p>{frequency}</p>)}</p>
            <p>method: {methods.map(method => <p>{method}</p>)}</p>
          </form>
        </div>
      </div>
      <style jsx>
        {`
          .customize {
            position: relative;
            max-width: 450px;
            margin-top: 20px;
            background-color: #24316F;
            border-radius: 10px;
            text-align: center;
          }
          @media only screen and (min-width: 1000px) {
            .customize {
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
    jsx: customizeJsx
  };
}

function buildDonateSection(donate) {
  if (!isDefined(donate))
    return;

  const { order, sectionDetails, cardElement } = donate;
  const donateJsx = (
    <Section sectionDetails={sectionDetails}>
      <div className={styles.donateSection}>
        <div className={'donate'}>
          <Checkout cardElement={cardElement} />
        </div>
      </div>
      <style jsx>
        {`
          .donate {
            position: relative;
            height: 210px;
            max-width: 450px;
            margin-top: 20px;
            background-color: #ccc;
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
  const customizeSection = buildCustomizeSection(pageSections.customize);

  return {
    customize: customizeSection,
    donate: donateSection
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