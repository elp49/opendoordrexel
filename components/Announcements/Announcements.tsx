import { useState } from 'react';
import EventBoardModel, { PostModel } from '../../models/components/EventBoardModel';
import { Color, getThemeName, ThemeName } from '../../models/ThemedModel';
import styles from '../../styles/announcements.module.css';
import { sortByOrder } from '../../utils/utils';
import Post from './Post';

type AnnouncementsProps = {
  sectionName: string;
  model: EventBoardModel;
};

const Announcements = ({ sectionName, model }: AnnouncementsProps): JSX.Element => {
  const id = sectionName !== '' ? sectionName : 'announcements';
  const announcementsId = `${id}Announcements`;

  const getPostList = (): PostModel[] => {
    const isPostValid = (post: PostModel) => post.details !== '';
    const filteredList = model.postList.filter(isPostValid);
    return sortByOrder(filteredList);
  };

  const postList = getPostList();
  const themeName = getThemeName(model.theme);

  const [isMore, setIsMore] = useState<boolean>(false);

  return (
    <div id={announcementsId} className={styles.announcements}>
      <ul className={`${styles.postList} ${themeName}`} style={{ maxHeight: !isMore ? '650px' : '' }}>
        {postList.map((post, i) => (
          <Post key={`${announcementsId}Post${i}`} model={post} themeName={themeName} isLeftPost={i % 2 === 0} />
        ))}
      </ul>
      <div className={`${styles.feedController} ${themeName}`}>
        <button onClick={() => setIsMore(!isMore)}>{isMore ? 'less' : 'more'}</button>
      </div>
      <style jsx>
        {`
          .${ThemeName.White} {
            background-color: ${Color.White};
            color: ${Color.Black};
          }
          .${ThemeName.Blue} {
            background-color: ${Color.Blue};
            color: ${Color.White};
          }
          .${ThemeName.White}.${styles.feedController} {
            filter: drop-shadow(-10px -10px 4px ${Color.White});
          }
          .${ThemeName.Blue}.${styles.feedController} {
            filter: drop-shadow(-10px -10px 4px ${Color.Blue});
          }
          .${styles.feedController} > button {
            color: ${Color.LightGrey};
          }
          @media not all and (pointer: coarse) {
            .${ThemeName.White}.${styles.feedController} > button:hover {
              color: ${Color.Blue};
            }
            .${ThemeName.Blue}.${styles.feedController} > button:hover {
              color: ${Color.White};
            }
          }
        `}
      </style>
    </div>
  );
};

export default Announcements;
