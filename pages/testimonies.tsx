import { NextPage } from 'next';
import SectionedPage from '../components/SectionedPage';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer';
import data from '../data/testimonies.json';
import { filterValidVideos } from '../models/components/VideoPlayerModel';
import PageModel, { filterValidSectionDetailImages } from '../models/PageModel';
import TestimoniesPageModel, { TestimoniesSection } from '../models/pages/TestimoniesPageModel';
import PageSection from '../models/PageSection';

const buildTestimoniesSection = ({ order, sectionDetails, videoPlayer }: TestimoniesSection): PageSection => {
  const children = <VideoPlayer sectionName={sectionDetails.name} model={videoPlayer} />;
  return { order, sectionDetails, children };
};

const buildTestimoniesPageSections = ({ testimonies }: TestimoniesPageModel): PageSection[] => {
  const introSection = buildTestimoniesSection(testimonies);
  return [introSection];
};

type TestimoniesPageProps = {
  model: PageModel<TestimoniesPageModel>;
};

const Testimonies: NextPage<TestimoniesPageProps> = ({ model }) => (
  <SectionedPage model={model} buildPageSections={buildTestimoniesPageSections} />
);

export const getStaticProps = async () => {
  const model = { ...data };

  // Filter out invalid file paths.
  model.sections = filterValidSectionDetailImages(model.sections);
  model.sections.testimonies.videoPlayer.videoList = filterValidVideos(data.sections.testimonies.videoPlayer.videoList);

  return { props: { model } };
};

export default Testimonies;
