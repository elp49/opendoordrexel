import { PostModel } from '../../models/components/EventBoardModel';
import { Color, ThemeName } from '../../models/ThemedModel';
import styles from '../../styles/announcements.module.css';

type PostListProps = {
  model: PostModel;
  themeName: string;
  isLeftPost: boolean;
};

const Post = ({ model: { date, header, details }, themeName, isLeftPost }: PostListProps): JSX.Element => (
  <li className={`${isLeftPost ? styles.leftPost : styles.rightPost} ${themeName}`}>
    <div className={styles.postHeader}>
      <h1>{header}</h1>
      <p>{date}</p>
    </div>
    <div className={styles.postDetails}>
      <p>{details}</p>
    </div>
    <style jsx>
      {`
        .${ThemeName.Blue}, .${ThemeName.White} .${styles.postDetails} {
          background-color: ${Color.White};
          color: ${Color.Black};
        }
        .${ThemeName.White}, .${ThemeName.Blue} .${styles.postDetails} {
          background-color: ${Color.Blue};
          color: ${Color.White};
        }
        .${ThemeName.White} .${styles.postDetails} {
          border-color: ${Color.Blue};
        }
        .${ThemeName.Blue} .${styles.postDetails} {
          border-color: ${Color.White};
        }
      `}
    </style>
  </li>
);

export default Post;
