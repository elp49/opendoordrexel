import CarouselModel from '../components/CarouselModel';
import EventBoardModel from '../components/EventBoardModel';
import SlideshowModel from '../components/SlideshowModel';
import { KeyedPageSection } from '../PageModel';
import SectionModel from '../SectionModel';

export type WelcomeSection = SectionModel & {
  slideshow: SlideshowModel;
};

export type AnnouncementsSection = SectionModel & {
  events: EventBoardModel;
};

export type ActivitiesSection = SectionModel & {
  carousel: CarouselModel;
};

type HomePageModel = KeyedPageSection & {
  welcome: WelcomeSection;
  intro: SectionModel;
  announcements: AnnouncementsSection;
  activities: ActivitiesSection;
};

export default HomePageModel;
