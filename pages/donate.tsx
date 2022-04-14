import { NextPage } from 'next';
import SectionedPage from '../components/SectionedPage';
import data from '../data/donate.json';
import PageModel, { filterValidSectionDetailImages } from '../models/PageModel';
import DonatePageModel from '../models/pages/DonatePageModel';
import PageSection from '../models/PageSection';

const buildDonatePageSections = ({ info }: DonatePageModel): PageSection[] => [info];

type DonatePageProps = {
  model: PageModel<DonatePageModel>;
};

const Donate: NextPage<DonatePageProps> = ({ model }) => (
  <SectionedPage model={model} buildPageSections={buildDonatePageSections} />
);

export const getStaticProps = async () => {
  const model = { ...data };

  // Filter out invalid file paths.
  model.sections = filterValidSectionDetailImages(model.sections);

  return { props: { model } };
};

export default Donate;
