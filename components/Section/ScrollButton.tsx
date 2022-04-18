import icons from '../../data/icons.json';
import { Color, ThemeName } from '../../models/shared/ThemedModel';
import styles from '../../styles/scrollButton.module.css';

export type ScrollButtonOptions = {
  nextSectionId: string;
  isScrollDown: boolean;
};

type ScrollButtonProps = {
  themeName: string;
  scrollOptions: ScrollButtonOptions;
};

const ScrollButton = ({ themeName, scrollOptions }: ScrollButtonProps): JSX.Element => {
  const { nextSectionId, isScrollDown } = scrollOptions;

  const scrollToNextSection = () => {
    const nextSection = document.getElementById(nextSectionId);
    if (nextSection) {
      nextSection.scrollIntoView(true);
    }
  };

  return (
    <button className={`${styles.chevronButton} ${themeName}`} type="button" onClick={scrollToNextSection}>
      <i className={`${isScrollDown ? 'chevronDown' : 'chevronUp'} ${styles.icon}`} />
      <style jsx>
        {`
          .${styles.icon} {
            background-color: ${Color.OffWhite};
          }
          .chevronDown {
            background-image: url(${icons.chevronDown.blue});
          }
          .chevronUp {
            background-image: url(${icons.chevronUp.blue});
          }
          @media not all and (pointer: coarse) {
            .${ThemeName.White} > .chevronDown:hover,
            .${ThemeName.White} > .chevronDown:active {
              background-color: ${Color.Blue};
              background-image: url(${icons.chevronDown.white});
            }
            .${ThemeName.White} > .chevronUp:hover,
            .${ThemeName.White} > .chevronUp:active {
              background-color: ${Color.Blue};
              background-image: url(${icons.chevronUp.white});
            }
            .${ThemeName.Blue} > .${styles.icon}:hover, .${ThemeName.Blue} > .${styles.icon}:active {
              background-color: ${Color.White};
            }
          }
        `}
      </style>
    </button>
  );
};

export default ScrollButton;
