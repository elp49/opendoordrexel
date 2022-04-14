import { isFilePathValid } from '../../utils/fs-handler';
import OrderedItem from '../OrderedItem';
import { TextLink } from '../shared';
import ThemedModel from '../ThemedModel';

export type SlideModel = OrderedItem & {
  image: string;
  titles: string[];
  buttons: TextLink[];
  showOnMobile: boolean;
  showOnDesktop: boolean;
};

type SlideshowModel = ThemedModel & {
  timeoutDurationInSeconds: number;
  slideList: SlideModel[];
};

export const filterValidSlides = (slideList: SlideModel[]) => slideList.filter(({ image }) => isFilePathValid(image));

export default SlideshowModel;
