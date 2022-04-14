import { NextPage } from 'next';
import Announcements from '../components/Announcements/Announcements';
import Carousel from '../components/Carousel/Carousel';
import SectionedPage from '../components/SectionedPage';
import Slideshow from '../components/Slideshow/Slideshow';
import data from '../data/index.json';
import { filterValidCards } from '../models/components/CarouselModel';
import { filterValidSlides } from '../models/components/SlideshowModel';
import PageModel, { filterValidSectionDetailImages } from '../models/PageModel';
import HomePageModel, { ActivitiesSection, AnnouncementsSection, WelcomeSection } from '../models/pages/HomePageModel';
import PageSection from '../models/PageSection';

const buildWelcomeSection = ({ order, sectionDetails, slideshow }: WelcomeSection): PageSection => {
  const children = <Slideshow sectionName={sectionDetails.name} model={slideshow} />;
  return { order, sectionDetails, children };
};

const buildAnnouncementsSection = ({ order, sectionDetails, events }: AnnouncementsSection): PageSection => {
  const children = <Announcements sectionName={sectionDetails.name} model={events} />;
  return { order, sectionDetails, children };
};

const buildActivitiesSection = ({ order, sectionDetails, carousel }: ActivitiesSection): PageSection => {
  const children = <Carousel sectionName={sectionDetails.name} model={carousel} />;
  return { order, sectionDetails, children };
};

const buildHomePageSections = ({ welcome, intro, announcements, activities }: HomePageModel): PageSection[] => {
  const welcomeSection = buildWelcomeSection(welcome);
  const announcementsSection = buildAnnouncementsSection(announcements);
  const activitiesSection = buildActivitiesSection(activities);
  return [welcomeSection, intro, announcementsSection, activitiesSection];
};

export type HomePageProps = {
  model: PageModel<HomePageModel>;
};

const Home: NextPage<HomePageProps> = ({ model }) => (
  <SectionedPage model={model} buildPageSections={buildHomePageSections} />
);

export const getStaticProps = async () => {
  const model = { ...data };

  // Filter out invalid file paths.
  model.sections = filterValidSectionDetailImages(model.sections);
  model.sections.welcome.slideshow.slideList = filterValidSlides(data.sections.welcome.slideshow.slideList);
  model.sections.activities.carousel.cardList = filterValidCards(data.sections.activities.carousel.cardList);

  return { props: { model } };
};

export default Home;
