import styles from './Overlay.module.css'

export function toggle(id) {
  document.getElementById(`${id}Overlay`).classList.toggle(styles.active);
};

export default function Overlay(props) {
  const id = props.overlay._id;
  const pages = props.overlay.pages.sort((a, b) => { a._id - b._id });
  const socialMedia = props.overlay.socialMedia.sort((a, b) => a._id - b._id);
  return (
    <div id={`${id}Overlay`} className={styles.overlay}>
      <div className={props.overlay.theme} style={{ height: 100 + '%' }}>
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
