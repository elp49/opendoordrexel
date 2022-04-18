import Head from 'next/head';
import { useState } from 'react';
import LayoutModel from '../../models/components/LayoutModel';
import { getTextLinks } from '../../models/shared/TextLink';
import { Theme } from '../../models/shared/ThemedModel';
import styles from '../../styles/layout.module.css';
import Footer from './Footer';
import Header from './Header';
import Overlay from './Overlay';

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

  return (
    <div id={id} className={`${styles.layout} ${isOverlayActive ? styles.layoutFixed : ''}`}>
      <Head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header
        id={`${id}Header`}
        theme={model.themes.layout}
        toggleOverlay={() => setIsOverlayActive(!isOverlayActive)}
        pageList={pageList}
      />
      <Overlay
        id={`${id}Overlay`}
        theme={model.themes.overlay}
        pageList={pageList}
        mailingList={mailingList}
        socialMedia={socialMedia}
        isActive={isOverlayActive}
      />
      {children}
      <Footer
        id={`${id}Footer`}
        lastSectionTheme={lastSectionTheme}
        socialMedia={socialMedia}
        donate={donate}
        pageList={pageList}
        mailingList={mailingList}
        contact={contact}
      />
    </div>
  );
};

export default Layout;
