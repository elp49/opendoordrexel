import { MailingListModel } from '../../models/components/LayoutModel';
import TextLink from '../../models/shared/TextLink';
import { getThemeName, Theme, ThemeName } from '../../models/shared/ThemedModel';
import styles from '../../styles/layout.module.css';
import PageList from './PageList';
import SocialMedia from './SocialMedia';

type OverlayProps = {
  id: string;
  theme: Theme;
  pageList: TextLink[];
  mailingList: MailingListModel;
  socialMedia: TextLink[];
  isActive: boolean;
};

const Overlay = ({ id, theme, pageList, mailingList, socialMedia, isActive }: OverlayProps) => {
  const themeName = getThemeName(theme);

  return (
    <div id={id} className={`${styles.overlayContainer} ${isActive ? styles.overlayActive : ''}`}>
      <div className={themeName} style={{ minHeight: '100%' }}>
        <div className={styles.overlay}>
          <PageList
            id={id}
            themeName={themeName}
            pageList={pageList}
            listClassName={styles.overlayPageList}
            linkClassName={styles.overlayPage}
          />
          {/* TODO: implement subscribing to mailing list.
          <MailingList
            themeName={themeName}
            mailingList={mailingList}
            containerClassName={styles.overlayMailingListContainer}
            className={styles.overlayMailingList}
          /> */}
          <SocialMedia
            id={id}
            themeName={themeName}
            socialMedia={socialMedia}
            listClassName={styles.overlaySocialMediaList}
            iconClassName={styles.overlaySocialMedia}
          />
        </div>
      </div>
      <style jsx>
        {`
          ${ThemeName.White},
          .${ThemeName.Blue} button {
            background-color: #fff;
            color: #24316f;
          }
          .${ThemeName.Blue}, .${ThemeName.White} button {
            background-color: #24316f;
            color: #fff;
          }
          .${ThemeName.White} a {
            color: #24316f;
          }
          .${ThemeName.Blue} p,
          .${ThemeName.Blue} a {
            color: #fff;
          }
          .${ThemeName.White} p,
          .${ThemeName.White} p > a {
            color: #818181;
          }
          @media not all and (pointer: coarse) {
            .${ThemeName.White} p > a:hover {
              color: #24316f;
            }
            .${ThemeName.White} a:hover,
            .${ThemeName.White} a:focus,
            .${ThemeName.Blue} a:hover,
            .${ThemeName.Blue} a:focus {
              color: #818181;
            }
          }
        `}
      </style>
    </div>
  );
};
export default Overlay;
