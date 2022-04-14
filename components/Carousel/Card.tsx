import Image from 'next/image';
import { useEffect, useState } from 'react';
import { CardModel } from '../../models/components/CarouselModel';
import { Color, ThemeName } from '../../models/ThemedModel';
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

  // Decide if you want to use Image component or backgroundImage style, divs have better performance
  type ObjectFit = NonNullable<JSX.IntrinsicElements['img']['style']>['objectFit'];
  const [objectFit, setObjectFit] = useState<ObjectFit>();

  useEffect(() => {
    // Change the card's object-fit style when isFullScreen changes.
    if (isFullscreen) {
      setObjectFit('contain');
    } else {
      setObjectFit('cover');
    }
  }, [isFullscreen]);

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
        {/* <div className={styles.cardImage} style={{ backgroundImage: `url(${image})` }} /> */}
        <Image alt="" src={image} layout="fill" objectFit={objectFit} objectPosition="50% 50%" />
      </button>
      <style jsx>
        {`
          .${ThemeName.Blue} {
            background-color: ${Color.White};
          }
          .${ThemeName.White} {
            background-color: ${Color.Blue};
          }
        `}
      </style>
    </li>
  );
};

export default Card;
