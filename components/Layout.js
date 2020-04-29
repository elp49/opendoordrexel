import Overlay, { hamburgerClick } from './Overlay'
import styles from './Layout.module.css'

const layout = {
  logo: '/logo-rendered-space-around.svg',
  pages: [
    { id: '', name: 'Home' },
    { id: 'tuesdays', name: 'Dinner & Worship' },
    { id: 'outreach', name: 'Outreach' },
    { id: 'testimonies', name: 'Testimonies' },
    { id: 'about', name: 'About' }
  ]
};

export const onHamburgerClick = () => {
  hamburgerClick();
  document.getElementById('layout').classList.toggle(styles.overlayActive);
};

export default function Layout(props) {
  return (
    <div id={'layout'} className={styles.layout}>
      <div id={'header'} className={styles.header}>
        <div className={styles.hamburger} onClick={onHamburgerClick}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <a href='/' className={styles.logo} title={'Open Door'}>
          <img alt={'Open Door'} src={layout.logo} style={{ height: 100 + '%' }} />
        </a>
        <ul className={styles.pageList}>
          {layout.pages.map((page, i) => {
            return (
              <li key={`page-${i}`} className={styles.page}>
                <a href={`/${page.id}`} title={page.name}>{page.name}</a>
              </li>
            )
          })}
        </ul>
      </div>
      {props.children}
      <Overlay pages={layout.pages} />
    </div>
  )
}
