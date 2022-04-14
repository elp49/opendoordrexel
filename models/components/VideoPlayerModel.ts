import { isFilePathValid } from '../../utils/fs-handler';
import OrderedItem from '../OrderedItem';
import ThemedModel from '../ThemedModel';

export type VideoModel = OrderedItem & {
  title: string;
  video: string;
};

type VideoPlayerModel = ThemedModel & {
  videoList: VideoModel[];
};

export const filterValidVideos = (videoList: VideoModel[]) => videoList.filter(({ video }) => isFilePathValid(video));

export default VideoPlayerModel;
