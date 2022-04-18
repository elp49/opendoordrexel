import { sortByOrder } from '../../utils/utils';
import OrderedItem from './OrderedItem';

type TextLink = OrderedItem & {
  text: string;
  href: string;
};

export const getTextLinks = (links: TextLink[]) => {
  const isTextLinkValid = ({ text, href }: TextLink) => text !== '' && href !== '';
  const filteredLinks = links.filter(isTextLinkValid);
  return sortByOrder(filteredLinks);
};

export default TextLink;
