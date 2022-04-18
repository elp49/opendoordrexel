import { NextPage } from 'next';
import SectionedPage from '../components/SectionedPage';
import data from '../data/about.json';
import PageModel from '../models/PageModel';
import { filterValidData } from '../models/shared/filters';

const About: NextPage<PageModel> = (model) => <SectionedPage model={model} />;

export const getStaticProps = async () => {
  const model: PageModel = { ...data };

  // Filter out invalid file paths.
  model.sections = filterValidData(model.sections);

  return { props: model };
};

export default About;
