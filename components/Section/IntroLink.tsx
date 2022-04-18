import Link from 'next/link';
import TextLink from '../../models/shared/TextLink';
import { Color } from '../../models/shared/ThemedModel';
import styles from '../../styles/introLink.module.css';

type IntroLinkProps = {
  model: TextLink;
  index: number;
};

const IntroLink = ({ model: { text, href }, index }: IntroLinkProps) => (
  <span className={styles.link}>
    {index > 0 ? ' | ' : ''}
    <Link href={href}>
      <a>{text}</a>
    </Link>
    <style jsx>
      {`
        .${styles.link}, .${styles.link} a:visited {
          color: ${Color.Blue};
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
