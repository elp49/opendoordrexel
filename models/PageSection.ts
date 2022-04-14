import SectionModel from './SectionModel';

type PageSection = SectionModel & {
  children?: JSX.Element;
};

export default PageSection;
