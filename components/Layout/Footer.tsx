import Link from 'next/link';
import { ContactInfoModel, MailingListModel } from '../../models/components/LayoutModel';
import { TextLink } from '../../models/shared';
import { Color, getThemeName, Theme, ThemeName, themeToColor } from '../../models/ThemedModel';
import styles from '../../styles/layout.module.css';
import MailingList from './MailingList';
import PageList from './PageList';
import SocialMedia from './SocialMedia';

type FooterProps = {
  id: string;
  lastSectionTheme: Theme;
  socialMedia: TextLink[];
  donate: TextLink;
  pageList: TextLink[];
  mailingList: MailingListModel;
  contact: ContactInfoModel;
};

const Footer = ({ id, lastSectionTheme, socialMedia, donate, pageList, mailingList, contact }: FooterProps) => {
  const themeName = getThemeName(lastSectionTheme === Theme.White ? Theme.Blue : Theme.White);
  const themeColor = themeToColor(lastSectionTheme);
  const lastSectionThemeName = getThemeName(lastSectionTheme);

  return (
    <>
      <div className={lastSectionThemeName}>
        <div className={styles.container}>
          <SocialMedia
            id={id}
            themeName={lastSectionThemeName}
            socialMedia={socialMedia}
            listClassName={styles.footerSocialMediaList}
            iconClassName={styles.footerSocialMedia}
          />
          <Link href={donate.href}>
            <a className={styles.donate} title={donate.text}>
              {donate.text}
            </a>
          </Link>
        </div>
      </div>
      <footer id={id} className={themeName}>
        <div className={styles.footer}>
          <PageList
            id={id}
            themeName={themeName}
            pageList={pageList}
            listClassName={styles.footerPageList}
            linkClassName={styles.footerPage}
          />
          <MailingList
            themeName={themeName}
            mailingList={mailingList}
            containerClassName={styles.footerMailingListContainer}
            className={styles.footerMailingList}
          />
          <div className={styles.footerCaption}>
            <p>{contact.location}</p>
            <p>{contact.address}</p>
            <p>
              {`${contact.phone} - `}
              <Link href={`mailto:${contact.email}`}>
                <a title="Email" className="footerMailTo">
                  {contact.email}
                </a>
              </Link>
            </p>
            <small>
              Copyright &copy; {new Date().getFullYear()} <strong>Open Door Christian Community.</strong> All Rights
              Reserved
            </small>
          </div>
        </div>
      </footer>
      <style jsx>
        {`
          html,
          body {
            background-color: ${themeColor};
          }
          .${ThemeName.White}, .${ThemeName.Blue} .${styles.donate} {
            background-color: ${Color.White};
            color: ${Color.Blue};
          }
          .${ThemeName.Blue}, .${ThemeName.White} .${styles.donate} {
            background-color: ${Color.Blue};
            color: ${Color.White};
          }
          .${ThemeName.White} .footerMailTo {
            color: ${Color.Grey};
          }
          .${ThemeName.Blue} .footerMailTo {
            color: ${Color.White};
          }
          @media not all and (pointer: coarse) {
            .${ThemeName.White} .footerMailTo:hover {
              color: ${Color.Blue};
            }
            .${ThemeName.White}
              .${styles.donate}:hover,
              .${ThemeName.White}
              .${styles.donate}:focus,
              .${ThemeName.Blue}
              .${styles.donate}:hover,
              .${ThemeName.Blue}
              .${styles.donate}:focus,
              .${ThemeName.Blue}
              .footerMailTo:hover {
              color: ${Color.Grey};
            }
          }
        `}
      </style>
    </>
  );
};

export default Footer;
