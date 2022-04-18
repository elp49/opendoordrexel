import type { AppProps } from 'next/app';
import PageModel from '../models/PageModel';
import '../styles/globals.css';

const OpenDoorDrexelWebApp = ({ Component, pageProps }: AppProps<PageModel>) => <Component {...pageProps} />;

export default OpenDoorDrexelWebApp;
