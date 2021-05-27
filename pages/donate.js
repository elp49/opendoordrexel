import donate from "./donate.json"
import { buildSectionList, isDefined } from "../utils/utils"
import Layout from "../components/Layout"
import Section from "../components/Section"

const PAGE_NAME = "donate"

function buildInfoSection(info) {
  let section
  if (!isDefined(info)) {
    const { order, sectionDetails } = info
    const infoJsx = <Section sectionDetails={sectionDetails} />

    section = {
      order: order,
      name: sectionDetails.name,
      jsx: infoJsx,
    }
  }

  return section
}

function buildSections(pageSections) {
  const infoSection = buildInfoSection(pageSections.info)

  return [
    infoSection,
  ]
}

export default function Donate() {
  const sectionList = buildSectionList(donate.sections, buildSections)

  return (
    <Layout pageDetails={donate.pageDetails}>
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
