import Link from 'next/link';
import TextLink from '../../models/shared/TextLink';
import { Color, ThemeName } from '../../models/shared/ThemedModel';

type PageListProps = {
  id: string;
  themeName: string;
  pageList: TextLink[];
  listClassName: string;
  linkClassName: string;
};

const PageList = ({ id, themeName, pageList, listClassName, linkClassName }: PageListProps) => (
  <ol className={`${listClassName} ${themeName}`}>
    {pageList.map(({ text, href }, i) => (
      <li key={`${id}PageList-${i}`} className={linkClassName}>
        <Link href={href}>
          <a title={text} className="pageLink">
            {text}
          </a>
        </Link>
      </li>
    ))}
    <style jsx>
      {`
        .${ThemeName.White} .pageLink {
          color: ${Color.Blue};
        }
        .${ThemeName.Blue} .pageLink {
          color: ${Color.White};
        }
        @media not all and (pointer: coarse) {
          .${ThemeName.White} .pageLink:hover,
          .${ThemeName.White} .pageLink:focus,
          .${ThemeName.Blue} .pageLink:hover,
          .${ThemeName.Blue} .pageLink:focus {
            color: ${Color.Grey};
          }
        }
      `}
    </style>
  </ol>
);

export default PageList;
