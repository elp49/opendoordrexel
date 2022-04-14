import { Color } from '../../models/ThemedModel';
import styles from '../../styles/slideshow.module.css';

type BadgeProps = {
  id: string;
  isCurrentSlide: boolean;
  badgeClickHandler: () => void;
};

const Badge = ({ id, isCurrentSlide, badgeClickHandler }: BadgeProps) => (
  <li id={id} className={`${styles.badge} ${isCurrentSlide ? styles.activeBadge : ''}`}>
    <button type="button" onClick={badgeClickHandler} />
    <style jsx>
      {`
        .${styles.badge} > button {
          background-color: ${Color.LightGrey};
        }
        .${styles.activeBadge} > button {
          background-color: ${Color.White};
        }
      `}
    </style>
  </li>
);

export default Badge;
