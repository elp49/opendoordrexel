import about from './about.json';
import Layout, { isDefined, sortListByOrder, ICONS, scrollToNextSection } from '../components/Layout';
import Section from '../components/Section';
import Timeline from '../components/Timeline';

const PAGE_NAME = 'about';

function buildIntroSection(intro) {
  if (!isDefined(intro))
    return;

  const { order, sectionDetails } = intro;
  const introSectionsId = sectionDetails.name;
  const introJsx = (
    <Section sectionDetails={sectionDetails}>
      <div className={'chevronDown'} onClick={() => scrollToNextSection(introSectionsId)}>
        <i></i>
      </div>
      <style jsx>
        {`
          .chevronDown {
            position: relative;
            display: block;
            height: 45px;
            width: 45px;
            margin: auto;
          }
          .chevronDown>i {
            position: absolute;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
            -moz-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            -o-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            transition-duration: .3s;
            height: 30px;
            width: 30px;
            background-color: #eee;
            background-image: url(${ICONS.chevronDown.blue});
            border-radius: 50%;
            cursor: pointer;
          }
          @media not all and (pointer: coarse) {
            .chevronDown>i:hover, .chevronDown>i:active {
              height: 40px;
              width: 40px;
              background-color: #24316F;
              background-image: url(${ICONS.chevronDown.white});
            }
          }
        `}
      </style>
    </Section>
  );

  return {
    order: order,
    name: sectionDetails.name,
    jsx: introJsx
  };
}

function buildTimelineSection(timeline) {
  if (!isDefined(timeline))
    return;

  const { order, sectionDetails } = timeline;
  const timelineJsx = (
    <Section sectionDetails={timeline.sectionDetails}>
      <Timeline timeline={timeline} />
    </Section>
  );

  return {
    order: order,
    name: sectionDetails.name,
    jsx: timelineJsx
  };
}

function buildSections(pageSections) {
  const introSection = buildIntroSection(pageSections.intro);
  const timelineSection = buildTimelineSection(pageSections.timeline);

  return {
    intro: introSection,
    timeline: timelineSection,
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

export default function About() {
  const sectionList = buildSectionList(about.sections);

  return (
    <Layout pageDetails={about.pageDetails}>
      {
        sectionList.map(section => {
          // const key = `${PAGE_NAME}Section-${section.order}`;
          const id = `${section.name}`;

          return (
            <div key={id} id={id}>
              {section.jsx}
            </div>
          );
        })
      }
    </Layout>
  );
}
