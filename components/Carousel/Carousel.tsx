import { useEffect, useState } from 'react';
import CarouselModel, { CardModel } from '../../models/components/CarouselModel';
import { Color, getThemeName, Theme, ThemeName } from '../../models/shared/ThemedModel';
import styles from '../../styles/carousel.module.css';
import { fixFilePath, lockVerticalScroll, sortByReverseOrder, unlockVerticalScroll } from '../../utils/utils';
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
  id: string;
  theme: Theme;
  model: CarouselModel;
};

const Carousel = ({ id, theme, model }: CarouselProps) => {
  const getCardList = () => {
    const isCardValid = ({ image }: CardModel) => image !== '';

    const filteredCards = model.cardList.filter(isCardValid).map((card) => {
      const image = fixFilePath(card.image);
      return { ...card, image };
    });

    return sortByReverseOrder(filteredCards);
  };

  const cardList = getCardList();
  const themeName = getThemeName(theme);

  // Initialize currentCardIndex to -1 to prevent page from scrolling carousel into view on load.
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(-1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // There is no way of telling if the carousel is currently scrolling. Record the last scroll
  // time to prevent opening a new card while the carousel is still scrolling.
  const [lastScrollTime, setLastScrollTime] = useState<number>(0);

  const onCarouselScroll = () => {
    // See comments in cardClickHandler for how the lastScrollTime is used.
    setLastScrollTime(new Date().getTime());
  };

  const cardClickHandler = (index: number) => {
    /**
     * Disable opening a card fullscreen until the carousel has finished scrolling (approximately
     * 50 milliseconds has passed since last scroll). When a card is clicked, the carousel scrolls
     * it into view and enters fullscreen mode. If the user clicks a card while the carousel is
     * moving, then the wrong card is opened because the scroll distance is off.
     */
    const milliseconds = new Date().getTime() - lastScrollTime;
    if (milliseconds > 50) {
      toggleFullscreen(index);
    }
  };

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
    setIsFullscreen(true);
    // will these two states update at the same time?
    setCurrentCardIndex(cardIndex);
  };

  useEffect(() => {
    if (isFullscreen) {
      document
        .getElementById(`${id}CarouselCard${currentCardIndex}`)
        ?.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'center' });
    }
  }, [currentCardIndex, id, isFullscreen]);

  const exitFullscreen = () => {
    setIsFullscreen(false);
  };

  const toggleFullscreen = (cardIndex: number) => {
    if (isFullscreen) {
      unlockVerticalScroll();
      exitFullscreen();
    } else {
      lockVerticalScroll();
      enterFullscreen(cardIndex);
    }
  };

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
    <div id={id} className={`${styles.carouselContainer} ${themeName}`}>
      <ul className={`${styles.carousel} ${isFullscreen ? styles.overlay : ''}`} onScroll={onCarouselScroll}>
        <li className={styles.dummy} />
        {cardList.map((card, i) => {
          const cardId = `${id}CarouselCard${i}`;
          return (
            <Card
              key={cardId}
              id={cardId}
              themeName={themeName}
              model={card}
              isFullscreen={isFullscreen}
              isCurrentCard={currentCardIndex === i}
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
