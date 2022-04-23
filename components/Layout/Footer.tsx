import Link from 'next/link';
import { ContactInfoModel, MailingListModel } from '../../models/components/LayoutModel';
import TextLink from '../../models/shared/TextLink';
import { Color, ThemeName } from '../../models/shared/ThemedModel';
import styles from '../../styles/layout.module.css';
import PageList from './PageList';

type FooterProps = {
  id: string;
  themeName: string;
  pageList: TextLink[];
  mailingList: MailingListModel;
  contact: ContactInfoModel;
};

const Footer = ({ id, themeName, pageList, mailingList, contact }: FooterProps) => (
  <footer id={id} className={themeName}>
    <div className={styles.footer}>
      <PageList
        id={id}
        themeName={themeName}
        pageList={pageList}
        listClassName={styles.footerPageList}
        linkClassName={styles.footerPage}
      />
      {/* TODO: implement subscribing to mailing list.
          <MailingList
            themeName={themeName}
            mailingList={mailingList}
            containerClassName={styles.footerMailingListContainer}
            className={styles.footerMailingList}
          /> */}
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
    <style jsx>
      {`
        .${ThemeName.White} {
          background-color: ${Color.White};
        }
        .${ThemeName.Blue} {
          background-color: ${Color.Blue};
        }
        .${ThemeName.White} .${styles.footerCaption}, .${ThemeName.White} .footerMailTo {
          color: ${Color.Grey};
        }
        .${ThemeName.Blue} .${styles.footerCaption}, .${ThemeName.Blue} .footerMailTo {
          color: ${Color.LightGrey};
        }
        @media not all and (pointer: coarse) {
          .${ThemeName.Blue} .footerMailTo:hover,
          .${ThemeName.Blue} .footerMailTo:focus {
            color: ${Color.White};
          }
          .${ThemeName.White} .footerMailTo:hover,
          .${ThemeName.White} .footerMailTo:focus {
            color: ${Color.Blue};
          }
        }
      `}
    </style>
  </footer>
);

export default Footer;
