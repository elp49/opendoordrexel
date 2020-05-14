import styles from './Carousel.module.css'

function removeScrollbar(id) {
  const classList = document.getElementById(id).classList;
  let className, style;
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

function enterFullScreen(id, nextCard) {
  const container = document.getElementById(`${id}CarouselContainer`);
  if (container.classList.contains('overlay')) {
    return;
  }
  setCurrentCard(id, nextCard);
  scrollCarousel(id, 0);
  container.classList.add('overlay');
  document.onkeydown = () => { checkKey(id) };
}

function exitFullScreen(id) {
  const container = document.getElementById(`${id}CarouselContainer`);
  if (!container.classList.contains('overlay')) {
    return;
  }
  container.classList.remove('overlay');
  document.onkeydown = null;
}

function checkKey(id) {
  const container = document.getElementById(`${id}CarouselContainer`);
  let containerStyles = window.getComputedStyle(container) || container.currentStyle;
  let key, n;
  if (!containerStyles || containerStyles.position !== 'fixed') {
    return;
  }
  key = window.event.keyCode;
  if (key == '37') {
    n = -1; // Left arrow, subtract 1 for the previous card.
  }
  else if (key == '39') {
    n = 1; // Right arrow, add 1 for the following card.
  } else {
    return;
  }
  scrollCarousel(id, n);
}

function scrollCarousel(id, n) {
  const cards = document.getElementById(`${id}Carousel`).getElementsByClassName(styles.card);
  const dummies = document.getElementById(`${id}Carousel`).getElementsByClassName('dummy');
  const cardStyle = window.getComputedStyle(cards[0]) || cards[0].currentStyle;
  const dummyStyle = window.getComputedStyle(dummies[0]) || dummies[0].currentStyle;
  const cardWidth = parseInt(cardStyle.width);
  const cardMarginLeft = parseInt(cardStyle.marginLeft);
  const cardMarginRight = parseInt(cardStyle.marginRight);
  const dummyWidth = parseInt(dummyStyle.width) + cardMarginLeft;
  const scrollPerCard = cardWidth + cardMarginLeft + cardMarginRight;
  const currentCard = getCurrentCard(id)
  const nextCard = setCurrentCard(id, currentCard + n);
  const xScroll = parseInt((scrollPerCard * nextCard) + dummyWidth + cardMarginLeft);
  document.getElementById(`${id}Carousel`).scrollTo(xScroll, 0);
}

function getCurrentCard(id) {
  return parseInt(document.getElementById(`${id}Carousel`).getAttribute('currentcard'));
}

function setCurrentCard(id, card) {
  const length = document.getElementById(`${id}Carousel`).getElementsByClassName(styles.card).length;
  let currentCard;
  if (card >= length) {
    currentCard = 0;
  } else if (card < 0) {
    currentCard = length - 1;
  } else {
    currentCard = card;
  }
  document.getElementById(`${id}Carousel`).setAttribute('currentcard', currentCard);
  return currentCard;
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
    <div className={props.carousel.theme}>
      <div id={`${id}CarouselContainer`} className={styles.carouselContainer}>
        <ol id={`${id}Carousel`} className={styles.carousel} currentcard={0}>
          <span className={styles.close} onClick={() => { exitFullScreen(id) }}>&times;</span>
          <span className={styles.arrow} style={{ left: 0 }} onClick={() => { scrollCarousel(id, -1) }}>&lang;</span>
          <span className={styles.arrow} style={{ right: 0 }} onClick={() => { scrollCarousel(id, 1) }}>&rang;</span>
          <li value={999999} className={'dummy'}></li>
          {cards.map((card, i) => {
            return (
              <li key={`${id}CarouselCard-${i}`} id={`${id}CarouselCard-${i}`} value={card._id} className={styles.card} onClick={() => { enterFullScreen(id, i) }}>
                <div style={{ backgroundImage: `url(${card.url})` }}></div>
              </li>
            )
          })}
          <li value={0} className={'dummy'}></li>
        </ol>
      </div>
      <style jsx>{`
      .white, .blue {
        height: 210px;
        margin-top: 20px;
        border-radius: 10px;
      }

      .white, .blue li {
        background-color: #fff;
      }

      .blue, .white li {
        background-color: #24316F;
      }

      .dummy {
        display: inline-block;
        width: 20px;
        width: calc(45vw - ((170px / 2) + 20px + 10px));
        background-color: transparent;
      }

      .overlay {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(0, 0, 0, 0.5);;
        z-index: 150;
      }

      .overlay::-webkit-scrollbar {
        display: none;
      }

      .overlay .dummy {
        width: 0;
      }

      .overlay>ol {
        margin: 0;
        padding: 0;
      }

      .overlay li, .overlay li {
        display: inline-block;
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
        background-color: transparent;
        border-radius: 0;
        cursor: initial;
      }

      .overlay li>div, .overlay li>div {
        height: 100%;
        width: 100%;
        background-size: contain;
        border-radius: 0;
      }
      
      span {
        display: none;
      }

      .overlay>ol>span {
        display: block;
      }

      @media only screen and (min-width: 1000px) {
        .white, .blue {
          height: 570px;
          margin-top: 45px;
        }
        .dummy {
          width: 40px;
          width: calc(45vw - ((490px / 2) + 40px + 20px));
        }
      }
      `}</style>
    </div>
  )
}
