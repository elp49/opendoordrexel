import { useEffect } from "react"
import Head from "next/head"
import layout from "./Layout.json"
import icons from "./Icons.json"
import Overlay from "./Overlay"
import styles from "./Layout.module.css"
import { isDefined, getTheme, sortListByOrder, DEFAULT_THEME, THEME_LIST } from "../utils/utils"

const WHITE = "#fff"
const BLUE = "#24316F"
const DEFAULT_PAGE_TITLE = "Open Door Christian Community"

function getPageDetails(pageDetails) {
  const details = {
    pageTitle: DEFAULT_PAGE_TITLE,
  }
  if (isDefined(pageDetails) && isDefined(pageDetails.title))
    details.pageTitle = `${pageDetails.title} | ${DEFAULT_PAGE_TITLE}`

  return details
}

function toggleOverlay(id) {
  document.getElementById(id).classList.toggle(styles.layoutFixed)
  document.getElementById(`${id}Overlay`).classList.toggle(styles.overlayActive)
}

function getLastSection(layoutChildren) {
  let section
  if (isDefined(layoutChildren))
    for (let i = layoutChildren.length - 1; i >= 0; i--) {
      const child = layoutChildren[i]
      if (isDefined(child) && isDefined(child.props) && isDefined(child.props.children) && isDefined(child.props.children.props))
        section = child.props.children.props
    }

  return section
}

function getLastSectionTheme(layoutChildren) {
  let theme = DEFAULT_THEME
  const lastSection = getLastSection(layoutChildren)
  if (isDefined(lastSection) && isDefined(lastSection.sectionDetails) && isDefined(lastSection.sectionDetails.theme) && THEME_LIST.includes(lastSection.sectionDetails.theme))
    ({ theme } = lastSection.sectionDetails)

  return theme
}

function getFooterTheme(lastSectionTheme) {
  let theme = DEFAULT_THEME
  if (lastSectionTheme === DEFAULT_THEME)
    theme = THEME_LIST[1]

  return theme
}

function getThemeColor(theme) {
  let color = WHITE
  if (theme === "blue")
    color = BLUE

  return color
}

function setBackgroundColor(theme) {
  const color = getThemeColor(theme)
  document.getElementsByTagName("html")[0].style.backgroundColor = color
  document.getElementsByTagName("body")[0].style.backgroundColor = color
}

export async function componentDidMount(footerTheme) {
  if (isDefined(window))
    setBackgroundColor(footerTheme)
}

