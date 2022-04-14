import TimelineModel from '../components/TimelineModel';
import { KeyedPageSection } from '../PageModel';
import SectionModel from '../SectionModel';

export type TimelineSection = SectionModel & {
  timeline: TimelineModel;
};

type AboutPageModel = KeyedPageSection & {
  intro: SectionModel;
  timeline: TimelineSection;
};

export default AboutPageModel;
