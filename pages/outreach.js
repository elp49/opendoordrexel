import outreach from "./outreach.json"
import { buildSectionList, isDefined, sortListByOrder } from "../utils/utils"
import Layout from "../components/Layout"
import Section from "../components/Section"
import Carousel from "../components/Carousel"

const PAGE_NAME = "outreach"

function buildCarouselSection(carousel) {
  let section
  if (isDefined(carousel)) {
    const { order, sectionDetails, carouselList } = carousel
    const orderedList = sortListByOrder(carouselList)
    const carouselListJsx = (
      <Section sectionDetails={sectionDetails}>
        {
          orderedList.map((carouselListItem, i) => {
            const key = `${sectionDetails.name}Carousel-${i}`
            return <Carousel key={key} carousel={carouselListItem.carousel} />
          })
        }
      </Section>
    )

    section = {
      order: order,
      name: sectionDetails.name,
      jsx: carouselListJsx,
    }
  }

  return section
}

function buildSections(pageSections) {
  const introSection = buildCarouselSection(pageSections.intro)
  const donationsSection = buildCarouselSection(pageSections.donations)

  return [
    introSection,
    donationsSection,
  ]
}

export default function Outreach() {
  const sectionList = buildSectionList(outreach.sections, buildSections)

  return (
    <Layout pageDetails={outreach.pageDetails}>
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
