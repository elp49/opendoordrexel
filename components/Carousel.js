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

export async function componentDidMount(id) {
  if (typeof window === 'undefined') {
    return;
  }
  if (/Mobi|Android/i.test(navigator.userAgent) && window.screen.width < 1000) {
    removeScrollbar(`${id}Carousel`);
  }
}

function openOverlay(id, i) {
  console.log(`opening overlay for card: ${id}CarouselCard-${i}`);
  document.getElementById(`${id}CarouselOverlay`).style.display = 'block';
  document.getElementById(`${id}CarouselOverlayCard-${i}`).style.display = 'block';
  return i;
}

function closeOverlay(id, i) {
  console.log('closing overlay.');
  document.getElementById(`${id}CarouselOverlay`).style.display = 'none';
  document.getElementById(`${id}CarouselOverlayCard-${i}`).style.display = 'none';
  return i;
}

function next(id, thisCard, n, length) {
  let nextCard = thisCard + n;
  if (nextCard == length) {
    nextCard = 0;
  } else if (nextCard < 0) {
    nextCard = length - 1;
  }
  
  document.getElementById(`${id}CarouselOverlayCard-${nextCard}`).style.display = 'block';
  document.getElementById(`${id}CarouselOverlayCard-${thisCard}`).style.display = 'none';
  return nextCard;
}

// function prev(id, i) {
//   console.log('clicked left bracket.');
//   const prevCard = i - 1;
//   document.getElementById(`${id}CarouselOverlayCard-${prevCard}`).style.display = 'block';
//   document.getElementById(`${id}CarouselOverlayCard-${i}`).style.display = 'none';
//   return prevCard;
// }

// function next(id) {
//   console.log('clicked right bracket.');
//   const nextCard = i + 1;
//   document.getElementById(`${id}CarouselOverlayCard-${nextCard}`).style.display = 'block';
//   document.getElementById(`${id}CarouselOverlayCard-${i}`).style.display = 'none';
//   return nextCard;
// }

export default function Carousel(props) {
  const id = props.carousel._id;
  const cards = props.carousel.cards.sort((a, b) => b._id - a._id);
  var currentCard = 0;
  componentDidMount(id);
  return (
    <div className={props.carousel.theme} style={{ borderRadius: 10 + 'px' }}>
      <ol id={`${id}Carousel`} className={styles.carousel}>
        <li value={999999} className={styles.dummy}></li>
        {cards.map((card, i) => {
          return (
            <li key={`${id}CarouselCard-${i}`} value={card._id} className={styles.card} onClick={() => { currentCard = openOverlay(id, i) }}>
              <div style={{ backgroundImage: `url(${card.url})` }}></div>
            </li>
          )
        })}
        <li value={0} className={styles.dummy}></li>
      </ol>
      <ol id={`${id}CarouselOverlay`} className={styles.overlay}>
        <span className={styles.close} onClick={() => { currentCard = closeOverlay(id, currentCard) }}>&times;</span>
        <span className={styles.next} style={{ left: 0 }} onClick={() => { currentCard = next(id, currentCard, -1, cards.length) }}>&lang;</span>
        <span className={styles.next} style={{ right: 0 }} onClick={() => { currentCard = next(id, currentCard, 1, cards.length) }}>&rang;</span>
        {cards.map((card, i) => {
          return (
            <li key={`${id}CarouselOverlayCard-${i}`} id={`${id}CarouselOverlayCard-${i}`} 
            value={card._id} className={styles.overlayCard} style={{backgroundColor: 'transparent'}}>
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
