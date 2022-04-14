import CarouselModel from '../components/CarouselModel';
import { KeyedPageSection } from '../PageModel';
import SectionModel from '../SectionModel';

export type OutreachSection = SectionModel & {
  carousel: CarouselModel;
};

type OutreachPageModel = KeyedPageSection & {
  outreach: OutreachSection;
  donations: OutreachSection;
};

export default OutreachPageModel;
