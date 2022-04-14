import VideoPlayerModel, { VideoModel } from '../../models/components/VideoPlayerModel';
import { getThemeName } from '../../models/ThemedModel';
import styles from '../../styles/videoPlayer.module.css';
import { fixFilePath, sortByReverseOrder } from '../../utils/utils';
import Video from './Video';

type VideoPlayerProps = {
  sectionName: string;
  model: VideoPlayerModel;
};

const VideoPlayer = ({ sectionName, model }: VideoPlayerProps) => {
  const id = sectionName !== '' ? sectionName : 'videoPlayer';

  const getVideoList = () => {
    const isVideoValid = ({ video }: VideoModel) => video !== '';

    const filteredList = model.videoList.filter(isVideoValid).map((videoPlayer) => {
      const video = fixFilePath(videoPlayer.video);
      return { ...videoPlayer, video };
    });

    return sortByReverseOrder(filteredList);
  };

  const videoList = getVideoList();
  const themeName = getThemeName(model.theme);

  return (
    <div className={themeName}>
      <ol className={styles.videoList}>
        {videoList.map((video, i) => (
          <Video key={`${id}Video-${i}`} className={i % 2 === 0 ? styles.leftVideo : styles.rightVideo} video={video} />
        ))}
      </ol>
    </div>
  );
};

export default VideoPlayer;
