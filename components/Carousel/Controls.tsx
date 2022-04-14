import styles from '../../styles/carousel.module.css';
import { ScrollDirection } from './Carousel';

type ControlsProps = {
  exitFullscreen: () => void;
  scrollCarousel: (direction: ScrollDirection) => void;
};

const Controls = ({ exitFullscreen, scrollCarousel }: ControlsProps) => (
  <>
    <button
      className={`${styles.customButton} ${styles.control} ${styles.close}`}
      type="button"
      onClick={exitFullscreen}
    >
      <span>&times;</span>
    </button>
    <button
      className={`${styles.customButton} ${styles.control} ${styles.arrow} ${styles.left}`}
      type="button"
      onClick={() => scrollCarousel(ScrollDirection.Left)}
    >
      <span>&lang;</span>
    </button>
    <button
      className={`${styles.customButton} ${styles.control} ${styles.arrow} ${styles.right}`}
      type="button"
      onClick={() => scrollCarousel(ScrollDirection.Right)}
    >
      <span>&rang;</span>
    </button>
  </>
);

export default Controls;