export default function Layout({ children, pageDetails }) {
  const id = isDefined(layout.name) ? layout.name : "layout"
  const theme = isDefined(layout.themes) ? getTheme(layout.themes.layout) : DEFAULT_THEME
  const { pageTitle } = getPageDetails(pageDetails)
  const pageList = sortListByOrder(layout.pageList)
  const socialMedia = sortListByOrder(layout.socialMedia)
  const lastSectionTheme = getLastSectionTheme(children)
  const footerTheme = getFooterTheme(lastSectionTheme)
  const { donate, mailingList } = layout
  const { contact } = layout.footer

  useEffect(() => {
    componentDidMount(footerTheme)
  }, [footerTheme])

  return (
    <div id={id} className={styles.layout}>
      <Head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header className={theme}>
        <div className={styles.header}>
          <div className={styles.headerLogo}>
            <a href="/" title="Open Door">
              <i alt="Open Door" className="logo" />
            </a>
          </div>
          <div className={styles.hamburgerContainer}>
            <button className={styles.hamburger} type="button" onClick={() => { toggleOverlay(id) }}>
              <span />
              <span />
              <span />
            </button>
          </div>
          <ol className={styles.headerPageList}>
            {
              pageList.map((page, i) => {
                const key = `${id}HeaderPage-${i}`
                const { order, title, href } = page

                return (
                  <li key={key} value={order}>
                    <a href={href} title={title}>
                      {title}
                    </a>
                  </li>
                )
              })
            }
          </ol>
        </div>
      </header>
      <div id={`${id}Overlay`} className={styles.overlay}>
        <Overlay overlay={layout} />
      </div>
      {children}
      <div className={lastSectionTheme}>
        <div className={styles.container}>
          <ol className={styles.socialMedia}>
            {
              socialMedia.map((media, i) => {
                const key = `${id}FooterMedia-${i}`
                const { order, name, href } = media

                return (
                  <li key={key} value={order}>
                    <a href={href} title={name} target="_blank" rel="noreferrer" >
                      <i className={name.toLowerCase()} />
                    </a>
                  </li>
                )
              })
            }
          </ol>
          <a className="donate" href={donate.href} title={donate.buttonText}>
            {donate.buttonText}
          </a>
        </div>
      </div>
      <footer className={footerTheme}>
        <div className={styles.footer}>
          <ol className={styles.footerPageList}>
            {
              pageList.map((page, i) => {
                const key = `${id}FooterPage-${i}`
                const { order, title, href } = page

                return (
                  <li key={key} value={order}>
                    <a href={href} title={title}>
                      {title}
                    </a>
                  </li>
                )
              })
            }
          </ol>
          <div className={styles.mailingList}>
            <p>{mailingList.description}</p>
            <form className={styles.emailForm}>
              <input type="email" id="email" name="email" placeholder={mailingList.placeholder} />
              <button type="submit">
                <i className="arrowUp" />
              </button>
            </form>
          </div>
          <div className={styles.footerCaption}>
            <p>{contact.location}</p>
            <p>{contact.address}</p>
            <p>{contact.phone} - <a href={`mailto:${contact.email}`} title="Email">{contact.email}</a></p>
            <small>Copyright &copy; {new Date().getFullYear()} <strong>Open Door Christian Community.</strong> All Rights Reserved</small>
          </div>
        </div>
      </footer>
      <style jsx>
        {`
          .logo {
            height: 100%;
            background-position: center;
            background-repeat: no-repeat;
            -webkit-background-size: contain;
            -moz-background-size: contain;
            -ms-background-size: contain;
            -o-background-size: contain;
            background-size: contain;
          }
          .white .logo {
            background-image: url(${icons.logo.blue});
          }
          .blue .logo {
            background-image: url(${icons.logo.white});
          }
          .white .arrowUp {
            background-image: url(${icons.arrowUp.white});
          }
          .blue .arrowUp {
            background-image: url(${icons.arrowUp.blue});
          }
          .white .facebook {
            background-image: url(${icons.facebook.blue});
          }
          .blue .facebook {
            background-image: url(${icons.facebook.white});
          }
          .white .instagram {
            background-image: url(${icons.instagram.blue});
          }
          .blue .instagram {
            background-image: url(${icons.instagram.white});
          }
          .white, .blue button, .blue .donate {
            background-color: #fff;
            color: #24316F;
          }
          .blue, .white button, .white .donate {
            background-color: #24316F;
            color: #fff;
          }
          .white a {
            color: #24316F;
          }
          .blue p, .blue a {
            color: #fff;
          }
          .white p, .white p>a {
            color: #818181;
          }
          .donate {
            position: absolute;
            bottom: 2px;
            right: 0;
            margin-left: auto;
            padding: 7px;
            font-size: 1.5rem;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
            border-radius: 10px;
          }
          @media only screen and (min-width: 1000px) {
            .donate {
              padding: 10px;
              font-size: 3rem;
            }
          }
          @media not all and (pointer: coarse) {
            .white .facebook:hover, .blue .facebook:hover {
              background-image: url(${icons.facebook.grey});
            }
            .white .instagram:hover, .blue .instagram:hover {
              background-image: url(${icons.instagram.grey});
            }
            .white p>a:hover {
              color: #24316F;
            }
            .white a:hover, .white a:focus, .blue a:hover, .blue a:focus {
              color: #818181;
            }
          }
        `}
      </style>
    </div>
  )
}
