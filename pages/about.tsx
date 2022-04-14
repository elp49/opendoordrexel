import { NextPage } from 'next';
import SectionedPage from '../components/SectionedPage';
import Timeline from '../components/Timeline/Timeline';
import data from '../data/about.json';
import PageModel, { filterValidSectionDetailImages } from '../models/PageModel';
import AboutPageModel, { TimelineSection } from '../models/pages/AboutPageModel';
import PageSection from '../models/PageSection';

const buildTimelineSection = ({ order, sectionDetails, timeline }: TimelineSection): PageSection => {
  const children = <Timeline sectionName={sectionDetails.name} model={timeline} />;
  return { order, sectionDetails, children };
};

const buildAboutPageSections = ({ intro, timeline }: AboutPageModel): PageSection[] => {
  const timelineSection = buildTimelineSection(timeline);
  return [intro, timelineSection];
};

type AboutPageProps = {
  model: PageModel<AboutPageModel>;
};

const About: NextPage<AboutPageProps> = ({ model }) => (
  <SectionedPage model={model} buildPageSections={buildAboutPageSections} />
);

export const getStaticProps = async () => {
  const model = { ...data };

  // Filter out invalid file paths.
  model.sections = filterValidSectionDetailImages(model.sections);

  return { props: { model } };
};

export default About;
