import donate from './donate.json'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import Layout, { isDefined, sortListByOrder, ICONS, getTheme } from '../components/Layout'
import Section from '../components/Section'

const PAGE_NAME = 'donate';

const stripePromise = loadStripe(process.env.STRIPE_PK);

function getCardSectionTheme(cardElement) {
  let theme;
  if (isDefined(cardElement))
    theme = cardElement.theme;

  return getTheme(theme);
}

function buildDonateSection(donate) {
  if (!isDefined(donate))
    return;

  const { order, sectionDetails, cardElement } = donate;
  const theme = getCardSectionTheme(cardElement);
  // const stripe = useStripe();
  const donateJsx = (
    <Section sectionDetails={sectionDetails}>
      <div className={`${theme} donate`}>
        <Elements stripe={stripePromise}>
          <form>
            <CardElement />
            <button type={'submit'} disable={!useStripe()}>Donate</button>
          </form>
        </Elements>
        <div className={'stripeBadge'}>
          <i></i>
        </div>
      </div>
      <style jsx>
        {`
          .white {
            background-color: #fff;
          }
          .blue {
            background-color: #24316F;
          }
          .donate {
            position: relative;
            height: 210px;
            max-width: 450px;
            margin-top: 20px;
            border-radius: 10px;
            text-align: center;
          }
          .stripeBadge {
            position: relative;
            height: 30px;
            max-width: 100px;
            margin: auto;
          }
          .stripeBadge>i {
            position: absolute;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
            -moz-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            -o-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            transition-duration: .3s;
          }
          .white .stripeBadge>i {
            background-image: url(${ICONS.stripe.solidDark});
          }
          .blue .stripeBadge>i {
            background-image: url(${ICONS.stripe.solidLight});
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