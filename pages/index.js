// import fetch from "node-fetch"
import home from "./index.json"
import { buildSectionList, isDefined, sortListByOrder } from "../utils/utils"
import Layout from "../components/Layout"
import Slideshow from "../components/Slideshow"
import Section from "../components/Section"
import Carousel from "../components/Carousel"
import Announcements from "../components/Announcements"

const PAGE_NAME = "home"

function buildWelcomeSection(welcome) {
  let section
  if (isDefined(welcome)) {
    const { order, sectionDetails, slideshowList } = welcome
    const orderedList = sortListByOrder(slideshowList)
    const welcomeJsx = (
      <Section sectionDetails={sectionDetails} isRaw isViewHeight>
        {
          orderedList.map((slideshowListItem, i) => {
            const { slideshow } = slideshowListItem
            const key = `${slideshow.name}Slideshow-${i}`

            return <Slideshow key={key} slideshow={slideshow} />
          })
        }
      </Section>
    )

    section = {
      order: order,
      name: sectionDetails.name,
      jsx: welcomeJsx,
    }
  }

  return section
}

function buildIntroLinks(links) {
  let linkJsx
  if (isDefined(links)) {
    linkJsx = (
      <p className="introLinks">
        {
          links.map((link, i) => {
            const key = `introLink-${i}`
            const { text, href } = link
            const spacer = i > 0 ? " | " : ""

            return (
              <span key={key} className="link">
                {spacer}<a href={href}>{text}</a>
              </span>
            )
          })
        }
        <style jsx>
          {`
          .introLinks {
            text-align: center;
          }
          .link {
            color: #24316F;
            font-size: 2rem;
            font-weight: bold;
            text-decoration: none;
            transition-duration: .5s;
          }
          .link>a:visited {
            color: #24316F;
          }
          @media not all and (pointer: coarse) {
            .link>a:hover, .link>a:focus {
              color: #818181;
              text-decoration: underline;
              opacity: 1;
            }
          }
        `}
        </style>
      </p>
    )
  }

  return linkJsx
}

function buildIntroSection(intro) {
  let section
  if (isDefined(intro)) {
    const { order, sectionDetails, links } = intro
    const introLinkJsx = buildIntroLinks(links)
    const introJsx = (
      <Section sectionDetails={sectionDetails}>
        {introLinkJsx}
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

function buildActivitiesSection(activities) {
  let section
  if (isDefined(activities)) {
    const { order, sectionDetails } = activities
    const { sectionName } = sectionDetails
    const activitiesList = sortListByOrder(activities.activitiesList)
    const carouselList = sortListByOrder(activities.carouselList)
    const activitiesJsx = (
      <Section sectionDetails={sectionDetails}>
        {
          carouselList.map((carouselListItem, i) => {
            const key = `${sectionName}Carousel-${i}`
            return <Carousel key={key} carousel={carouselListItem.carousel} />
          })
        }
        {
          activitiesList.map((activitiesListItem, i) => {
            const key = `${sectionName}Activites-${i}`
            return <Announcements key={key} announcements={activitiesListItem.activities} />
          })
        }
      </Section>
    )

    section = {
      order: order,
      name: sectionName,
      jsx: activitiesJsx,
    }
  }

  return section
}

function buildSections(pageSections) {
  const welcomeSection = buildWelcomeSection(pageSections.welcome)
  const introSection = buildIntroSection(pageSections.intro)
  const activitiesSection = buildActivitiesSection(pageSections.activities)

  return [
    welcomeSection,
    introSection,
    activitiesSection,
  ]
}

// export default function Home({ pageSections }) {
export default function Home() {
  const sectionList = buildSectionList(home.sections, buildSections)

  return (
    <Layout pageDetails={home.pageDetails}>
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

// export async function getStaticProps() {
//   //   const res = await fetch(process.env.OPEN_DOOR_API + `/pages/${PAGE_NAME}/sections`)
//   //   const page = await res.json()
//   return {
//     props: {
//       page: home,
//     },
//   }
// }
