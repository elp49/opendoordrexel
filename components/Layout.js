import Overlay, { toggle } from './Overlay'
import styles from './Layout.module.css'

const layout = {
  _id: 'layout',
  theme: 'blue',
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

const toggleOverlay = () => {
  const id = layout._id;
  document.getElementById(id).classList.toggle(styles.fixed);
  toggle(id);
};

export default function Layout(props) {
  const id = layout._id;
  const pages = layout.pages.sort((a, b) => { a._id - b._id });
  const socialMedia = layout.socialMedia.sort((a, b) => a._id - b._id);
  const lastSection = props.children[props.children.length - 1];
  const lastSectionTheme = typeof lastSection !== 'undefined' ? lastSection.props.section.theme : 'white';
  const theme = lastSectionTheme === 'blue' ? 'white' : 'blue';
  return (
    <div id={id} style={{ width: 100 + '%' }}>
      <header className={layout.theme} style={{zIndex: 101}}>
        <div className={styles.header}>
          <div className={styles.hamburger} onClick={toggleOverlay}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <a href='/' className={styles.headerLogo} title={'Open Door'}>
            <i alt={'Open Door'} className={'logo'}></i>
          </a>
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
      <Overlay overlay={layout} />
      {props.children}
      <div className={lastSectionTheme}>
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
      </div>
      <footer className={theme}>
        <div className={styles.footer}>
          <a href='/' className={styles.footerLogo} title={'Open Door'}>
            <i alt={'Open Door'} className={'logo'}></i>
          </a>
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
        background-size: contain;
      }
      .white .logo {
        background-image: url(${layout.icons.logo.blue});
      }
      .blue .logo {
        background-image: url(${layout.icons.logo.white});
      }
      .white .logo:hover, .blue .logo:hover {
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

      .white, .blue button {
        background-color: #fff;
        color: #24316F;
      }
      
      .blue, .white button {
        background-color: #24316F;
        color: #fff;
      }
      
      .white p>a:hover, .white a, .white input, .white input::placeholder {
        color: #24316F;
      }
      
      .blue p, .blue a, .blue input, .blue input::placeholder {
        color: #fff;
      }
      
      .white p, .white p>a, .white a:hover, .white a:focus, .blue a:hover, .blue a:focus {
        color: #818181;
      }
      
      .white form {
        border-bottom-color: #24316F;
      }
      
      .blue form {
        border-bottom-color: #fff;
      }
      `}</style>
    </div>
  )
}
