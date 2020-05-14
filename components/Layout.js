import Overlay from './Overlay'
import styles from './Layout.module.css'

const layout = {
  _id: 'layout',
  themes: {
    layout: 'blue',
    overlay: 'blue'
  },
  pages: [
    { _id: '1', title: 'Home', href: '' },
    { _id: '3', title: 'Dinner & Worship', href: 'tuesdays' },
    { _id: '2', title: 'Outreach', href: 'outreach' },
    { _id: '4', title: 'Testimonies', href: 'testimonies' },
    { _id: '5', title: 'About', href: 'about' }
  ],
  mailingList: {
    description: 'Sign up for our mailing list to find out what\'s for dinner each week.',
    placeholder: 'Email'
  },
  socialMedia: [
    { _id: '1', class: 'facebook', title: 'Facebook', href: 'https://www.facebook.com/groups/opendoorchristiancommunity' },
    { _id: '2', class: 'insta', title: 'Instagram', href: 'https://www.instagram.com/drexelopendoor' }
  ],
  donate: {
    buttonText: 'Donate',
    href: '/'
  },
  footer: {
    contact: {
      location: 'Drexel University, James E. Marks Intercultural Center, ',
      address: '3225 Arch St, Philadelphia, PA 19104',
      phone: '555.555.5555',
      email: 'info@opendoordrexel.org'
    }
  },
  icons: {
    logo: { white: '/logo-white.svg', blue: '/logo-blue.svg' },
    facebook: { white: '/icons/facebook-white.svg', blue: '/icons/facebook-blue.svg', grey: '/icons/facebook-grey.svg' },
    insta: { white: '/icons/insta-white.svg', blue: '/icons/insta-blue.svg', grey: '/icons/insta-grey.svg' },
    arrowUp: { white: '/icons/arrow-up-white.svg', blue: '/icons/arrow-up-blue.svg', grey: '/icons/arrow-up-grey.svg' }
  },
};

function toggleOverlay(id) {
  document.getElementById(id).classList.toggle(styles.layoutFixed);
  document.getElementById(`${id}Overlay`).classList.toggle(styles.overlayActive);
};

export default function Layout(props) {
  const id = layout._id;
  const pages = layout.pages.sort((a, b) => { a._id - b._id });
  const socialMedia = layout.socialMedia.sort((a, b) => a._id - b._id);
  const lastSection = props.children[props.children.length - 1];
  const lastSectionTheme = typeof lastSection !== 'undefined' ? lastSection.props.section.theme : 'white';
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
          <ol className={styles.headerPages}>
            {pages.map((page, i) => {
              return (
                <li key={`${id}HeaderPage-${i}`} value={page._id}>
                  <a href={`/${page.href}`} title={page.title}>
                    {page.title}
                  </a>
                </li>
              )
            })}
          </ol>
        </div>
      </header>
      <div id={`${id}Overlay`} className={styles.overlay}>
        <Overlay overlay={layout} />
      </div>
      {props.children}
      <div className={lastSectionTheme}>
        <div className={styles.container}>
          <ol className={styles.socialMedia}>
            {socialMedia.map((media, i) => {
              return (
                <li key={`${id}FooterMedia-${i}`} value={media._id}>
                  <a href={media.href} title={media.title} target='_blank' >
                    <i className={media.class}></i>
                  </a>
                </li>
              )
            })}
          </ol>
          <a className={'donate'} href={layout.donate.href} title={layout.donate.buttonText}>{layout.donate.buttonText}</a>
        </div>
      </div>
      <footer className={footerTheme}>
        <div className={styles.footer}>
          {/* <a href='/' className={styles.footerLogo} title={'Open Door'}>
            <i alt={'Open Door'} className={'logo'}></i>
          </a> */}
          <ol className={styles.footerPages}>
            {pages.map((page, i) => {
              return (
                <li key={`${id}FooterPage-${i}`} value={page._id}>
                  <a href={`/${page.href}`} title={page.title}>
                    {page.title}
                  </a>
                </li>
              )
            })}
          </ol>
          {/* <a href='/' className={styles.footerLogo} title={'Open Door'}>
            <i alt={'Open Door'} className={'logo'}></i>
          </a> */}

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
            <p>&copy; <strong>2020 Open Door Christian Community.</strong> All Rights Reserved</p>
          </div>
        </div>
      </footer>
      <style jsx>{`
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
      .white .facebook:hover, .blue .facebook:hover {
        background-image: url(${layout.icons.facebook.grey});
      }
      .white .insta {
        background-image: url(${layout.icons.insta.blue});
      }
      .blue .insta {
        background-image: url(${layout.icons.insta.white});
      }
      .white .insta:hover, .blue .insta:hover {
        background-image: url(${layout.icons.insta.grey});
      }
      .white, .blue button, .blue .donate {
        background-color: #fff;
        color: #24316F;
      }
      .blue, .white button, .white .donate {
        background-color: #24316F;
        color: #fff;
      }
      .white p>a:hover, .white a {
        color: #24316F;
      }
      .blue p, .blue a {
        color: #fff;
      }
      .white p, .white p>a, .white a:hover, .white a:focus, .blue a:hover, .blue a:focus {
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
      `}</style>
    </div>
  )
}
