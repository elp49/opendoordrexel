import styles from './Overlay.module.css'
import { isDefined, getTheme, sortListByOrder, DEFAULT_THEME, ICONS } from './Layout'

export default function Overlay({ overlay }) {
  if (!isDefined(overlay))
    return;

  const id = isDefined(overlay.name) ? overlay.name : 'overlay';
  const theme = isDefined(overlay.themes) ? getTheme(overlay.themes.overlay) : DEFAULT_THEME;
  const pageList = sortListByOrder(overlay.pageList);
  const socialMedia = sortListByOrder(overlay.socialMedia);
  const mailingList = overlay.mailingList;

  return (
    <div className={theme} style={{ minHeight: 100 + '%' }}>
      <div className={styles.overlay}>
        <ol className={styles.overlayPages}>
          {
            pageList.map((page, i) => {
              const key = `${id}OverlayPage-${i}`;
              const { order, href, name } = page;

              return (
                <li key={key} value={order}>
                  <a href={href} title={name} className={styles.overlayPage}>
                    {name}
                  </a>
                </li>
              )
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
        <ol className={styles.socialMedia}>
          {
            socialMedia.map((media, i) => {
              const key = `${id}OverlayMedia-${i}`;
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
      </div>
      <style jsx>
        {`
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
