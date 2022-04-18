import CarouselModel from './components/CarouselModel';
import EventBoardModel from './components/EventBoardModel';
import SlideshowModel from './components/SlideshowModel';
import TimelineModel from './components/TimelineModel';
import VideoPlayerModel from './components/VideoPlayerModel';
import OrderedItem from './shared/OrderedItem';
import TextLink from './shared/TextLink';
import ThemedModel from './shared/ThemedModel';

export type SectionDetails = ThemedModel & {
  titles: string[];
  subtitles: string[];
  links: TextLink[];
  image: string;
  descriptions: string[];
  isRaw: boolean;
  isViewHeight: boolean;
  hasScrollButton: boolean;
};

export type SectionComponent = OrderedItem &
  ThemedModel & {
    componentType: ComponentType;
    model: ComponentModel;
  };

export enum ComponentType {
  None = 0,
  Announcements = 1,
  Carousel = 2,
  Slideshow = 3,
  Timeline = 4,
  VideoPlayer = 5,
}

export type ComponentModel = EventBoardModel | CarouselModel | SlideshowModel | TimelineModel | VideoPlayerModel;

type SectionModel = OrderedItem & {
  sectionDetails: SectionDetails;
  components: SectionComponent[];
};

export default SectionModel;
