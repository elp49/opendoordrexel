import type { AppProps } from 'next/app';
import PageModel, { KeyedPageSection } from '../models/PageModel';
import '../styles/globals.css';

const OpenDoorDrexelWebApp = ({ Component, pageProps }: AppProps<PageModel<KeyedPageSection>>) => (
  <Component {...pageProps} />
);

export default OpenDoorDrexelWebApp;
