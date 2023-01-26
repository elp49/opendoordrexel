import { CardModel } from '../../models/components/CarouselModel';
import { Color, ThemeName } from '../../models/shared/ThemedModel';
import styles from '../../styles/carousel.module.css';

type CardProps = {
  id: string;
  themeName: string;
  model: CardModel;
  isFullscreen: boolean;
  isCurrentCard: boolean;
  cardClickHandler: () => void;
};

const Card = ({ id, themeName, model, isFullscreen, isCurrentCard, cardClickHandler }: CardProps) => {
  const { image } = model;
  const backgroundSize = isFullscreen ? 'contain' : 'cover';

  return (
    <li id={id} className={`${styles.card} ${isFullscreen ? styles.fullscreenCard : ''} ${themeName}`}>
      <button className={`${styles.customButton} ${styles.cardButton}`} type="button" onClick={cardClickHandler}>
        <div
          className={styles.cardImage}
          style={{ backgroundImage: `url(${image})`, backgroundSize: backgroundSize }}
        />
      </button>
      <style jsx>
        {`
          .${ThemeName.Blue} {
            background-color: ${Color.White};
          }
          .${ThemeName.White} {
            background-color: ${Color.Blue};
          }
          .${styles.fullscreenCard} {
            background-color: ${Color.Black};
          }
        `}
      </style>
    </li>
  );
};

export default Card;
