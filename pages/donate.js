import donate from './donate.json';
import Layout, { isDefined, sortListByOrder } from '../components/Layout';
import Section from '../components/Section';
import Checkout from '../components/Checkout';
import styles from './donate.module.css'
import CheckoutSection from '../components/CheckoutSection';

const PAGE_NAME = 'donate';

function giveOption(option) {
  if (!isDefined(option) || !option)
    return false;

  return true;
}

function buildAnonymityJsx(anonymity) {
  if (!isDefined(anonymity) || !giveOption(anonymity.giveOption))
    return;

  return (
    <p>{anonymity.prompt}</p>
  );
}

function buildCustomizeSection(customize) {
  if (!isDefined(customize))
    return;

  const { order, sectionDetails, amounts, frequencies, anonymity } = customize;
  const anonymityJsx = buildAnonymityJsx(anonymity);
  const customizeJsx = (
    <Section sectionDetails={sectionDetails}>
      <div className={styles.donateSection}>
        <div className={'customize'}>
          <form>
            <p>This form will contain: suggested donation amounts, custom donation amount, frequency (one time, monthly), and payment method (card)</p>
            {/* <p>amounts: {amounts.map((amount, i) => <p key={`amount-${i}`}>{amount}</p>)}</p>
            <p>frequency: {frequencies.map((frequency, i) => <p key={`frequency-${i}`}>{frequency}</p>)}</p> */}
            {anonymityJsx}
          </form>
        </div>
      </div>
      <style jsx>
        {`
          .customize {
            position: relative;
            max-width: 450px;
            margin: auto;
            border-radius: 10px;
            text-align: center;
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

function buildInfoSection(info) {
  if (!isDefined(info))
    return;

  const { order, sectionDetails } = info;
  const infoJsx = (
    <Section sectionDetails={sectionDetails}>
      <div className={styles.donateSection}>
        <div className={'info'}>
          <form className={'infoForm'}>
            <div className={`${styles.formItem} ${styles.half}`}>
              <label>
                First Name:
                <input id={'firstName'} type={'text'} name={'firstName'} placeholder='First Name' />
              </label>
            </div>
            <div className={`${styles.formItem} ${styles.half}`}>
              <label>
                Last Name:
                <input id={'lastName'} type={'text'} name={'lastName'} placeholder={'Last Name'} />
              </label>
            </div>
            <div className={`${styles.formItem} ${styles.full}`}>
              <label>
                Email:
                <input id={'email'} type={'text'} name={'email'} placeholder={'Email'} />
              </label>
            </div>
            <div className={`${styles.formItem} ${styles.full}`}>
              <label>
                Street Address:
                <input id={'address'} type={'text'} name={'address'} placeholder={'Street Address'} />
              </label>
            </div>
            <div className={`${styles.formItem} ${styles.full}`}>
              <label>
                City:
                <input id={'city'} type={'text'} name={'city'} placeholder={'City'} />
              </label>
            </div>
            <div className={`${styles.formItem} ${styles.half}`}>
              <label>
                State:
                <input id={'state'} type={'text'} name={'state'} placeholder={'State'} />
              </label>
            </div>
            <div className={`${styles.formItem} ${styles.half}`}>
              <label>
                Zip Code:
                <input id={'zip'} type={'text'} name={'zip'} placeholder={'Zip Code'} />
              </label>
            </div>
            <div className={`${styles.formItem} ${styles.full}`}>
              <label>
                Country:
                <input id={'country'} type={'text'} name={'country'} placeholder={'Country'} />
              </label>
            </div>
          </form>
        </div>
      </div>
      <style jsx>
        {`
          .info {
            position: relative;
            max-width: 450px;
            margin: auto;
            border-radius: 10px;
            // text-align: center;
          }
          .infoForm {
            max-width: 450px;
            margin: 20px auto 0;
          }
        `}
      </style>
    </Section>
  );

  return {
    order: order,
    name: sectionDetails.name,
    jsx: infoJsx
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
            margin: auto;
            border-radius: 10px;
            text-align: center;
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
  const customizeSection = buildCustomizeSection(pageSections.customize);
  const infoSection = buildInfoSection(pageSections.info);
  const donateSection = buildDonateSection(pageSections.donate);

  return {
    customize: customizeSection,
    info: infoSection,
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
      {/* <CheckoutSection sectionDetails={donate.sections} /> */}
      {/* {
        sectionList.map(section => {
          const key = `${PAGE_NAME}Section-${section.order}`;
          const id = `${section.name}`;

          return (
            <div key={key} id={id}>
              {section.jsx}
            </div>
          );
        })
      } */}
    </Layout>
  );
}