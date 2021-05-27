import about from "./about.json"
import icons from "../components/Icons.json"
import { buildSectionList, isDefined, scrollToNextSection } from "../utils/utils"
import Layout from "../components/Layout"
import Section from "../components/Section"
import Timeline from "../components/Timeline"

const PAGE_NAME = "about"

function buildIntroSection(intro) {
  let section
  if (isDefined(intro)) {
    const { order, sectionDetails } = intro
    const introSectionsId = sectionDetails.name
    const introJsx = (
      <Section sectionDetails={sectionDetails}>
        <button className="chevronDown" type="button" onClick={() => scrollToNextSection(introSectionsId)} >
          <i />
        </button>
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
            background-image: url(${icons.chevronDown.blue});
            border-radius: 50%;
            cursor: pointer;
          }
          @media not all and (pointer: coarse) {
            .chevronDown>i:hover, .chevronDown>i:active {
              height: 40px;
              width: 40px;
              background-color: #24316F;
              background-image: url(${icons.chevronDown.white});
            }
          }
        `}
        </style>
      </Section>
    )

    section = {
      order: order,
      name: sectionDetails.name,
      jsx: introJsx,
    }
  }

  return section
}

function buildTimelineSection(timeline) {
  let section
  if (!isDefined(timeline)) {
    const { order, sectionDetails } = timeline
    const timelineJsx = (
      <Section sectionDetails={timeline.sectionDetails}>
        <Timeline timeline={timeline} />
      </Section>
    )

    section = {
      order: order,
      name: sectionDetails.name,
      jsx: timelineJsx,
    }
  }

  return section
}

function buildSections(pageSections) {
  const introSection = buildIntroSection(pageSections.intro)
  const timelineSection = buildTimelineSection(pageSections.timeline)

  return [
    introSection,
    timelineSection,
  ]
}

export default function About() {
  const sectionList = buildSectionList(about.sections, buildSections)

  return (
    <Layout pageDetails={about.pageDetails}>
      {
        sectionList.map(section => {
          const key = `${PAGE_NAME}Section-${section.order}`
          const id = `${section.name}`

          return (
            <div key={key} id={id}>
              {section.jsx}
            </div>
          )
        })
      }
    </Layout>
  )
}
