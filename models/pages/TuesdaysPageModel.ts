import CarouselModel from '../components/CarouselModel';
import { KeyedPageSection } from '../PageModel';
import SectionModel from '../SectionModel';

export type TuesdaysSection = SectionModel & {
  carousel: CarouselModel;
};

type TuesdaysPageModel = KeyedPageSection & {
  dinner: TuesdaysSection;
  worship: TuesdaysSection;
};

export default TuesdaysPageModel;
