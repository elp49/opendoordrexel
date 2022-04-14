import { NextPage } from 'next';
import Carousel from '../components/Carousel/Carousel';
import SectionedPage from '../components/SectionedPage';
import data from '../data/tuesdays.json';
import { filterValidCards } from '../models/components/CarouselModel';
import PageModel, { filterValidSectionDetailImages } from '../models/PageModel';
import TuesdaysPageModel, { TuesdaysSection } from '../models/pages/TuesdaysPageModel';
import PageSection from '../models/PageSection';

const buildTuesdaysSection = ({ order, sectionDetails, carousel }: TuesdaysSection): PageSection => {
  const children = <Carousel sectionName={sectionDetails.name} model={carousel} />;
  return { order, sectionDetails, children };
};

const buildTuesdaysPageSections = ({ dinner, worship }: TuesdaysPageModel): PageSection[] => {
  const dinnerSection = buildTuesdaysSection(dinner);
  const worshipSection = buildTuesdaysSection(worship);
  return [dinnerSection, worshipSection];
};

type TuesdaysPageProps = {
  model: PageModel<TuesdaysPageModel>;
};

const Tuesdays: NextPage<TuesdaysPageProps> = ({ model }) => (
  <SectionedPage model={model} buildPageSections={buildTuesdaysPageSections} />
);

export const getStaticProps = async () => {
  const model = { ...data };

  // Filter out invalid file paths.
  model.sections = filterValidSectionDetailImages(model.sections);
  model.sections.dinner.carousel.cardList = filterValidCards(data.sections.dinner.carousel.cardList);
  model.sections.worship.carousel.cardList = filterValidCards(data.sections.worship.carousel.cardList);

  return { props: { model } };
};

export default Tuesdays;
