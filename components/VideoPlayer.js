import ReactPlayer from "react-player"
import { isDefined, sortListByReverseOrder, getTheme, fixFilePath } from "../utils/utils"
import styles from "./VideoPlayer.module.css"

function buildVideoList(list) {
  let videoList = []
  if (isDefined(list) && list.length >= 0) {
    const orderedList = sortListByReverseOrder(list)
    videoList = orderedList.filter(listItem => isDefined(listItem.video))
      .map((listItem) => {
        listItem.video = fixFilePath(listItem.video)
        return listItem
      })
  }

  return videoList
}

export default function VideoPlayer({ videoPlayer }) {
  const id = isDefined(videoPlayer.name) ? videoPlayer.name : "videoPlayer"
  const theme = getTheme(videoPlayer.theme)
  const videoList = buildVideoList(videoPlayer.videoList)

  return (
    <div className={theme}>
      <div id="videoPlayerContainer">
        <ol id={id} className={styles.videoList}>
          {
            videoList.map((listItem, i) => {
              const videoId = `${id}Video-${i}`
              const { title, video } = listItem
              const className = i % 2 === 0 ? styles.leftVideo : styles.rightVideo

              return (
                <li key={videoId} id={videoId} className={`${styles.testimony} ${className}`}>
                  <h2 className={styles.title}>{title}</h2>
                  <div className={styles.playerWrapper}>
                    <ReactPlayer url={video} controls height="100%" width="100%" className={styles.reactPlayer} />
                  </div>
                </li>
              )
            })
          }
        </ol>
      </div>
    </div>
  )
}
