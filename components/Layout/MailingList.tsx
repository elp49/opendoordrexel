import icons from '../../data/icons.json';
import { MailingListModel } from '../../models/components/LayoutModel';
import { Color, ThemeName } from '../../models/shared/ThemedModel';

type MailingListProps = {
  themeName: string;
  mailingList: MailingListModel;
  containerClassName: string;
  className: string;
};

const MailingList = ({ themeName, mailingList, containerClassName, className }: MailingListProps) => (
  <div className={`${containerClassName} ${themeName}`}>
    <p className="description">{mailingList.description}</p>
    <form className={className}>
      <input type="email" id="email" name="email" placeholder={mailingList.placeholder} />
      <button type="submit" className="arrowButton">
        <i className="arrowUp" />
      </button>
    </form>
    <style jsx>
      {`
        .${ThemeName.Blue} * {
          color: ${Color.White};
        }
        .${ThemeName.White} * {
          color: ${Color.Grey};
        }
        .${ThemeName.Blue} .arrowButton {
          background-color: ${Color.White};
          color: ${Color.Blue};
        }
        .${ThemeName.White} .arrowButton {
          background-color: ${Color.Blue};
          color: ${Color.White};
        }
        .${ThemeName.White} .arrowUp {
          background-image: url(${icons.arrowUp.white});
        }
        .${ThemeName.Blue} .arrowUp {
          background-image: url(${icons.arrowUp.blue});
        }
      `}
    </style>
  </div>
);

export default MailingList;
