import styles from './Section.module.css'

function isDefined(a) {
  if (typeof a !== 'undefined')
    return true;

  return false;
}

export default function Section({ sectionDetails, children }) {
  if (!isDefined(sectionDetails))
    return;

  const id = isDefined(sectionDetails.name) ? sectionDetails.name : 'section';

  return (
    <section id={`${id}Section`} className={sectionDetails.theme} style={{ position: 'relative' }}>
      <div className={styles.sectionTitle}>
        {
          sectionDetails.titles.map((title, i) => {
            const key = `${id}SectionTitle-${i}`;

            return (
              <h1 key={key}>
                {title}
              </h1>
            )
          })
        }
        {
          sectionDetails.subtitles.map((subtitle, i) => {
            const key = `${id}SectionSubtitle-${i}`;

            return (
              <h3 key={key} className={'grey'}>
                {subtitle}
              </h3>
            )
          })
        }
        {
          sectionDetails.descriptions.map((description, i) => {
            const key = `${id}SectionDescription-${i}`;

            return (
              <p key={key} className={'grey'}>
                {description}
              </p>
            )
          })
        }
      </div>
      <div className={styles.sectionContent}>
        {children}
      </div>
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
        `}
      </style>
    </section>
  );
}
