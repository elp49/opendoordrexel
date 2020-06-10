import styles from './Carousel.module.css'

function removeScrollbar(id) {
  const classList = document.getElementById(id).classList;

  // Prevent removal on elements other than scrollable carousel.
  for (let i = 0; i < classList.length; i++) {
    let className = classList[i];
    if (className.includes('carousel')) {
      // If this is our scrollable carousel,
      // then create a style element to remove the scrollbar.
      // NOTE: -webkit styles only works for Chrome, Opera, and Safari.
      let style = document.createElement('style');
      style.innerHTML = `
        .${className}::-webkit-scrollbar {
          display: none;
        }
      `;

      // Append style element to html.
      document.head.appendChild(style);

      break;
    }
  }
}

function enterFullscreen(id, nextCard) {
  const container = document.getElementById(`${id}CarouselContainer`);

  // Prevent fullscreen being triggered if already in fullscreen.
  if (container.classList.contains('overlay')) return;

  const carousel = document.getElementById(`${id}Carousel`);
  const card = carousel.getElementsByClassName(styles.card)[0];
  const cardStyle = window.getComputedStyle(card) || card.currentStyle;
  const cardWidth = parseInt(cardStyle.width);
  const cardMarginLeft = parseInt(cardStyle.marginLeft);
  const cardMarginRight = parseInt(cardStyle.marginRight);
  const cardScrollDist = cardWidth + cardMarginLeft + cardMarginRight;
  const xScroll = cardScrollDist * nextCard;

  // If user clicked on a card other than the one in the center,
  // then scroll to it first.
  carousel.scrollTo(xScroll, 0);

  container.classList.add('overlay');

  // Enable keyboard arrow scrolling.
  document.onkeydown = () => { checkKey(id) };
}

function exitFullScreen(id) {
  const container = document.getElementById(`${id}CarouselContainer`);

  // Prevent exit being triggered if already exited.
  if (!container.classList.contains('overlay')) return;

  container.classList.remove('overlay');

  // Clean up key press callback.
  document.onkeydown = null;
}


// checkKey is meant to be called anytime that the carousel is being viewed in 
// fullscreen and the user presses a key.
function checkKey(id) {
  const container = document.getElementById(`${id}CarouselContainer`);
  const containerStyles = window.getComputedStyle(container) || container.currentStyle;

  // If, for some reason, we're not able to get the carousel container's styles,
  // or if the carousel is not in fullscreen,
  // then ignore the key press.
  if (!containerStyles || containerStyles.position !== 'fixed') return;

  let key = window.event.keyCode;
  let n;

  switch (key) {
    case '37':
      // If the left arrow key was pressed,
      // then scroll to the card to the left.
      n = -1;
      break;

    case '39':
      // If the right arrow key was pressed,
      // then scroll to the card to the right.
      n = 1;
      break;

    default:
      // Ignore all other keys.
      return;
  }

  // Scroll the carousel to the left or right by one card.
  scrollCarousel(id, n);
}

function scrollCarousel(id, n) {
  const carousel = document.getElementById(`${id}Carousel`);
  const cards = carousel.getElementsByClassName(styles.card);
  const cardsLength = cards.length;
  const card = cards[0];
  const cardStyle = window.getComputedStyle(card) || card.currentStyle;
  const cardWidth = parseInt(cardStyle.width);
  const cardMarginLeft = parseInt(cardStyle.marginLeft);
  const cardMarginRight = parseInt(cardStyle.marginRight);
  const cardScrollDist = cardWidth + cardMarginLeft + cardMarginRight;
  const maxScroll = cardScrollDist * (cardsLength - 1);
  let xScroll = carousel.scrollLeft + (cardScrollDist * n);

  if (xScroll > maxScroll) {
    // If the user scrolled to the right on the right-most card, 
    // then scroll to the left-most card.
    xScroll = 0;
  } else if (xScroll < 0) {
    // Vice versa.
    xScroll = maxScroll;
  }

  carousel.scrollTo(xScroll, 0);
}

export async function componentDidMount(id) {
  if (typeof window === 'undefined') return;

  if (/Mobi|Android/i.test(navigator.userAgent) && window.screen.width < 1000) {
    // If the user is on a mobile device with screen width less than 1000px,
    // then remove the scrollbar.
    // NOTE: exceptions to the mobile device rule are iPad pros and some tablets.
    removeScrollbar(`${id}Carousel`);
  }
}

export default function Carousel({ carousel }) {
  if (typeof carousel === 'undefined' || carousel.cardList.length === 0) return;

  const id = typeof carousel.name !== 'undefined' ? carousel.name : 'carousel';
  const cardList = carousel.cardList.sort((a, b) => b.reverseOrder - a.reverseOrder)
    .map(card => {
      return card.image.replace(/\\/g, '/');
    });

  componentDidMount(id);

  return (
    <div className={carousel.theme}>
      <div id={`${id}CarouselContainer`} className={styles.carouselContainer}>
        <ol id={`${id}Carousel`} className={styles.carousel}>
          <span className={styles.close} onClick={() => { exitFullScreen(id) }}>&times;</span>
          <span className={styles.arrow} style={{ left: 0 }} onClick={() => { scrollCarousel(id, -1) }}>&lang;</span>
          <span className={styles.arrow} style={{ right: 0 }} onClick={() => { scrollCarousel(id, 1) }}>&rang;</span>
          <li value={999999} className={'dummy'}></li>
          {
            cardList.map((image, i) => {
              const key = `${id}CarouselCard-${i}`;

              return (
                <li key={key} id={key} value={i} className={styles.card} onClick={() => { enterFullscreen(id, i) }}>
                  {/* <div style={{ backgroundImage: `url(${process.env.OPEN_DOOR_API}${image})` }}></div> */}
                  <div style={{ backgroundImage: `url(${image})` }}></div>
                </li>
              )
            })
          }
          <li value={0} className={'dummy'}></li>
        </ol>
      </div>
      <style jsx>
        {`
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
          .overlay>ol::-webkit-scrollbar {
            display: none;
          }
          .overlay>ol {
            margin: 0;
            padding: 0;
          }
          .overlay .dummy {
            width: 0;
          }
          .overlay li {
            display: inline-block;
            height: 100%;
            width: 100%;
            margin: 0;
            padding: 0;
            background-color: transparent;
            border-radius: 0;
            cursor: initial;
          }
          .overlay li>div {
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
        `}
      </style>
    </div>
  )
}
