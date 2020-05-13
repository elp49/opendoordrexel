import styles from './Carousel.module.css'

function removeScrollbar(id) {
  console.log('removing scrollbar')
  const classList = document.getElementById(id).classList;
  console.log(`classList: ${classList}`)
  let className;
  let style;
  for (let i = 0; i < classList.length; i++) {
    className = classList[i];
    console.log(`className: ${className}`);
    if (className.includes('carousel')) {
      style = document.createElement('style');
      style.innerHTML = `
        .${className}::-webkit-scrollbar {
          display: none;
        }
      `;
      document.head.appendChild(style);
      console.log(`appended style: ${style}`);
      break;
    }
  }
}

function openOverlay(id, currentCard, length) {
  let overlay = document.getElementById(`${id}CarouselOverlay`);
  overlay.style.display = 'block';
  overlay.setAttribute('currentCard', currentCard);
  document.getElementById(`${id}CarouselOverlayCard-${currentCard}`).style.display = 'block';
  document.onkeydown = () => { checkKey(id, length) };
}

function closeOverlay(id) {
  let overlay = document.getElementById(`${id}CarouselOverlay`);
  const currentCard = overlay.getAttribute('currentCard');
  overlay.style.display = 'none';
  document.getElementById(`${id}CarouselOverlayCard-${currentCard}`).style.display = 'none';
  document.onkeydown = null;
}

function next(id, n, length) {
  let overlay = document.getElementById(`${id}CarouselOverlay`);
  const currentCard = parseInt(overlay.getAttribute('currentCard'));
  let nextCard = currentCard + n;
  if (nextCard == length) {
    nextCard = 0;
  } else if (nextCard < 0) {
    nextCard = length - 1;
  }
  document.getElementById(`${id}CarouselOverlayCard-${nextCard}`).style.display = 'block';
  document.getElementById(`${id}CarouselOverlayCard-${currentCard}`).style.display = 'none';
  overlay.setAttribute('currentCard', nextCard);
}

function checkKey(id, length) {
  let overlay = document.getElementById(`${id}CarouselOverlay`);
  let overlayStyles = window.getComputedStyle(overlay) || overlay.currentStyle;
  let key;
  let n;
  if (!overlayStyles || overlayStyles.display === 'none') {
    return;
  }
  key = window.event.keyCode;
  if (key == '37') {
    n = -1; // Left arrow, subtract 1 for the previous card.
  }
  else if (key == '39') {
    n = 1; // Right arrow, add 1 for the following card.
  }
  next(id, n, length);
}

export async function componentDidMount(id) {
  if (typeof window === 'undefined') {
    return;
  }
  if (/Mobi|Android/i.test(navigator.userAgent) && window.screen.width < 1000) {
    removeScrollbar(`${id}Carousel`);
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
            <li key={`${id}CarouselCard-${i}`} value={card._id} className={styles.card} onClick={() => { openOverlay(id, i, cards.length) }}>
              <div style={{ backgroundImage: `url(${card.url})` }}></div>
            </li>
          )
        })}
        <li value={0} className={styles.dummy}></li>
      </ol>
      <ol id={`${id}CarouselOverlay`} className={styles.overlay} currentCard={0}>
        <div className={styles.close} onClick={() => { closeOverlay(id) }}>
          <span>&times;</span>
        </div>
        <div className={styles.next} style={{ left: 0 }} onClick={() => { next(id, -1, cards.length) }}>
          <span>&lang;</span>
        </div>
        <div className={styles.next} style={{ right: 0 }} onClick={() => { next(id, 1, cards.length) }}>
          <span>&rang;</span>
        </div>
        {cards.map((card, i) => {
          return (
            <li key={`${id}CarouselOverlayCard-${i}`} id={`${id}CarouselOverlayCard-${i}`} value={card._id} className={styles.overlayCard} style={{ backgroundColor: 'transparent' }}>
              <div style={{ backgroundImage: `url(${card.url})` }}></div>
            </li>
          )
        })}
      </ol>
      <style jsx>{`
      .white, .blue li {
        background-color: #fff;
      }
      .blue, .white li {
        background-color: #24316F;
      }
      `}</style>
    </div>
  )
}
