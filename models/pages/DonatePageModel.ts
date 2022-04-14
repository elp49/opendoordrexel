import { KeyedPageSection } from '../PageModel';
import SectionModel from '../SectionModel';

type DonatePageModel = KeyedPageSection & {
  info: SectionModel;
};

export default DonatePageModel;
