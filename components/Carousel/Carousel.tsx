import { useEffect, useState } from 'react';
import CarouselModel, { CardModel } from '../../models/components/CarouselModel';
import { Color, getThemeName, ThemeName } from '../../models/ThemedModel';
import styles from '../../styles/carousel.module.css';
import { createStyle, fixFilePath, isMobileDevice, sortByReverseOrder } from '../../utils/utils';
import Card from './Card';
import Controls from './Controls';

export enum ScrollDirection {
  Left = -1,
  Right = 1,
}

// Keyboard event codes.
enum KeyboardEventCode {
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',
  Escape = 'Escape',
}

type CarouselProps = {
  sectionName: string;
  model: CarouselModel;
};

const Carousel = ({ sectionName, model }: CarouselProps) => {
  const id = sectionName !== '' ? sectionName : 'carousel';

  const getCardList = () => {
    const isCardValid = ({ image }: CardModel) => image !== '';

    const filteredCards = model.cardList.filter(isCardValid).map((card) => {
      const image = fixFilePath(card.image);
      return { ...card, image };
    });

    return sortByReverseOrder(filteredCards);
  };

  const cardList = getCardList();
  const themeName = getThemeName(model.theme);

  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isAutoScrollActive, setIsAutoScrollActive] = useState<boolean>(false);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);

  // Scroll the carousel to the next card based on a given direction.
  const scrollToNextCard = (direction: ScrollDirection) => {
    let nextCardIndex = currentCardIndex + direction;

    const lastCardIndex = cardList.length - 1;
    if (nextCardIndex > lastCardIndex) {
      nextCardIndex = 0;
    } else if (nextCardIndex < 0) {
      nextCardIndex = lastCardIndex;
    }

    setCurrentCardIndex(nextCardIndex);
  };

  const enterFullscreen = (cardIndex: number) => {
    setCurrentCardIndex(cardIndex);
    setIsFullscreen(true);
  };

  const exitFullscreen = () => {
    setIsFullscreen(false);
  };

  const toggleFullscreen = (cardIndex: number) => {
    if (isFullscreen) {
      exitFullscreen();
    } else {
      enterFullscreen(cardIndex);
    }
  };

  const cardClickHandler = (index: number) => {
    toggleFullscreen(index);

    // Auto scroll should be turned off until a card is clicked to prevent the page from scrolling
    // the carousel into view on page load.
    setIsAutoScrollActive(true);
  };

  useEffect(() => {
    const removeScrollbar = () => {
      createStyle(`
        .${styles.carousel}::-webkit-scrollbar {
          display: none;
        }
      `);
    };

    // If the user is on a mobile device, then remove the carousel scrollbar.
    if (isMobileDevice()) {
      removeScrollbar();
    }
  }, []);

  /**
   * The fullscreen keydown event listener will be set on every render because no dependency array
   * is given. This is intentional due to its dependencies on scrollToNextCard and exitFullscreen.
   */
  useEffect(() => {
    // Keydown listener for when carousel is fullscreen.
    const fullscreenKeydownListener = (event: KeyboardEvent) => {
      // Only set keydown event if carousel is in fullscreen.
      if (isFullscreen) {
        switch (event.code) {
          // Scroll carousel left.
          case KeyboardEventCode.ArrowLeft:
            event.preventDefault();
            scrollToNextCard(ScrollDirection.Left);
            break;

          // Scroll carousel right.
          case KeyboardEventCode.ArrowRight:
            event.preventDefault();
            scrollToNextCard(ScrollDirection.Right);
            break;

          // Exit fullscreen.
          case KeyboardEventCode.Escape:
            event.preventDefault();
            exitFullscreen();
            break;

          default:
            break;
        }
      }
    };

    // Set keydown listener for fullscreen key events.
    document.addEventListener('keydown', fullscreenKeydownListener);

    return () => {
      document.removeEventListener('keydown', fullscreenKeydownListener);
    };
  });

  return (
    <div id={`${id}CarouselContainer`} className={`${styles.carouselContainer} ${themeName}`}>
      <ul id={`${id}Carousel`} className={`${styles.carousel} ${isFullscreen ? styles.overlay : ''}`}>
        <li className={styles.dummy} />
        {cardList.map((card, i) => {
          const cardId = `${id}CarouselCard-${i}`;
          return (
            <Card
              key={cardId}
              id={cardId}
              themeName={themeName}
              model={card}
              isFullscreen={isFullscreen}
              isCurrentCard={currentCardIndex === i}
              isAutoScrollActive={isAutoScrollActive}
              cardClickHandler={() => cardClickHandler(i)}
            />
          );
        })}
        <li className={styles.dummy} />
      </ul>
      {isFullscreen && <Controls exitFullscreen={exitFullscreen} scrollCarousel={scrollToNextCard} />}
      <style jsx>
        {`
          .${ThemeName.White} {
            background-color: ${Color.White};
          }
          .${ThemeName.Blue} {
            background-color: ${Color.Blue};
          }
          .${styles.overlay} {
            background-color: rgba(0, 0, 0, 0.5);
          }
        `}
      </style>
    </div>
  );
};

export default Carousel;
