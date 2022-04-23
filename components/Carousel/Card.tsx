import { useEffect } from 'react';
import { CardModel } from '../../models/components/CarouselModel';
import { Color, ThemeName } from '../../models/shared/ThemedModel';
import styles from '../../styles/carousel.module.css';

type CardProps = {
  id: string;
  themeName: string;
  model: CardModel;
  isFullscreen: boolean;
  isCurrentCard: boolean;
  isAutoScrollActive: boolean;
  cardClickHandler: () => void;
};

const Card = ({
  id,
  themeName,
  model,
  isFullscreen,
  isCurrentCard,
  isAutoScrollActive,
  cardClickHandler,
}: CardProps) => {
  const { image } = model;

  useEffect(() => {
    // If this card is the current card and auto scroll is active, then scroll the carousel to it.
    if (isCurrentCard && isAutoScrollActive) {
      const card = document.getElementById(id);
      if (card) {
        card.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'center' });
      }
    }
  }, [id, isCurrentCard, isAutoScrollActive]);

  return (
    <li id={id} className={`${styles.card} ${isFullscreen ? styles.fullscreenCard : ''} ${themeName}`}>
      <button className={`${styles.customButton} ${styles.cardButton}`} type="button" onClick={cardClickHandler}>
        {/* <div style={{ backgroundImage: `url(${process.env.OPEN_DOOR_API}${image})` }}></div> */}
        <div
          className={styles.cardImage}
          style={{ backgroundImage: `url(${image})`, backgroundSize: isFullscreen ? 'contain' : 'cover' }}
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
