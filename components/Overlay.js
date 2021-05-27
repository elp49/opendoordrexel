import styles from "./Overlay.module.css"
import icons from "./Icons.json"
import { isDefined, getTheme, sortListByOrder, DEFAULT_THEME } from "../utils/utils"

export default function Overlay({ overlay }) {
  const id = isDefined(overlay.name) ? overlay.name : "overlay"
  const theme = isDefined(overlay.themes) ? getTheme(overlay.themes.overlay) : DEFAULT_THEME
  const pageList = sortListByOrder(overlay.pageList)
  const socialMedia = sortListByOrder(overlay.socialMedia)
  const { mailingList } = overlay

  return (
    <div className={theme} style={{ minHeight: "100%" }}>
      <div className={styles.overlay}>
        <ol className={styles.overlayPages}>
          {
            pageList.map((page, i) => {
              const key = `${id}OverlayPage-${i}`
              const { order, title, href } = page

              return (
                <li key={key} value={order}>
                  <a href={href} title={title} className={styles.overlayPage}>
                    {title}
                  </a>
                </li>
              )
            })
          }
        </ol>
        <div className={styles.mailingList}>
          <p>{mailingList.description}</p>
          <form className={styles.emailForm}>
            <input type="email" id="email" name="email" placeholder={mailingList.placeholder} />
            <button type="submit">
              <i className="arrowUp" />
            </button>
          </form>
        </div>
        <ol className={styles.socialMedia}>
          {
            socialMedia.map((media, i) => {
              const key = `${id}OverlayMedia-${i}`
              const { order, name, href } = media

              return (
                <li key={key} value={order}>
                  <a href={href} title={name} target="_blank" rel="noreferrer" >
                    <i className={name.toLowerCase()} />
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
            background-image: url(${icons.arrowUp.white});
          }
          .blue .arrowUp {
            background-image: url(${icons.arrowUp.blue});
          }
          .white .facebook {
            background-image: url(${icons.facebook.blue});
          }
          .blue .facebook {
            background-image: url(${icons.facebook.white});
          }
          .white .instagram {
            background-image: url(${icons.instagram.blue});
          }
          .blue .instagram {
            background-image: url(${icons.instagram.white});
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
              background-image: url(${icons.facebook.grey});
            }
            .white .instagram:hover, .blue .instagram:hover {
              background-image: url(${icons.instagram.grey});
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
  )
}
