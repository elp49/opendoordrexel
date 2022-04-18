import { SectionDetails } from '../../models/SectionModel';
import { getTextLinks } from '../../models/shared/TextLink';
import { Color, getThemeName, ThemeName } from '../../models/shared/ThemedModel';
import styles from '../../styles/section.module.css';
import IntroLink from './IntroLink';
import ScrollButton, { ScrollButtonOptions } from './ScrollButton';

type SectionProps = {
  id: string;
  sectionDetails: SectionDetails;
  scrollOptions: ScrollButtonOptions;
  children?: React.ReactNode;
};

const Section = ({ id, sectionDetails, scrollOptions, children }: SectionProps): JSX.Element => {
  const { titles, subtitles, links, image, descriptions, isRaw, isViewHeight, hasScrollButton } = sectionDetails;

  const themeName = getThemeName(sectionDetails.theme);
  const introLinks = getTextLinks(links);

  return (
    <section id={id} className={`${isRaw ? styles.raw : ''} ${isViewHeight ? styles.viewHeight : ''} ${themeName}`}>
      <div className={styles.sectionTitle}>
        {titles.map((title, i) => (
          <h1 key={`${id}Title-${i}`} className={styles.title}>
            {title}
          </h1>
        ))}
        {subtitles.map((subtitle, i) => (
          <h3 key={`${id}Subtitle-${i}`} className={styles.subtitle}>
            {subtitle}
          </h3>
        ))}
        {image !== '' && (
          <div className={styles.pictureContainer}>
            <div className={styles.picture} style={{ backgroundImage: `url(${image})` }} />
          </div>
        )}
        {descriptions.map((description, i) => (
          <p key={`${id}Description-${i}`} className={styles.description}>
            {description}
          </p>
        ))}
      </div>
      <div className={styles.sectionContent} style={{ paddingBottom: hasScrollButton || isRaw ? '0' : '45px' }}>
        {introLinks.length > 0 && (
          <p style={{ textAlign: 'center' }}>
            {introLinks.map((link, i) => (
              <IntroLink key={`${id}IntroLink-${i}`} model={link} index={i} />
            ))}
          </p>
        )}
        {children}
        {hasScrollButton && <ScrollButton themeName={themeName} scrollOptions={scrollOptions} />}
      </div>
      <style jsx>
        {`
          .${ThemeName.White} {
            background-color: ${Color.White};
            color: ${Color.Black};
          }
          .${ThemeName.Blue} {
            background-color: ${Color.Blue};
            color: ${Color.White};
          }
          .${ThemeName.White} .${styles.subtitle}, .${ThemeName.White} .${styles.description} {
            color: ${Color.DarkGrey};
          }
        `}
      </style>
    </section>
  );
};

export default Section;
