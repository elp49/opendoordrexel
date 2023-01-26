import VideoPlayerModel, { VideoModel } from '../../models/components/VideoPlayerModel';
import { getThemeName, Theme } from '../../models/shared/ThemedModel';
import styles from '../../styles/videoPlayer.module.css';
import { fixFilePath, sortByReverseOrder } from '../../utils/utils';
import Video from './Video';

type VideoPlayerProps = {
  id: string;
  theme: Theme;
  model: VideoPlayerModel;
};

const VideoPlayer = ({ id, theme, model }: VideoPlayerProps) => {
  const getVideoList = () => {
    const isVideoValid = ({ video }: VideoModel) => video !== '';

    const filteredList = model.videoList.filter(isVideoValid).map((videoPlayer) => {
      const video = fixFilePath(videoPlayer.video);
      return { ...videoPlayer, video };
    });

    return sortByReverseOrder(filteredList);
  };

  const videoList = getVideoList();
  const themeName = getThemeName(theme);

  return (
    <div id={id} className={themeName}>
      <ol className={styles.videoList}>
        {videoList.map((video, i) => (
          <Video key={`${id}Video-${i}`} className={i % 2 === 0 ? styles.leftVideo : styles.rightVideo} video={video} />
        ))}
      </ol>
    </div>
  );
};

export default VideoPlayer;
