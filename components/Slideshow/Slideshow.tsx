import { useCallback, useEffect, useState } from 'react';
import SlideshowModel, { SlideModel } from '../../models/components/SlideshowModel';
import { getThemeName, Theme } from '../../models/shared/ThemedModel';
import styles from '../../styles/slideshow.module.css';
import { fixFilePath, isDefined, isMobileDevice, sortByReverseOrder } from '../../utils/utils';
import Badge from './Badge';
import Slide from './Slide';

const DEFAULT_TIMEOUT_DURATION = 7000;

type SlideshowProps = {
  id: string;
  theme: Theme;
  model: SlideshowModel;
};

const Slideshow = ({ id, theme, model }: SlideshowProps): JSX.Element => {
  const getSlideList = () => {
    const isSlideActive = (slide: SlideModel) => slide.showOnMobile || slide.showOnDesktop;

    const filteredSlides = model.slideList.filter(isSlideActive).map((slide) => {
      const image = fixFilePath(slide.image);
      return { ...slide, image };
    });

    return sortByReverseOrder(filteredSlides);
  };

  const slideList = getSlideList();
  const timeoutDuration =
    model.timeoutDurationInSeconds > 0 ? model.timeoutDurationInSeconds * 1000 : DEFAULT_TIMEOUT_DURATION;
  const themeName = getThemeName(theme);

  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(false);

  // Slide visibility depends if user agent is a mobile or dekstop device.
  const isSlideVisible = useCallback(
    (isScreenCurrentlyMobile: boolean, slideIndex: number) => {
      const { showOnMobile, showOnDesktop } = slideList[slideIndex];
      return (isScreenCurrentlyMobile && showOnMobile) || (!isScreenCurrentlyMobile && showOnDesktop);
    },
    [slideList]
  );

  /**
   * The isMobile parameter is needed because of some dependency bullshit. We cannot rely on the
   * current state of isMobileScreen alone because showNextVisibleSlide is also called from the
   * windowResizeListener. The windowResizeListener only calls showNextVisibleSlide when the screen
   * size changes from mobile to desktop or vice versa, which means that the state of
   * isMobileScreen will not have been updated to the correct value yet. :,)
   */
  const showNextVisibleSlide = useCallback(
    (isMobile?: boolean) => {
      const isScreenCurrentlyMobile = isDefined(isMobile) ? (isMobile as boolean) : isMobileScreen;

      // Get the index of the next visible slide to show.
      for (let i = 1; i <= slideList.length; i++) {
        // Get the index of the next slide in list. If last slide, then index is zero.
        const potentialNextSlideIndex = (currentSlideIndex + i) % slideList.length;
        if (isSlideVisible(isScreenCurrentlyMobile, potentialNextSlideIndex)) {
          setCurrentSlideIndex(potentialNextSlideIndex);
          break;
        }
      }
    },
    [currentSlideIndex, isMobileScreen, isSlideVisible, slideList.length]
  );

  useEffect(() => {
    const windowResizeListener = () => {
      /**
       * If the screen size changed from either mobile or desktop to the other, then update the
       * screen size and set the current slide (some slides are only shown on mobile or desktop).
       */
      const isMobile = isMobileDevice();
      if (isMobileScreen !== isMobile) {
        setIsMobileScreen(isMobile);

        if (!isSlideVisible(isMobile, currentSlideIndex)) {
          showNextVisibleSlide(isMobile);
        }
      }
    };

    window.addEventListener('resize', windowResizeListener);

    return () => window.removeEventListener('resize', windowResizeListener);
  }, [currentSlideIndex, isMobileScreen, isSlideVisible, showNextVisibleSlide, slideList]);

  useEffect(() => {
    if (slideList.length > 1) {
      // Set a timeout to move to the next slide.
      const slideshowTimeout = setTimeout(showNextVisibleSlide, timeoutDuration);
      return () => clearTimeout(slideshowTimeout);
    }
  }, [showNextVisibleSlide, slideList.length, timeoutDuration]);

  useEffect(() => {
    setIsMobileScreen(isMobileDevice());
  }, []);

  return (
    <div id={id} className={`${styles.slideshow} ${themeName}`}>
      <ol className={styles.slideList}>
        {slideList.map((slide, i) => {
          const slideId = `${id}Slide${i}`;
          return (
            <Slide
              key={slideId}
              id={slideId}
              model={slide}
              isCurrentSlide={currentSlideIndex === i}
              isMobileScreen={isMobileScreen}
            />
          );
        })}
      </ol>
      {slideList.length > 1 && (
        <ol className={styles.badgeList}>
          {slideList.map((_, i) => {
            const badgeId = `${id}Badge${i}`;
            return (
              isSlideVisible(isMobileScreen, i) && (
                <Badge
                  key={badgeId}
                  id={badgeId}
                  isCurrentSlide={currentSlideIndex === i}
                  badgeClickHandler={() => setCurrentSlideIndex(i)}
                />
              )
            );
          })}
        </ol>
      )}
    </div>
  );
};

export default Slideshow;
