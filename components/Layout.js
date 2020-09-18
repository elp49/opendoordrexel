import Head from 'next/head';
import layout from './Layout.json';
import Overlay from './Overlay';
import styles from './Layout.module.css';

export const DEFAULT_THEME = 'white';
export const THEME_LIST = [DEFAULT_THEME, 'blue'];
export const ICONS = layout.icons;
const DEFAULT_PAGE_TITLE = 'Open Door Christian Community';

export function isDefined(a) {
  if (typeof a !== 'undefined')
    return true;

  return false;
}

export function getTheme(theme) {
  if (!isDefined(theme) || !THEME_LIST.includes(theme))
    return DEFAULT_THEME;

  return theme;
}

export function sortListByOrder(list) {
  return list.sort((a, b) => a.order - b.order);
}

export function sortListByReverseOrder(list) {
  return list.sort((a, b) => b.reverseOrder - a.reverseOrder);
}

export function getNextSectionsId(currentSectionsId) {
  return document.getElementById(currentSectionsId).nextSibling.id;
}

export function scrollToNextSection(currentSectionsId) {
  const nextSectionsId = getNextSectionsId(currentSectionsId);
  document.getElementById(nextSectionsId).scrollIntoView(true);
}

export function fixFilePath(file) {
  return file.replace(/\\/g, '/');
}

function getPageDetails(pageDetails) {
  if (!isDefined(pageDetails))
    return {
      pageTitle: DEFAULT_PAGE_TITLE
    };

  let { title } = pageDetails;
  if (!isDefined(title))
    title = DEFAULT_PAGE_TITLE;
  else
    title = title + " | " + DEFAULT_PAGE_TITLE;

  return {
    pageTitle: title
  };
}

function toggleOverlay(id) {
  document.getElementById(id).classList.toggle(styles.layoutFixed);
  document.getElementById(`${id}Overlay`).classList.toggle(styles.overlayActive);
}

function getLastSection(layoutChildren) {
  if (!isDefined(layoutChildren) || layoutChildren.length === 0)
    return;

  for (let i = layoutChildren.length - 1; i >= 0; i++) {
    const child = layoutChildren[i];
    if (isDefined(child) && isDefined(child.props)
      && isDefined(child.props.children) && isDefined(child.props.children.props))
      return child.props.children.props;
  }
}

function getLastSectionTheme(layoutChildren) {
  let lastSection = getLastSection(layoutChildren);
  if (isDefined(lastSection) && isDefined(lastSection.sectionDetails)
    && isDefined(lastSection.sectionDetails.theme)
    && THEME_LIST.includes(lastSection.sectionDetails.theme))
    return lastSection.sectionDetails.theme;

  return DEFAULT_THEME;
}

function getFooterTheme(lastSectionTheme) {
  if (lastSectionTheme === DEFAULT_THEME)
    return THEME_LIST[1];

  return DEFAULT_THEME;
}

export default function Layout({ children, pageDetails }) {
  const id = isDefined(layout.name) ? layout.name : 'layout';
  const theme = isDefined(layout.themes) ? getTheme(layout.themes.layout) : DEFAULT_THEME;
  const { pageTitle } = getPageDetails(pageDetails);
  const pageList = sortListByOrder(layout.pageList);
  const socialMedia = sortListByOrder(layout.socialMedia);
  const lastSectionTheme = getLastSectionTheme(children);
  const footerTheme = getFooterTheme(lastSectionTheme);
  const { donate, mailingList } = layout;
  const { contact } = layout.footer;

  return (
    <div id={id} className={styles.layout}>
      <Head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header className={theme}>
        <div className={styles.header}>
          <div className={styles.headerLogo}>
            <a href='/' title={'Open Door'}>
              <i alt={'Open Door'} className={'logo'}></i>
            </a>
          </div>
          <div className={styles.hamburgerContainer}>
            <div className={styles.hamburger} onClick={() => { toggleOverlay(id) }}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <ol className={styles.headerPageList}>
            {
              pageList.map((page, i) => {
                const key = `${id}HeaderPage-${i}`;
                const { order, title, href } = page;

                return (
                  <li key={key} value={order}>
                    <a href={href} title={title}>
                      {title}
                    </a>
                  </li>
                );
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
                const key = `${id}FooterMedia-${i}`;
                const { order, name, href } = media;

                return (
                  <li key={key} value={order}>
                    <a href={href} title={name} target='_blank' >
                      <i className={name.toLowerCase()}></i>
                    </a>
                  </li>
                );
              })
            }
          </ol>
          <a className={'donate'} href={donate.href} title={donate.buttonText}>
            {donate.buttonText}
          </a>
        </div>
      </div>
      <footer className={footerTheme}>
        <div className={styles.footer}>
          <ol className={styles.footerPageList}>
            {
              pageList.map((page, i) => {
                const key = `${id}FooterPage-${i}`;
                const { order, title, href } = page;

                return (
                  <li key={key} value={order}>
                    <a href={href} title={title}>
                      {title}
                    </a>
                  </li>
                );
              })
            }
          </ol>
          <div className={styles.mailingList}>
            <p>{mailingList.description}</p>
            <form className={styles.emailForm}>
              <input type='email' id='email' name='email' placeholder={mailingList.placeholder} />
              <button type='submit'>
                <i className={'arrowUp'}></i>
              </button>
            </form>
          </div>
          <div className={styles.footerCaption}>
            <p>{contact.location}</p>
            <p>{contact.address}</p>
            <p>{contact.phone} - <a href={`mailto:${contact.email}`} title='Email'>{contact.email}</a></p>
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
            background-image: url(${ICONS.logo.blue});
          }
          .blue .logo {
            background-image: url(${ICONS.logo.white});
          }
          .white .arrowUp {
            background-image: url(${ICONS.arrowUp.white});
          }
          .blue .arrowUp {
            background-image: url(${ICONS.arrowUp.blue});
          }
          .white .facebook {
            background-image: url(${ICONS.facebook.blue});
          }
          .blue .facebook {
            background-image: url(${ICONS.facebook.white});
          }
          .white .instagram {
            background-image: url(${ICONS.instagram.blue});
          }
          .blue .instagram {
            background-image: url(${ICONS.instagram.white});
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
              background-image: url(${ICONS.facebook.grey});
            }
            .white .instagram:hover, .blue .instagram:hover {
              background-image: url(${ICONS.instagram.grey});
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
  );
}
