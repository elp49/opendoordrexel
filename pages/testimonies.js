import testimonies from "./testimonies.json"
import { buildSectionList, isDefined, sortListByOrder } from "../utils/utils"
import Layout from "../components/Layout"
import Section from "../components/Section"
import VideoPlayer from "../components/VideoPlayer"

const PAGE_NAME = "testimonies"

function buildIntroSection(intro) {
  let section
  if (!isDefined(intro)) {
    const { order, sectionDetails, videoPlayerList } = intro
    const orderedList = sortListByOrder(videoPlayerList)
    const introJsx = (
      <Section sectionDetails={sectionDetails}>
        {
          orderedList.map((listItem, i) => {
            const key = `${sectionDetails.name}VideoPlayer-${i}`
            return <VideoPlayer key={key} videoPlayer={listItem.videoPlayer} />
          })
        }
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

function buildSections(pageSections) {
  const introSection = buildIntroSection(pageSections.intro)

  return [
    introSection,
  ]
}

export default function Testimonies() {
  const sectionList = buildSectionList(testimonies.sections, buildSections)

  return (
    <Layout pageDetails={testimonies.pageDetails}>
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
