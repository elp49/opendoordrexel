import { NextPage } from 'next';
import Carousel from '../components/Carousel/Carousel';
import SectionedPage from '../components/SectionedPage';
import data from '../data/outreach.json';
import { filterValidCards } from '../models/components/CarouselModel';
import PageModel, { filterValidSectionDetailImages } from '../models/PageModel';
import OutreachPageModel, { OutreachSection } from '../models/pages/OutreachPageModel';
import PageSection from '../models/PageSection';

const buildOutreachSection = ({ order, sectionDetails, carousel }: OutreachSection): PageSection => {
  const children = <Carousel sectionName={sectionDetails.name} model={carousel} />;
  return { order, sectionDetails, children };
};

const buildOutreachPageSections = ({ outreach, donations }: OutreachPageModel): PageSection[] => {
  const introSection = buildOutreachSection(outreach);
  const donationsSection = buildOutreachSection(donations);
  return [introSection, donationsSection];
};

type OutreachPageProps = {
  model: PageModel<OutreachPageModel>;
};

const Outreach: NextPage<OutreachPageProps> = ({ model }) => (
  <SectionedPage model={model} buildPageSections={buildOutreachPageSections} />
);

export const getStaticProps = async () => {
  const model = { ...data };

  // Filter out invalid file paths.
  model.sections = filterValidSectionDetailImages(model.sections);
  model.sections.outreach.carousel.cardList = filterValidCards(data.sections.outreach.carousel.cardList);
  model.sections.donations.carousel.cardList = filterValidCards(data.sections.donations.carousel.cardList);

  return { props: { model } };
};

export default Outreach;
