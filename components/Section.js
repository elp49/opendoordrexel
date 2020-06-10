import styles from './Section.module.css'

export default function Section({ section, children }) {
  if (typeof section === 'undefined') return;

  const id = typeof section.name !== 'undefined' ? section.name : 'section';

  return (
    <section id={`${id}Section`} className={section.theme} style={{ position: 'relative' }}>
      <div className={styles.sectionTitle}>
        {
          section.titles.map((title, i) => {
            const key = `${id}SectionTitle-${i}`;

            return (
              <h1 key={key}>
                {title}
              </h1>
            )
          })
        }
        {
          section.subtitles.map((subtitle, i) => {
            const key = `${id}SectionSubtitle-${i}`;

            return (
              <h3 key={key} className={'grey'}>
                {subtitle}
              </h3>
            )
          })
        }
        {
          section.descriptions.map((description, i) => {
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
  )
}
