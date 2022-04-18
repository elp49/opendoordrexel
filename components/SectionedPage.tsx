import data from '../data/layout.json';
import CarouselModel from '../models/components/CarouselModel';
import EventBoardModel from '../models/components/EventBoardModel';
import SlideshowModel from '../models/components/SlideshowModel';
import TimelineModel from '../models/components/TimelineModel';
import VideoPlayerModel from '../models/components/VideoPlayerModel';
import PageModel from '../models/PageModel';
import SectionModel, { ComponentType, SectionComponent, SectionDetails } from '../models/SectionModel';
import OrderedItem from '../models/shared/OrderedItem';
import { Theme } from '../models/shared/ThemedModel';
import { sortByOrder } from '../utils/utils';
import Announcements from './Announcements/Announcements';
import Carousel from './Carousel/Carousel';
import Layout from './Layout/Layout';
import { ScrollButtonOptions } from './Section/ScrollButton';
import Section from './Section/Section';
import Slideshow from './Slideshow/Slideshow';
import Timeline from './Timeline/Timeline';
import VideoPlayer from './VideoPlayer/VideoPlayer';

type PageSection = OrderedItem & {
  sectionDetails: SectionDetails;
  children: JSX.Element[];
};

type SectionedPageProps = {
  model: PageModel;
};

const SectionedPage = ({ model }: SectionedPageProps) => {
  const { name, title } = model;
  const id = name !== '' ? name : 'page';

  const getComponentJsxByType = (component: SectionComponent, id: string) => {
    let jsx = <></>;

    const { theme, componentType, model } = component;

    switch (componentType) {
      case ComponentType.Announcements:
        jsx = <Announcements key={id} id={id} theme={theme} model={model as EventBoardModel} />;
        break;

      case ComponentType.Carousel:
        jsx = <Carousel key={id} id={id} theme={theme} model={model as CarouselModel} />;
        break;

      case ComponentType.Slideshow:
        jsx = <Slideshow key={id} id={id} theme={theme} model={model as SlideshowModel} />;
        break;

      case ComponentType.Timeline:
        jsx = <Timeline key={id} id={id} theme={theme} model={model as TimelineModel} />;
        break;

      case ComponentType.VideoPlayer:
        jsx = <VideoPlayer key={id} id={id} theme={theme} model={model as VideoPlayerModel} />;
        break;

      default:
        break;
    }

    return jsx;
  };

  const getPageSections = () => {
    const getComponentId = (sectionIndex: number, componentIndex: number) =>
      `${id}Section${sectionIndex}Component${componentIndex}`;

    const buildPageSections = (sectionsModels: SectionModel[]) => {
      const sections: PageSection[] = sectionsModels.map(({ order, sectionDetails, components }, sectionIndex) => {
        const sortedComponents: SectionComponent[] = sortByOrder(components);
        const children = sortedComponents.map((component, componentIndex) =>
          getComponentJsxByType(component, getComponentId(sectionIndex, componentIndex))
        );

        return { order, sectionDetails, children };
      });

      return sortByOrder(sections);
    };

    const pageSections: PageSection[] = buildPageSections(model.sections);
    return sortByOrder(pageSections);
  };

  const getLastSectionTheme = (sortedSections: PageSection[]) => {
    // Sections must be sorted beforehand.
    let lastSectionTheme: Theme = Theme.White;
    if (sortedSections.length > 0) {
      lastSectionTheme = sortedSections[sortedSections.length - 1].sectionDetails.theme;
    }

    return lastSectionTheme;
  };

  const sections = getPageSections();
  const lastSectionTheme = getLastSectionTheme(sections);

  return (
    <Layout id={id} title={title} lastSectionTheme={lastSectionTheme} model={data}>
      {sections.map(({ sectionDetails, children }, i) => {
        const getSectionId = (sectionIndex: number) => `${id}Section-${sectionIndex}`;

        const getScrollButtonOptions = (): ScrollButtonOptions => {
          let nextSectionId = '';
          let isScrollDown = true;

          if (sectionDetails.hasScrollButton) {
            // If current section is not the last section, then get the next section's id.
            if (sections.length - 1 > i) {
              nextSectionId = getSectionId(i + 1);
            } else {
              // Get the layout id so that the scroll button will scroll the page to the top when clicked.
              nextSectionId = id;
              isScrollDown = false;
            }
          }

          return { nextSectionId, isScrollDown };
        };

        const scrollOptions = getScrollButtonOptions();

        return (
          <Section
            key={getSectionId(i)}
            id={getSectionId(i)}
            sectionDetails={sectionDetails}
            scrollOptions={scrollOptions}
          >
            {children}
          </Section>
        );
      })}
    </Layout>
  );
};

export default SectionedPage;
