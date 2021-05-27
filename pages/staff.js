import staff from "./staff.json"
import { buildSectionList, isDefined } from "../utils/utils"
import Layout from "../components/Layout"
import Section from "../components/Section"

const PAGE_NAME = "staff"

function buildMinisterSection(minister) {
  let section
  if (!isDefined(minister)) {
    const { order, sectionDetails } = minister
    const ministerJsx = <Section sectionDetails={sectionDetails} />

    section = {
      order: order,
      name: sectionDetails.name,
      jsx: ministerJsx,
    }
  }

  return section
}

function buildSections(pageSections) {
  const piltzSection = buildMinisterSection(pageSections.piltz)
  const dianaSection = buildMinisterSection(pageSections.diana)

  return [
    piltzSection,
    dianaSection,
  ]
}

export default function Staff() {
  const sectionList = buildSectionList(staff.sections, buildSections)

  return (
    <Layout pageDetails={staff.pageDetails}>
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
