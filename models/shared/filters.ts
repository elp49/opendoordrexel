import { isFilePathValid } from '../../utils/fs-handler';
import CarouselModel from '../components/CarouselModel';
import EventBoardModel from '../components/EventBoardModel';
import SlideshowModel from '../components/SlideshowModel';
import TimelineModel from '../components/TimelineModel';
import VideoPlayerModel from '../components/VideoPlayerModel';
import SectionModel, { ComponentType, SectionComponent } from '../SectionModel';

const filterValidAnnouncementsData = (model: EventBoardModel) => {
  model.postList = model.postList.filter(({ header, details }) => header !== '' || details !== '');
  return model;
};

const filterValidCarouselData = (model: CarouselModel) => {
  model.cardList = model.cardList.filter(({ image }) => isFilePathValid(image));
  return model;
};

const filterValidSlideshowData = (model: SlideshowModel) => {
  model.slideList = model.slideList.filter(({ image }) => isFilePathValid(image));
  return model;
};

const filterValidTimelineData = (model: TimelineModel) => {
  model.eventList = model.eventList.filter(({ details }) => details !== '');
  return model;
};

const filterValidVideoPlayerData = (model: VideoPlayerModel) => {
  model.videoList = model.videoList.filter(({ video }) => isFilePathValid(video));
  return model;
};

const filterValidComponentData = (component: SectionComponent) => {
  switch (component.componentType) {
    case ComponentType.Announcements:
      component.model = filterValidAnnouncementsData(component.model as EventBoardModel);
      break;

    case ComponentType.Carousel:
      component.model = filterValidCarouselData(component.model as CarouselModel);
      break;

    case ComponentType.Slideshow:
      component.model = filterValidSlideshowData(component.model as SlideshowModel);
      break;

    case ComponentType.Timeline:
      component.model = filterValidTimelineData(component.model as TimelineModel);
      break;

    case ComponentType.VideoPlayer:
      component.model = filterValidVideoPlayerData(component.model as VideoPlayerModel);
      break;

    default:
      break;
  }

  return component;
};

export const filterValidData = (sections: SectionModel[]) => {
  return sections.map((section) => {
    // Filter out invalid section image.
    if (!isFilePathValid(section.sectionDetails.image)) {
      section.sectionDetails.image = '';
    }

    // Filter out invalid data from each component in this section.
    section.components = section.components.map((sectionComponent) => filterValidComponentData(sectionComponent));

    return section;
  });
};
