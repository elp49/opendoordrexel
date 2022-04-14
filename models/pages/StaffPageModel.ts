import { KeyedPageSection } from '../PageModel';
import SectionModel from '../SectionModel';

type StaffPageModel = KeyedPageSection & {
  piltz: SectionModel;
  diana: SectionModel;
};

export default StaffPageModel;
