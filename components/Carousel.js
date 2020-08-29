import { useEffect } from 'react';
import { isDefined, getTheme, sortListByReverseOrder } from './Layout';
import styles from './Carousel.module.css';

const LEFT = -1;
const RIGHT = 1;

function getCarouselElementById(carouselId) {
  return document.getElementById(`${carouselId}Carousel`);
}

function getCarouselContainerElementById(carouselId) {
  return document.getElementById(`${carouselId}CarouselContainer`);
}

function getAllCards(carouselId) {
  const carousel = getCarouselElementById(carouselId);
  return carousel.getElementsByClassName(styles.card);
}

function getCardStyle(carouselId) {
  if (!isDefined(window))
    return;

  const card = getAllCards(carouselId)[0];
  return window.getComputedStyle(card) || card.currentStyle;
}

function getCardScrollDistance(carouselId) {
  const cardStyle = getCardStyle(carouselId);
  const cardWidth = parseInt(cardStyle.width);
  const cardMarginLeft = parseInt(cardStyle.marginLeft);
  const cardMarginRight = parseInt(cardStyle.marginRight);
  return cardWidth + cardMarginLeft + cardMarginRight;
}

function scrollToSelectedCard(carouselId, selectedCard) {
  const carousel = getCarouselElementById(carouselId);
  const cardScrollDist = getCardScrollDistance(carouselId);
  const xScroll = cardScrollDist * selectedCard;
  carousel.scrollTo(xScroll, 0);
}

function isInFullscreen(carouselId) {
  const container = getCarouselContainerElementById(carouselId);
  if (container.classList.contains('overlay'))
    return true;

  return false;
}

function enterFullscreen(carouselId, selectedCard) {
  if (isInFullscreen(carouselId))
    return;

  if (isDefined(selectedCard))
    scrollToSelectedCard(carouselId, selectedCard);

  const container = getCarouselContainerElementById(carouselId);
  container.classList.add('overlay');

  // Enable keyboard arrow scrolling.
  document.onkeydown = () => checkKey(carouselId);
}

function exitFullScreen(carouselId) {
  if (!isInFullscreen(carouselId))
    return;

  const container = getCarouselContainerElementById(carouselId);
  container.classList.remove('overlay');

  // Clean up key press handle.
  document.onkeydown = null;
}

function isLeftArrowKey(key) {
  if (key == '37')
    return true;

  return false;
}

function isRightArrowKey(key) {
  if (key == '39')
    return true;

  return false;
}

function scrollCarousel(carouselId, direction) {
  const carousel = getCarouselElementById(carouselId);
  const cardScrollDist = getCardScrollDistance(carouselId);
  const cards = getAllCards(carouselId);
  const numCards = cards.length;

  const maxScrollDist = cardScrollDist * (numCards - 1);
  let xScroll = carousel.scrollLeft + (cardScrollDist * direction);

  if (xScroll > maxScrollDist) {
    // If the user scrolled to the right on the right-most card, 
    // then scroll to the left-most card.
    xScroll = 0;
  } else if (xScroll < 0) {
    // Vice versa.
    xScroll = maxScrollDist;
  }

  carousel.scrollTo(xScroll, 0);
}

// checkKey is meant to be called anytime that the carousel is being viewed in 
// fullscreen and the user presses a key. keys other than left and right arrows
// should be ignored.
function checkKey(carouselId) {
  if (!isInFullscreen(carouselId) || !isDefined(window))
    return;

  let key = window.event.keyCode;
  if (isLeftArrowKey(key))
    scrollCarousel(carouselId, LEFT);
  else if (isRightArrowKey(key))
    scrollCarousel(carouselId, RIGHT);
}

function fixCardImagePaths(list) {
  return list.map(card => card.image.replace(/\\/g, '/'));
}

function buildCardList(list) {
  if (!isDefined(list) || list.length === 0)
    return [];

  let cardList = sortListByReverseOrder(list);
  cardList = fixCardImagePaths(cardList);

  return cardList;
}

function getCarouselClassName(carouselId) {
  const carousel = getCarouselElementById(carouselId);
  for (let i = 0; i < carousel.classList.length; i++) {

    let className = carousel.classList[i];
    if (className.includes('carousel'))
      return className;

  }
}

function removeScrollbar(carouselId) {
  const carouselClassName = getCarouselClassName(carouselId);
  let style = document.createElement('style');
  style.innerHTML = `
    .${carouselClassName}::-webkit-scrollbar {
      display: none;
    }
  `;

  document.head.appendChild(style);
}

export async function componentDidMount(carouselId) {
  useEffect(() => {
    if (!isDefined(window))
      return;

    if (/Mobi|Android/i.test(navigator.userAgent) && window.screen.width < 1000) {
      // If the user is on a mobile device with screen width less than 1000px,
      // then remove the scrollbar.
      // NOTE: exceptions to the mobile device rule are iPad pros and some tablets.
      removeScrollbar(carouselId);
    }
  }, []);
}

export default function Carousel({ carousel }) {
  if (!isDefined(carousel))
    return;

  const id = isDefined(carousel.name) ? carousel.name : 'carousel';
  const theme = getTheme(carousel.theme);
  const cardList = buildCardList(carousel.cardList);

  componentDidMount(id);

  return (
    <div className={theme}>
      <div id={`${id}CarouselContainer`} className={styles.carouselContainer}>
        <ol id={`${id}Carousel`} className={styles.carousel}>
          <span className={styles.close} onClick={() => exitFullScreen(id)}>&times;</span>
          <span className={styles.arrow} style={{ left: 0 }} onClick={() => scrollCarousel(id, -1)}>&lang;</span>
          <span className={styles.arrow} style={{ right: 0 }} onClick={() => scrollCarousel(id, 1)}>&rang;</span>
          <li value={999999} className={'dummy'}></li>
          {
            cardList.map((image, i) => {
              const key = `${id}CarouselCard-${i}`;

              return (
                <li key={key} id={key} value={i} className={styles.card} onClick={() => enterFullscreen(id, i)}>
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
  );
}
