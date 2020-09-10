import { isDefined, getTheme } from './Layout';

function buildImageJsx(path) {
  if (!isDefined(path))
    return;

  return (
    <div className={'picture'} style={{ backgroundImage: `url(${path})` }}>
      <style jsx>
        {`
          .picture {
            height: 45%;
            min-height: 200px;
            width: 45%;
            min-width: 200px;
            margin: 55px auto;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            border-radius: 10px;
          }
          @media only screen and (min-width: 1000px) {
            .picture {
              height: 450px;
              width: 450px;
            }
          }
        `}
      </style>
    </div>
  );
}

export default function Section({ sectionDetails, isRaw, isViewHeight, children }) {
  if (!isDefined(sectionDetails))
    return;

  const id = isDefined(sectionDetails.name) ? sectionDetails.name : 'section';
  const theme = getTheme(sectionDetails.theme);
  const raw = isRaw ? 'raw' : '';
  const viewHeight = isViewHeight ? 'viewHeight' : '';
  const imageJsx = buildImageJsx(sectionDetails.image);

  return (
    <section id={`${id}Section`} className={`${theme} ${raw} ${viewHeight}`} style={{ position: 'relative' }}>
      <div className={'sectionTitle'}>
        {
          sectionDetails.titles.map((title, i) => {
            const key = `${id}SectionTitle-${i}`;

            return <h1 key={key} className={'title'}>{title}</h1>;
          })
        }
        {
          sectionDetails.subtitles.map((subtitle, i) => {
            const key = `${id}SectionSubtitle-${i}`;

            return <h3 key={key} className={'grey subtitle'}>{subtitle}</h3>;
          })
        }
        {imageJsx}
        {
          sectionDetails.descriptions.map((description, i) => {
            const key = `${id}SectionDescription-${i}`;

            return <p key={key} className={'grey description'}>{description}</p>;
          })
        }
      </div>
      <div className={'sectionContent'}>{children}</div>
      <style jsx>
        {`
          .white {
            background-color: #fff;
            color: #000;
          }
          .white .grey {
            color: #555;
          }
          .blue {
            background-color: #24316F;
            color: #fff;
          }
          .sectionTitle {
            width: 90%;
            margin: auto;
            text-align: center;
          }
          .title {
            margin-bottom: 20px;
            padding-top: 45px;
          }
          .subtitle {
            max-width: 800px;
            font-style: italic;
          }
          .description {
            max-width: 1200px;
          }
          .subtitle, .description {
            margin: 0 auto 10px;
          }
          .sectionContent {
            width: 90%;
            width: 90vw;
            margin: auto;
            padding-bottom: 45px;
          }
          .raw * {
            width: 100%;
            max-width: none;
            margin: 0;
            padding: 0;
          }
          .viewHeight {
            height: 500px;
            height: calc(100vh - 145px);
            min-height: 300px;
          }
          .viewHeight .sectionContent {
            height: 100%;
          }
          @media only screen and (min-width: 1000px) {
            .title {
              margin-bottom: 30px;
            }
            .subtitle, .description {
              margin-bottom: 15px;
            }
            .raw * {
              margin: 0;
            }
            .viewHeight {
              height: 80%;
              height: calc(100vh - 70px);
            }
          }
        `}
      </style>
    </section>
  );
}
