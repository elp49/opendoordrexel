import { useEffect } from "react"
import { isDefined, atoi, getTheme, sortListByReverseOrder, fixFilePath } from "../utils/utils"
import styles from "./Carousel.module.css"

const LEFT = -1
const RIGHT = 1

function getCarouselElementById(carouselId) {
  return document.getElementById(`${carouselId}Carousel`)
}

function getCarouselContainerElementById(carouselId) {
  return document.getElementById(`${carouselId}CarouselContainer`)
}

function getAllCards(carouselId) {
  const carousel = getCarouselElementById(carouselId)
  return carousel.getElementsByClassName(styles.card)
}

function getCardStyle(carouselId) {
  let style
  if (isDefined(window)) {
    const card = getAllCards(carouselId)[0]
    style = window.getComputedStyle(card) || card.currentStyle
  }

  return style
}

function getCardScrollDistance(carouselId) {
  const cardStyle = getCardStyle(carouselId)
  const cardWidth = atoi(cardStyle.width)
  const cardMarginLeft = atoi(cardStyle.marginLeft)
  const cardMarginRight = atoi(cardStyle.marginRight)
  return cardWidth + cardMarginLeft + cardMarginRight
}

function scrollToSelectedCard(carouselId, selectedCard) {
  const carousel = getCarouselElementById(carouselId)
  const cardScrollDist = getCardScrollDistance(carouselId)
  const xScroll = cardScrollDist * selectedCard
  carousel.scrollTo(xScroll, 0)
}

function isInFullscreen(carouselId) {
  const container = getCarouselContainerElementById(carouselId)
  return container.classList.contains("overlay")
}

function scrollCarousel(carouselId, direction) {
  const carousel = getCarouselElementById(carouselId)
  const cardScrollDist = getCardScrollDistance(carouselId)
  const cards = getAllCards(carouselId)
  const numCards = cards.length

  const maxScrollDist = cardScrollDist * (numCards - 1)
  let xScroll = carousel.scrollLeft + (cardScrollDist * direction)

  if (xScroll > maxScrollDist) {
    // If the user scrolled to the right on the right-most card,
    // then scroll to the left-most card.
    xScroll = 0
  } else if (xScroll < 0) {
    // Vice versa.
    xScroll = maxScrollDist
  }

  carousel.scrollTo(xScroll, 0)
}

function scrollCarouselLeft(carouselId) {
  scrollCarousel(carouselId, LEFT)
}

function scrollCarouselRight(carouselId) {
  scrollCarousel(carouselId, RIGHT)
}

function enterFullscreen(carouselId, selectedCard) {
  if (!isInFullscreen(carouselId)) {
    if (isDefined(selectedCard))
      scrollToSelectedCard(carouselId, selectedCard)

    const container = getCarouselContainerElementById(carouselId)
    container.classList.add("overlay")
  }
}

function exitFullScreen(carouselId) {
  if (isInFullscreen(carouselId)) {
    const container = getCarouselContainerElementById(carouselId)
    container.classList.remove("overlay")
  }
}

function getCarouselClassName(carouselId) {
  const carousel = getCarouselElementById(carouselId)
  let className
  for (let i = 0; i < carousel.classList.length; i++) {
    className = carousel.classList[i]
    if (className.includes("carousel"))
      break
  }

  return className
}

function removeScrollbar(carouselId) {
  const carouselClassName = getCarouselClassName(carouselId)
  const style = document.createElement("style")
  style.innerHTML = `
    .${carouselClassName}::-webkit-scrollbar {
      display: none;
    }
  `

  document.head.appendChild(style)
}

function buildCardList(list) {
  let cardList = []
  if (isDefined(list) && list.length > 0) {
    cardList = sortListByReverseOrder(list)
    cardList = cardList
      .filter(card => isDefined(card.image))
      .map((card) => fixFilePath(card.image))
  }

  return cardList
}

export async function componentDidMount(carouselId) {
  if (isDefined(window)) {
    if (/Mobi|Android/i.test(navigator.userAgent) && window.screen.width < 1000) {
      // If the user is on a mobile device with screen width less than 1000px,
      // then remove the scrollbar.
      // NOTE: exceptions to the mobile device rule are iPad pros and some tablets.
      removeScrollbar(carouselId)
    }
  }
}

export default function Carousel({ carousel }) {
  const id = isDefined(carousel.name) ? carousel.name : "carousel"
  const theme = getTheme(carousel.theme)
  const cardList = buildCardList(carousel.cardList)

  useEffect(() => {
    componentDidMount(id)
  }, [id])

  return (
    <div className={theme}>
      <div id={`${id}CarouselContainer`} className={styles.carouselContainer}>
        <ol id={`${id}Carousel`} className={styles.carousel}>
          <button className={`${styles.customButton} ${styles.close}`} type="button" onClick={() => exitFullScreen(id)}>
            <span>&times;</span>
          </button>
          <button className={`${styles.customButton} ${styles.arrow}`} style={{ left: 0 }} type="button" onClick={() => scrollCarouselLeft(id)}>
            <span>&lang;</span>
          </button>
          <button className={`${styles.customButton} ${styles.arrow}`} style={{ right: 0 }} type="button" onClick={() => scrollCarouselRight(id)}>
            <span>&rang;</span>
          </button>
          <li value={999999} className="dummy" />
          {
            cardList.map((image, i) => {
              const key = `${id}CarouselCard-${i}`
              return (
                <li key={key} id={key} value={i} className={styles.card}>
                  <button className={`${styles.customButton} ${styles.cardButton}`} type="button" onClick={() => enterFullscreen(id, i)}>
                    {/* <div style={{ backgroundImage: `url(${process.env.OPEN_DOOR_API}${image})` }}></div> */}
                    <div className={styles.cardImage} style={{ backgroundImage: `url(${image})` }} />
                  </button>
                </li>
              )
            })
          }
          <li value={0} className="dummy" />
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
          .overlay li>button>div {
            height: 100%;
            width: 100%;
            background-size: contain;
            border-radius: 0;
          }
          .overlay li>button {
            cursor: auto;
          }
          span {
            display: none;
          }
          .overlay>ol>button>span {
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
