import ReactPlayer from 'react-player'
import { isDefined, sortListByReverseOrder, getTheme, fixFilePath } from '../components/Layout';
import styles from './VideoCarousel.module.css'

function buildVideoList(list) {
  if (!isDefined(list) || list.length === 0)
    return [];

  let videoList = sortListByReverseOrder(list);
  videoList = videoList.filter(listItem => {
    if (isDefined(listItem.video))
      return true;
  }).map((listItem) => {
    listItem.video = fixFilePath(listItem.video);
    return listItem;
  });

  return videoList;
}

export default function VideoCarousel({ videoCarousel }) {
  if (!isDefined(videoCarousel))
    return;

  const id = isDefined(videoCarousel.name) ? videoCarousel.name : 'videoCarousel';
  const theme = getTheme(videoCarousel.theme);
  const videoList = buildVideoList(videoCarousel.videoList);

  return (
    <div className={theme}>
      <div id={`videoCarouselContainer`}>
        <ol id={id}>
          {
            videoList.map((listItem, i) => {
              const videoId = `${id}Video-${i}`;
              const { title, video } = listItem;
              const className = i % 2 === 0 ? styles.leftVideo : styles.rightVideo;

              return (
                <li key={videoId} id={videoId} className={`${styles.testimony} ${className}`}>
                  <h1 className={styles.title}>{title}</h1>
                  <ReactPlayer url={video} controls
                    width={'100%'} height={'auto'}
                    style={{ margin: 'auto' }} />
                </li>
              );
            })
          }
        </ol>
      </div>
    </div>
  );
}
