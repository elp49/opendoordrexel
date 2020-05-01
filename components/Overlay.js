import styles from './Overlay.module.css'

const overlay = {
  mailingList: {
    description: 'Sign up for our mailing list to find out what\'s for dinner each week.',
    placeholder: 'Email',
    buttonIcon: '/icons/arrow-up-blue.svg'
  },
  socialMedia: [
    { _id: 'facebook', href: 'https://www.facebook.com/groups/opendoorchristiancommunity/', icon: '/icons/facebook-white.svg' },
    { _id: 'insta', href: 'https://www.instagram.com/drexelopendoor/', icon: '/icons/insta-white.svg' },
    { _id: 'youtube', href: '/', icon: '/icons/youtube-white.svg' }
  ]
};

export default function Overlay({ pages }) {
  return (
    <div id={'overlay'}>
      <ul className={styles.overlayPages}>
        {pages.map((page, i) => {
          return (
            <li key={`overlayPage-${i}`} className={styles.page}>
              <a href={`/${page._id}`} title={page.name}>{page.name}</a>
            </li>
          )
        })}
      </ul>
      <div className={styles.overlayEmail}>
        <p>{overlay.mailingList.description}</p>
        <form name='mailingList' className={styles.emailForm}>
          <input id='email' type='email' placeholder={overlay.mailingList.placeholder} name='email' />
          <button type='submit'>
            <i style={{ backgroundImage: `url(${overlay.mailingList.buttonIcon})` }}></i>
          </button>
        </form>
      </div>
      <ul className={styles.overlaySocialMedia}>
        {overlay.socialMedia.map((media, i) => {
          return (
            <li key={`media-${i}`} className={styles.socialMedia}>
              <a href={media.href} target='_blank'>
                <i style={{ backgroundImage: `url(${media.icon})` }}></i>
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
