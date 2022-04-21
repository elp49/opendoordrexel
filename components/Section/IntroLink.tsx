import Link from 'next/link';
import TextLink from '../../models/shared/TextLink';
import { Color, ThemeName } from '../../models/shared/ThemedModel';
import styles from '../../styles/introLink.module.css';

type IntroLinkProps = {
  themeName: ThemeName;
  model: TextLink;
  index: number;
};

const IntroLink = ({ themeName, model: { text, href }, index }: IntroLinkProps) => (
  <span className={`${styles.link} ${themeName}`}>
    {index > 0 ? ' | ' : ''}
    <Link href={href}>
      <a>{text}</a>
    </Link>
    <style jsx>
      {`
        .${ThemeName.White} a {
          color: ${Color.Blue};
        }
        .${ThemeName.Blue} a {
          color: ${Color.White};
        }
        @media not all and (pointer: coarse) {
          .${styles.link} a:hover,
          .${styles.link} a:focus {
            color: ${Color.Grey};
          }
        }
      `}
    </style>
  </span>
);

export default IntroLink;
