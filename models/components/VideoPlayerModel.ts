import OrderedItem from '../shared/OrderedItem';

export type VideoModel = OrderedItem & {
  title: string;
  video: string;
};

type VideoPlayerModel = {
  videoList: VideoModel[];
};

export default VideoPlayerModel;
