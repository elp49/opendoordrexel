import Link from 'next/link';
import icons from '../../data/icons.json';
import { TextLink } from '../../models/shared';
import { Color, getThemeName, Theme, ThemeName } from '../../models/ThemedModel';
import styles from '../../styles/layout.module.css';
import PageList from './PageList';

type HeaderProps = {
  id: string;
  theme: Theme;
  toggleOverlay: () => void;
  pageList: TextLink[];
};

const Header = ({ id, theme, toggleOverlay, pageList }: HeaderProps) => {
  const themeName = getThemeName(theme);

  return (
    <header className={themeName}>
      <div className={styles.header}>
        <div className={styles.headerLogoContainer}>
          <Link href="/">
            <a title="Open Door">
              <i className={styles.headerLogo} />
            </a>
          </Link>
        </div>
        <div className={styles.hamburgerContainer}>
          <button className={styles.hamburger} type="button" onClick={toggleOverlay}>
            <span />
            <span />
            <span />
          </button>
        </div>
        <PageList
          id={id}
          themeName={themeName}
          pageList={pageList}
          listClassName={styles.headerPageList}
          linkClassName={styles.headerPage}
        />
      </div>
      <style jsx>
        {`
          .${ThemeName.White} {
            background-color: ${Color.White};
            color: ${Color.Blue};
          }
          .${ThemeName.Blue} {
            background-color: ${Color.Blue};
            color: ${Color.White};
          }
          .${ThemeName.White} .${styles.headerLogo} {
            background-image: url(${icons.logo.blue});
          }
          .${ThemeName.Blue} .${styles.headerLogo} {
            background-image: url(${icons.logo.white});
          }
        `}
      </style>
    </header>
  );
};

export default Header;
