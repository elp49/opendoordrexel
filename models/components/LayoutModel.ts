import TextLink from '../shared/TextLink';
import { Theme } from '../shared/ThemedModel';

type LayoutThemes = {
  layout: Theme;
  overlay: Theme;
};

export type MailingListModel = {
  description: string;
  placeholder: string;
};

export type ContactInfoModel = {
  location: string;
  address: string;
  phone: string;
  email: string;
};

type LayoutModel = {
  themes: LayoutThemes;
  pageList: TextLink[];
  mailingList: MailingListModel;
  socialMedia: TextLink[];
  donate: TextLink;
  contact: ContactInfoModel;
};

export default LayoutModel;
