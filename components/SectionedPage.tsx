import data from '../data/layout.json';
import PageModel, { KeyedPageSection } from '../models/PageModel';
import PageSection from '../models/PageSection';
import { Theme } from '../models/ThemedModel';
import { sortByOrder } from '../utils/utils';
import Layout from './Layout/Layout';
import Section from './Section/Section';

type SectionedPageProps<T extends KeyedPageSection> = {
  model: PageModel<T>;
  buildPageSections: (model: T) => PageSection[];
};

const SectionedPage = <T extends KeyedPageSection>({ model, buildPageSections }: SectionedPageProps<T>) => {
  const getPageSections = () => {
    const pageSections: PageSection[] = buildPageSections(model.sections);
    return sortByOrder<PageSection>(pageSections);
  };

  const getLastSectionTheme = (sortedSections: PageSection[]) => {
    // Sections must be sorted beforehand.
    let lastSectionTheme: Theme = Theme.White;
    if (sortedSections.length > 0) {
      lastSectionTheme = sortedSections[sortedSections.length - 1].sectionDetails.theme;
    }

    return lastSectionTheme;
  };

  const { name, title } = model;
  const sections = getPageSections();
  const lastSectionTheme = getLastSectionTheme(sections);

  const id = name !== '' ? name : 'layout';

  return (
    <Layout id={id} title={title} lastSectionTheme={lastSectionTheme} model={data}>
      {sections.map(({ sectionDetails, children }, i) => {
        const getSectionId = (sectionIndex: number) => `${id}Section-${sectionIndex}`;
        let nextSectionId = '';
        let isScrollDown = true;

        if (sectionDetails.hasScrollButton) {
          // If current section is not the last section, then get the next section's id.
          if (sections.length - 1 > i) {
            nextSectionId = getSectionId(i + 1);
          } else {
            // Get the layout id so that the scroll button will scroll to the top.
            nextSectionId = id;
            isScrollDown = false;
          }
        }

        return (
          <Section
            key={getSectionId(i)}
            id={getSectionId(i)}
            sectionDetails={sectionDetails}
            nextSectionId={nextSectionId}
            isScrollDown={isScrollDown}
          >
            {children}
          </Section>
        );
      })}
    </Layout>
  );
};

export default SectionedPage;
