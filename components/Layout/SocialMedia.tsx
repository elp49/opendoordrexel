import Link from 'next/link';
import icons from '../../data/icons.json';
import TextLink from '../../models/shared/TextLink';
import { ThemeName } from '../../models/shared/ThemedModel';

type SocialMediaProps = {
  id: string;
  themeName: string;
  socialMedia: TextLink[];
  listClassName: string;
  iconClassName: string;
};

const SocialMedia = ({ id, themeName, socialMedia, listClassName, iconClassName }: SocialMediaProps) => (
  <ol className={`${listClassName} ${themeName}`}>
    {socialMedia.map(({ text, href }, i) => (
      <li key={`${id}Link-${i}`} className={iconClassName}>
        <Link href={href}>
          <a title={text} target="_blank" rel="noreferrer">
            <i className={text.toLowerCase()} />
          </a>
        </Link>
      </li>
    ))}
    <style jsx>
      {`
        .${ThemeName.White} .facebook {
          background-image: url(${icons.facebook.blue});
        }
        .${ThemeName.Blue} .facebook {
          background-image: url(${icons.facebook.white});
        }
        .${ThemeName.White} .instagram {
          background-image: url(${icons.instagram.blue});
        }
        .${ThemeName.Blue} .instagram {
          background-image: url(${icons.instagram.white});
        }
        @media not all and (pointer: coarse) {
          .${ThemeName.White} .facebook:hover,
          .${ThemeName.Blue} .facebook:hover {
            background-image: url(${icons.facebook.grey});
          }
          .${ThemeName.White} .instagram:hover,
          .${ThemeName.Blue} .instagram:hover {
            background-image: url(${icons.instagram.grey});
          }
        }
      `}
    </style>
  </ol>
);

export default SocialMedia;
