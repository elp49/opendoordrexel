import VideoPlayerModel from '../components/VideoPlayerModel';
import { KeyedPageSection } from '../PageModel';
import SectionModel from '../SectionModel';

export type TestimoniesSection = SectionModel & {
  videoPlayer: VideoPlayerModel;
};

type TestimoniesPageModel = KeyedPageSection & {
  testimonies: TestimoniesSection;
};

export default TestimoniesPageModel;
