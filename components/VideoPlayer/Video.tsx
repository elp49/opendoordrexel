import ReactPlayer from 'react-player';
import { VideoModel } from '../../models/components/VideoPlayerModel';
import styles from '../../styles/videoPlayer.module.css';

type VideoProps = {
  className: string;
  video: VideoModel;
};

const Video = ({ className, video }: VideoProps) => (
  <li className={`${styles.testimony} ${className}`}>
    <h2 className={styles.title}>{video.title}</h2>
    <div className={styles.playerWrapper}>
      <ReactPlayer url={video.video} controls height="100%" width="100%" className={styles.reactPlayer} />
    </div>
  </li>
);

export default Video;
