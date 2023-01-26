import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import LayoutModel from '../../models/components/LayoutModel';
import { getTextLinks } from '../../models/shared/TextLink';
import { Color, getThemeName, Theme, ThemeName, themeToColor } from '../../models/shared/ThemedModel';
import styles from '../../styles/layout.module.css';
import { createStyle } from '../../utils/utils';
import Footer from './Footer';
import Header from './Header';
import Overlay from './Overlay';
import SocialMedia from './SocialMedia';

const DEFAULT_PAGE_TITLE = 'Open Door Christian Community';

type LayoutProps = {
  id: string;
  title: string;
  lastSectionTheme: Theme;
  model: LayoutModel;
  children?: React.ReactNode;
};

const Layout = ({ id, title, lastSectionTheme, model, children }: LayoutProps) => {
  const pageTitle = title !== '' ? `${title} | ${DEFAULT_PAGE_TITLE}` : DEFAULT_PAGE_TITLE;

  const pageList = getTextLinks(model.pageList);
  const socialMedia = getTextLinks(model.socialMedia);
  const { mailingList, donate, contact } = model;

  const [isOverlayActive, setIsOverlayActive] = useState<boolean>(false);

  const headerThemeName = getThemeName(model.themes.layout);
  const overlayThemeName = getThemeName(model.themes.overlay);

  const footerTheme = lastSectionTheme === Theme.White ? Theme.Blue : Theme.White;
  const footerThemeName = getThemeName(footerTheme);
  const lastSectionThemeName = getThemeName(lastSectionTheme);

  useEffect(() => {
    const headerThemeColor = themeToColor(footerTheme);
    const footerThemeColor = themeToColor(footerTheme);
    createStyle(`
      html, body {
        background-image: linear-gradient(${headerThemeColor}, ${footerThemeColor});
      }
    `);
  }, [footerTheme]);

  return (
    <div id={id} className={`${styles.layout} ${isOverlayActive ? styles.layoutFixed : ''}`}>
      <Head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header
        id={`${id}Header`}
        themeName={headerThemeName}
        toggleOverlay={() => setIsOverlayActive(!isOverlayActive)}
        pageList={pageList}
      />
      <Overlay
        id={`${id}Overlay`}
        themeName={overlayThemeName}
        pageList={pageList}
        mailingList={mailingList}
        socialMedia={socialMedia}
        isActive={isOverlayActive}
      />
      {children}
      <div className={lastSectionThemeName}>
        <div className={styles.container}>
          <SocialMedia
            id={`${id}SocialMedia`}
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
        <style jsx>
          {`
            .${ThemeName.White}, .${ThemeName.Blue} .${styles.donate} {
              background-color: ${Color.White};
              color: ${Color.Blue};
            }
            .${ThemeName.Blue}, .${ThemeName.White} .${styles.donate} {
              background-color: ${Color.Blue};
              color: ${Color.White};
            }
            @media not all and (pointer: coarse) {
              .${ThemeName.White}
                .${styles.donate}:hover,
                .${ThemeName.White}
                .${styles.donate}:focus,
                .${ThemeName.Blue}
                .${styles.donate}:hover,
                .${ThemeName.Blue}
                .${styles.donate}:focus {
                color: ${Color.LightGrey};
              }
            }
          `}
        </style>
      </div>
      <Footer
        id={`${id}Footer`}
        themeName={footerThemeName}
        pageList={pageList}
        mailingList={mailingList}
        contact={contact}
      />
    </div>
  );
};

export default Layout;
