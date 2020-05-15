import styles from './Overlay.module.css'

export default function Overlay(props) {
  const id = props.overlay._id;
  const pages = props.overlay.pages.sort((a, b) => { a._id - b._id });
  const socialMedia = props.overlay.socialMedia.sort((a, b) => a._id - b._id);
  return (
    <div className={props.overlay.themes.overlay} style={{ minHeight: 100 + '%' }}>
      <div className={styles.overlay}>
        <ol className={styles.overlayPages}>
          {pages.map((page, i) => {
            return (
              <li key={`${id}OverlayPage-${i}`} value={page._id}>
                <a href={`/${page.href}`} title={page.title} className={styles.overlayPage}>
                  {page.title}
                </a>
              </li>
            )
          })}
        </ol>
        <div className={styles.mailingList}>
          <p>{props.overlay.mailingList.description}</p>
          <form className={styles.emailForm}>
            <input type='email' id='email' name='email' placeholder={props.overlay.mailingList.placeholder} />
            <button type='submit'>
              <i className={'arrowUp'}></i>
            </button>
          </form>
        </div>
        <ol className={styles.socialMedia}>
          {socialMedia.map((media, i) => {
            return (
              <li key={`${id}OverlayMedia-${i}`} value={media._id}>
                <a href={media.href} title={media.title} target='_blank' >
                  <i className={media.class}></i>
                </a>
              </li>
            )
          })}
        </ol>
      </div>
      <style jsx>{`
      .white .arrowUp {
        background-image: url(${props.overlay.icons.arrowUp.white});
      }
      .blue .arrowUp {
        background-image: url(${props.overlay.icons.arrowUp.blue});
      }
      .white .facebook {
        background-image: url(${props.overlay.icons.facebook.blue});
      }
      .blue .facebook {
        background-image: url(${props.overlay.icons.facebook.white});
      }
      .white .insta {
        background-image: url(${props.overlay.icons.insta.blue});
      }
      .blue .insta {
        background-image: url(${props.overlay.icons.insta.white});
      }
      .white, .blue button {
        background-color: #fff;
        color: #24316F;
      }
      .blue, .white button {
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
      @media not all and (pointer: coarse) {
        .white .facebook:hover, .blue .facebook:hover {
          background-image: url(${props.overlay.icons.facebook.grey});
        }
        .white .insta:hover, .blue .insta:hover {
          background-image: url(${props.overlay.icons.insta.grey});
        }
        .white p>a:hover {
          color: #24316F;
        }
        .white a:hover, .white a:focus, .blue a:hover, .blue a:focus {
          color: #818181;
        }
      }
      `}</style>
    </div>
  )
}
