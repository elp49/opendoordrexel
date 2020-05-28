import styles from './Section.module.css'

export default function Section(props) {
  const id = props.section.name;
  return (
    <section id={`${id}Section`} className={props.section.theme} style={{ position: 'relative' }}>
      <div className={styles.sectionTitle}>
        {props.section.title.map((title, i) => {
          return (
            <h1 key={`${id}SectionTitle-${i}`}>
              {title}
            </h1>
          )
        })}
        {props.section.subtitle.map((subtitle, i) => {
          return (
            <h3 key={`${id}SectionSubtitle-${i}`} className={'grey'}>
              {subtitle}
            </h3>
          )
        })}
        {props.section.description.map((description, i) => {
          return (
            <p key={`${id}SectionDescription-${i}`} className={'grey'}>
              {description}
            </p>
          )
        })}
      </div>
      <div className={styles.sectionContent}>
        {props.children}
      </div>
      <style jsx>{`
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
      `}</style>
    </section>
  )
}
