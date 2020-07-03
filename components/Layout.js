import layout from './Layout.json'
import Overlay from './Overlay'
import styles from './Layout.module.css'

function isDefined(a) {
  if (typeof a !== 'undefined')
    return true;

  return false;
}

function toggleOverlay(id) {
  document.getElementById(id).classList.toggle(styles.layoutFixed);
  document.getElementById(`${id}Overlay`).classList.toggle(styles.overlayActive);
};

function sortListByOrder(list) {
  return list.sort((a, b) => a.order - b.order);
}

function getLastSection(layoutChildren) {
  //console.log(layoutChildren);


  // if ((!isDefined(layoutChildren) || layoutChildren.length === 0)
  //   || (!isDefined(layoutChildren.props) && layoutChildren.length === 1))
  //   return;

  // let lastSection;
  // if (layoutChildren.length > 1) {
  //   for (let i = layoutChildren.length - 1; i >= 0; i--) {
  //     // if (!isDefined(layoutChildren[i].props))
  //     //   continue;
  //     console.log(`layoutChildren[${i}].props:`);
  //     console.log(layoutChildren[i])
  //     // lastSection = layoutChildren[i].props.children.props.section;
  //     // if (isDefined(lastSection))
  //     //   return lastSection;
  //   }
  // } else {
  //   lastSection = layoutChildren.props.section;
  //   if (isDefined(lastSection))
  //     return lastSection;
  // }

  // return;
}

function getLastSectionTheme(layoutChildren) {
  let lastSection = getLastSection(layoutChildren);
  if (!isDefined(lastSection) || !isDefined(lastSection.theme))
    return 'white';

  return lastSection.theme;
}

export default function Layout({ children }) {
  const id = isDefined(layout.name) ? layout.name : 'layout';
  const pageList = sortListByOrder(layout.pageList);
  const socialMedia = sortListByOrder(layout.socialMedia);
  const lastSectionTheme = getLastSectionTheme(children);
  console.log(lastSectionTheme);
  const footerTheme = lastSectionTheme === 'blue' ? 'white' : 'blue';

  return (
    <div id={id} className={styles.layout}>
      <header className={layout.themes.layout}>
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
                const { order, href, title } = page;

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
                const key = `${id}FooterMedia-${i}`;
                const { order, href, name } = media;

                return (
                  <li key={key} value={order}>
                    <a href={href} title={name} target='_blank' >
                      <i className={name.toLowerCase()}></i>
                    </a>
                  </li>
                )
              })
            }
          </ol>
          <a className={'donate'} href={layout.donate.href} title={layout.donate.buttonText}>
            {layout.donate.buttonText}
          </a>
        </div>
      </div>
      <footer className={footerTheme}>
        <div className={styles.footer}>
          <ol className={styles.footerPageList}>
            {
              pageList.map((page, i) => {
                const key = `${id}FooterPage-${i}`;
                const { order, name, href } = page;

                return (
                  <li key={key} value={order}>
                    <a href={`/${href}`} title={name}>
                      {name}
                    </a>
                  </li>
                )
              })
            }
          </ol>
          <div className={styles.mailingList}>
            <p>{layout.mailingList.description}</p>
            <form className={styles.emailForm}>
              <input type='email' id='email' name='email' placeholder={layout.mailingList.placeholder} />
              <button type='submit'>
                <i className={'arrowUp'}></i>
              </button>
            </form>
          </div>
          <div className={styles.footerCaption}>
            <p>{layout.footer.contact.location}</p>
            <p>{layout.footer.contact.address}</p>
            <p>{layout.footer.contact.phone} - <a href={`mailto:${layout.footer.contact.email}`} title='Email'>{layout.footer.contact.email}</a></p>
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
            background-image: url(${layout.icons.logo.blue});
          }
          .blue .logo {
            background-image: url(${layout.icons.logo.white});
          }
          .white .arrowUp {
            background-image: url(${layout.icons.arrowUp.white});
          }
          .blue .arrowUp {
            background-image: url(${layout.icons.arrowUp.blue});
          }
          .white .facebook {
            background-image: url(${layout.icons.facebook.blue});
          }
          .blue .facebook {
            background-image: url(${layout.icons.facebook.white});
          }
          .white .instagram {
            background-image: url(${layout.icons.instagram.blue});
          }
          .blue .instagram {
            background-image: url(${layout.icons.instagram.white});
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
              background-image: url(${layout.icons.facebook.grey});
            }
            .white .instagram:hover, .blue .instagram:hover {
              background-image: url(${layout.icons.instagram.grey});
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
