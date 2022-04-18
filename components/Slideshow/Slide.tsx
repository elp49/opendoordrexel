import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SlideModel } from '../../models/components/SlideshowModel';
import { getTextLinks } from '../../models/shared/TextLink';
import { Color } from '../../models/shared/ThemedModel';
import styles from '../../styles/slideshow.module.css';

type SlideProps = {
  id: string;
  model: SlideModel;
  isCurrentSlide: boolean;
  isMobileScreen: boolean;
};

const Slide = ({ id, model, isCurrentSlide, isMobileScreen }: SlideProps) => {
  const { image, titles, showOnMobile, showOnDesktop } = model;
  const buttons = getTextLinks(model.buttons);

  const [displayStyle, setDisplayStyle] = useState<string>('');
  const [opacityStyle, setOpacityStyle] = useState<number>(0);

  useEffect(() => {
    const isSlideVisible = (isMobileScreen && showOnMobile) || (!isMobileScreen && showOnDesktop);
    if (isSlideVisible) {
      setDisplayStyle('block');
    } else {
      setDisplayStyle('none');
    }
  }, [isMobileScreen, showOnDesktop, showOnMobile]);

  useEffect(() => {
    if (isCurrentSlide) {
      setOpacityStyle(1);
    } else {
      setOpacityStyle(0);
    }
  }, [isCurrentSlide]);

  return (
    <li
      id={id}
      className={styles.slide}
      style={{
        backgroundImage: `url(${image})`,
        display: displayStyle,
        opacity: opacityStyle,
      }}
    >
      {titles.map((title, i) => (
        <div key={`${id}SlideTitle${i}`} className={styles.slideHeader}>
          <h1 className={styles.blurred}>{title}</h1>
          <h1 className={styles.clear}>{title}</h1>
        </div>
      ))}
      {buttons.length > 0 && (
        <ol className={styles.buttonList}>
          {buttons.map(({ href, text }, i) => (
            <li key={`${id}SlideButton${i}`} className={styles.slideButton}>
              <Link href={href}>
                <a>
                  <p>{text}</p>
                </a>
              </Link>
            </li>
          ))}
        </ol>
      )}
      <style jsx>
        {`
          .${styles.blurred} {
            background-color: ${Color.Blue};
            color: ${Color.Blue};
          }
          .${styles.clear} {
            color: ${Color.White};
          }
          .${styles.slideButton} {
            background-color: ${Color.White};
          }
          .${styles.slideButton} a {
            color: ${Color.Black};
          }
        `}
      </style>
    </li>
  );
};

export default Slide;
