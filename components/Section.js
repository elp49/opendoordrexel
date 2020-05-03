import styles from './Section.module.css'

export default function Section(props) {
  return (
    <section className={props.section.theme}>
      <div className={styles.sectionTitle}>
        <h1>{props.section.title}</h1>
        {props.section.subtitle.map((title, i) => {
          return (
            <h3 key={`sectionSubtitle-${i}`} className={'grey'}>
              {title.value}
              </h3>
          )
        })}
        {props.section.description.map((title, i) => {
          return (
            <p key={`sectionDescription-${i}`} className={'grey'}>
              {title.value}
            </p>
          )
        })}
      </div>
      <div className={styles.sectionContent}>
        {props.children}
      </div>
      <style jsx>{`
      .white {
        position: relative;
        background-color: #fff;
        color: #000;
      }
      .white .grey {
        color: #555;
      }
      .blue {
        position: relative;
        background-color: #24316F;
        color: #fff;
      }
      `}</style>
    </section>
  )
}
