import OrderedItem from './OrderedItem';
import { TextLink } from './shared';
import ThemedModel from './ThemedModel';

export type SectionDetails = ThemedModel & {
  name: string;
  titles: string[];
  subtitles: string[];
  links: TextLink[];
  image: string;
  descriptions: string[];
  isRaw: boolean;
  isViewHeight: boolean;
  hasScrollButton: boolean;
};

type SectionModel = OrderedItem & {
  sectionDetails: SectionDetails;
};

export default SectionModel;
