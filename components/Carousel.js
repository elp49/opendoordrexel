import styles from './Carousel.module.css'

function removeScrollbar(id) {
  const classList = document.getElementById(id).classList;
  let className;
  let style;
  for (let i = 0; i < classList.length; i++) {
    className = classList[i];
    if (className.includes('carousel')) {
      style = document.createElement('style');
      style.innerHTML = `
        .${className}::-webkit-scrollbar {
          display: none;
        }
      `;
      document.head.appendChild(style);
      break;
    }
  }
}

function setDummyWidth(width) {
  let dummies = document.getElementsByClassName(styles.dummy);
  for (let i = 0; i < dummies.length; i++) {
    dummies[i].style.width = width;
  }
}

export async function componentDidMount(id) {
  if (typeof window === 'undefined') {
    return;
  }
  if (/Mobi|Android/i.test(navigator.userAgent) && window.screen.width < 1000) {
    removeScrollbar(`${id}Carousel`);
    setDummyWidth('999px');
  }
}

export default function Carousel(props) {
  const id = props.carousel._id;
  const cards = props.carousel.cards.sort((a, b) => b._id - a._id);
  componentDidMount(id);
  return (
    <div className={props.carousel.theme} style={{ borderRadius: 10 + 'px' }}>
      <ol id={`${id}Carousel`} className={styles.carousel}>
        <li value={999999} className={styles.dummy}></li>
        {cards.map((card, i) => {
          return (
            <li key={`${id}CarouselCard-${i}`} value={card._id} className={styles.card}>
              <div style={{ backgroundImage: `url(${card.url})` }}></div>
            </li>
          )
        })}
        <li value={0} className={styles.dummy}></li>
      </ol>
      <style jsx>{`
      .white {
        background-color: #fff;
      }
      .white li {
        background-color: #24316F;
      }
      .blue {
        background-color: #24316F;
      }
      .blue li {
        background-color: #fff;
      }
      `}</style>
    </div>
  )
}
