import OrderedItem from '../shared/OrderedItem';
import TextLink from '../shared/TextLink';

export type SlideModel = OrderedItem & {
  image: string;
  titles: string[];
  buttons: TextLink[];
  showOnMobile: boolean;
  showOnDesktop: boolean;
};

type SlideshowModel = {
  timeoutDurationInSeconds: number;
  slideList: SlideModel[];
};

export default SlideshowModel;
