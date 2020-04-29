import styles from './Overlay.module.css'

export const hamburgerClick = () => {
  document.getElementById('overlay').classList.toggle(styles.overlayActive);
};

export default function Overlay({ pages }) {
  return (
    <div id={'overlay'} className={styles.overlay}>
      <ul className={styles.pageList}>
        {pages.map((page) => {
          return (
            <li className={styles.page}>
              <a href={`/${page.id}`} title={page.name}>{page.name}</a>
            </li>
          )
        })}
      </ul>
      <div className={styles.mailingList}>
        <p>Sign up for our mailing list to find out what's for dinner each week.</p>
        <form name='mailingList' className={styles.emailForm}>
          <input id='email' type='email' placeholder='Email' name='email' />
          <button type='submit'>
            <i style={{ backgroundImage: 'url(/icons/arrow-up-blue.svg)' }}></i>
          </button>
        </form>
      </div>
      <div className={styles.socialMedia}>
        <a href='https://www.facebook.com/groups/opendoorchristiancommunity/' target='_blank'>
          <i style={{ backgroundImage: 'url(/icons/facebook-white.svg)' }}></i>
        </a>
        <a href='https://www.instagram.com/drexelopendoor/' target='_blank'>
          <i style={{ backgroundImage: 'url(/icons/insta-white.svg)' }}></i>
        </a>
        <a href='https://www.youtube.com/' target='_blank'>
          <i style={{ backgroundImage: 'url(/icons/youtube-white.svg)' }}></i>
        </a>
      </div>
    </div>
  )
}
