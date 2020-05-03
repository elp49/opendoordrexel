import Overlay from './Overlay'
import styles from './Layout.module.css'

const layout = {
  logo: '/logo-rendered-space-around.svg',
  pages: [
    { _id: '', name: 'Home' },
    { _id: 'tuesdays', name: 'Dinner & Worship' },
    { _id: 'outreach', name: 'Outreach' },
    { _id: 'testimonies', name: 'Testimonies' },
    { _id: 'about', name: 'About' }
  ]
};

export const toggleOverlay = () => {
  document.getElementById('layout').classList.toggle(styles.layoutFixed);
  document.getElementById('layoutOverlay').classList.toggle(styles.overlayActive);
  document.getElementById('container').classList.toggle(styles.container);
};

export default function Layout(props) {
  return (
    <div id={'layout'} className={styles.layout}>
      <div id={'container'}>
        <div className={styles.layoutHeader}>
          <div className={styles.header}>
            <div className={styles.hamburger} onClick={toggleOverlay}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <a href='/' className={styles.logo} title={'Open Door'}>
              <img alt={'Open Door'} src={layout.logo} style={{ height: 100 + '%' }} />
            </a>
            <ul className={styles.headerPages}>
              {layout.pages.map((page, i) => {
                return (
                  <li key={`page-${i}`} className={styles.page}>
                    <a href={`/${page._id}`} title={page.name}>{page.name}</a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <div id={'layoutOverlay'} className={styles.layoutOverlay}>
          <Overlay pages={layout.pages} />
        </div>
      </div>
      <div>
        {props.children}
      </div>
    </div>
  )
}
