import { isFilePathValid } from '../utils/fs-handler';
import SectionModel from './SectionModel';

export type KeyedPageSection = {
  [key: string]: SectionModel;
};

type PageModel<T extends KeyedPageSection> = {
  name: string;
  title: string;
  sections: T;
};

export const filterValidSectionDetailImages = <T extends KeyedPageSection>(sections: T) => {
  const result = { ...sections };
  Object.keys(result).forEach((key) => {
    if (!isFilePathValid(result[key].sectionDetails.image)) {
      result[key].sectionDetails.image = '';
    }
  });

  return result;
};

export default PageModel;
