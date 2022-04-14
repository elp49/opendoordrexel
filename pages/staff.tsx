import { NextPage } from 'next';
import SectionedPage from '../components/SectionedPage';
import data from '../data/staff.json';
import PageModel, { filterValidSectionDetailImages } from '../models/PageModel';
import StaffPageModel from '../models/pages/StaffPageModel';
import PageSection from '../models/PageSection';

const buildStaffPageSections = ({ piltz, diana }: StaffPageModel): PageSection[] => [piltz, diana];

type StaffPageProps = {
  model: PageModel<StaffPageModel>;
};

const Staff: NextPage<StaffPageProps> = ({ model }) => (
  <SectionedPage model={model} buildPageSections={buildStaffPageSections} />
);

export const getStaticProps = async () => {
  const model = { ...data };

  // Filter out invalid file paths.
  model.sections = filterValidSectionDetailImages(model.sections);

  return { props: { model } };
};

export default Staff;
