import { useEffect } from "react"
import { isDefined, atoi, getTheme, sortListByReverseOrder, fixFilePath } from "../utils/utils"

const NO_SLIDES = -1
const TIMER_FREQUENCY = 1000
const DEFAULT_TIMEOUT_DURATION = 7000
const SLIDE_OPACITY_ACTIVE = 1
const SLIDE_OPACITY_INACTIVE = 0
const BADGE_OPACITY_ACTIVE = 0.9
const BADGE_OPACITY_INACTIVE = 0.3
const SLIDE_ZINDEX_ACTIVE = 11
const SLIDE_ZINDEX_INACTIVE = 10
const MOBILE_DESKTOP_BARRIER = 500

function getSlideshowElementById(slideshowId) {
  return document.getElementById(`${slideshowId}Slideshow`)
}

function getSlideshowTimeoutDuration(slideshowId) {
  const slideshow = getSlideshowElementById(slideshowId)
  return atoi(slideshow.getAttribute("timeout-duration"))
}

function getSlideshowTimeoutTimeRemaining(slideshowId) {
  const slideshow = getSlideshowElementById(slideshowId)
  return atoi(slideshow.getAttribute("time-remaining"))
}

function setSlideshowTimeoutTimeRemaining(slideshowId, timeRemaining) {
  const slideshow = getSlideshowElementById(slideshowId)
  slideshow.setAttribute("time-remaining", timeRemaining)
}

function resetSlideshowTimeoutTimeRemaining(slideshowId) {
  const timeoutDuration = getSlideshowTimeoutDuration(slideshowId)
  setSlideshowTimeoutTimeRemaining(slideshowId, timeoutDuration)
}

function getSlideElementsOnMobileScreenWidth(slideshowId) {
  const slideshow = getSlideshowElementById(slideshowId)
  return slideshow.querySelectorAll(".slide.showOnMobileOnly, .slide:not(.showOnDesktopOnly)")
}

function getSlideElementsOnDesktopScreenWidth(slideshowId) {
  const slideshow = getSlideshowElementById(slideshowId)
  return slideshow.querySelectorAll(".slide.showOnDesktopOnly, .slide:not(.showOnMobileOnly)")
}

function isMobileScreen() {
  return isDefined(window) && window.innerWidth < MOBILE_DESKTOP_BARRIER
}

function getCurrentlyVisibleSlideElements(slideshowId) {
  let slideshowElements
  if (isMobileScreen())
    slideshowElements = getSlideElementsOnMobileScreenWidth(slideshowId)
  else
    slideshowElements = getSlideElementsOnDesktopScreenWidth(slideshowId)

  return slideshowElements
}

function getSlideIndex(slide) {
  return atoi(slide.getAttribute("value"))
}

function getCurrentSlideIndex(slideshowId) {
  const slideshow = getSlideshowElementById(slideshowId)
  return atoi(slideshow.getAttribute("current-slide-index"))
}

function setCurrentSlideIndex(slideshowId, currentSlideIndex) {
  const slideshow = getSlideshowElementById(slideshowId)
  slideshow.setAttribute("current-slide-index", currentSlideIndex)
}

function getNextSlideIndex(slideshowId) {
  const slides = getCurrentlyVisibleSlideElements(slideshowId)
  let nextSlideIndex = NO_SLIDES
  if (slides.length >= 0) {
    let isIndexGreaterThanCurrent = false
    const currentSlideIndex = getCurrentSlideIndex(slideshowId)
    for (let i = 0; i < slides.length; i++) {
      const slideIndex = getSlideIndex(slides[i])
      if (slideIndex > currentSlideIndex) {
        nextSlideIndex = slideIndex
        isIndexGreaterThanCurrent = true
        break
      }
    }

    if (!isIndexGreaterThanCurrent)
      nextSlideIndex = getSlideIndex(slides[0])
  }

  return nextSlideIndex
}

function setSlideZIndex(slideshowId, currentSlideIndex, nextSlideIndex) {
  document.getElementById(`${slideshowId}Slide-${currentSlideIndex}`).style.zIndex = SLIDE_ZINDEX_INACTIVE
  document.getElementById(`${slideshowId}Slide-${nextSlideIndex}`).style.zIndex = SLIDE_ZINDEX_ACTIVE
}

function setSlideOpacity(slideshowId, currentSlideIndex, nextSlideIndex) {
  document.getElementById(`${slideshowId}Slide-${currentSlideIndex}`).style.opacity = SLIDE_OPACITY_INACTIVE
  document.getElementById(`${slideshowId}Slide-${nextSlideIndex}`).style.opacity = SLIDE_OPACITY_ACTIVE
}

function setBadgeOpacity(slideshowId, currentSlideIndex, nextSlideIndex) {
  document.getElementById(`${slideshowId}Badge-${currentSlideIndex}`).getElementsByTagName("button")[0].style.opacity = BADGE_OPACITY_INACTIVE
  document.getElementById(`${slideshowId}Badge-${nextSlideIndex}`).getElementsByTagName("button")[0].style.opacity = BADGE_OPACITY_ACTIVE
}

function showSlide(slideshowId, slideIndex) {
  const currentSlideIndex = getCurrentSlideIndex(slideshowId)
  const nextSlideIndex = isDefined(slideIndex) ? slideIndex : getNextSlideIndex(slideshowId)

  if (nextSlideIndex !== NO_SLIDES) {
    setSlideZIndex(slideshowId, currentSlideIndex, nextSlideIndex)
    setSlideOpacity(slideshowId, currentSlideIndex, nextSlideIndex)
    setBadgeOpacity(slideshowId, currentSlideIndex, nextSlideIndex)

    setCurrentSlideIndex(slideshowId, nextSlideIndex)
    resetSlideshowTimeoutTimeRemaining(slideshowId)
  }
}

function timerHandler(slideshowId, timePassed) {
  const timeRemaining = getSlideshowTimeoutTimeRemaining(slideshowId) - timePassed
  if (timeRemaining >= 0)
    setSlideshowTimeoutTimeRemaining(slideshowId, timeRemaining)
  else
    showSlide(slideshowId)

  setTimeout(() => timerHandler(slideshowId, timePassed), timePassed)
}

function screenResizePassedMobileDesktopBarrier(screenWidth, newWidth) {
  return (screenWidth >= MOBILE_DESKTOP_BARRIER && newWidth < MOBILE_DESKTOP_BARRIER) || (screenWidth < MOBILE_DESKTOP_BARRIER && newWidth >= MOBILE_DESKTOP_BARRIER)
}

function handleResize(slideshowId, screenWidth) {
  let newWidth
  if (isDefined(window)) {
    newWidth = window.innerWidth
    if (screenResizePassedMobileDesktopBarrier(screenWidth, newWidth))
      showSlide(slideshowId)
  }

  return newWidth
}

function slideIsActive(slide) {
  return slide.showOnMobile || slide.showOnDesktop
}

function getSlideClassName(slide) {
  let className = ""
  if (!slide.showOnMobile)
    className = "showOnDesktopOnly"
  else if (!slide.showOnDesktop)
    className = "showOnMobileOnly"

  return className
}

function setupSlideItem(slide) {
  const className = getSlideClassName(slide)
  const { image, ...rest } = slide
  return {
    className: className,
    image: fixFilePath(image),
    ...rest,
  }
}

function buildSlideList(list) {
  let slideList = []
  if (isDefined(list) && list.length >= 0) {
    slideList = list.filter(slideIsActive).map(setupSlideItem)
    slideList = sortListByReverseOrder(slideList)
  }

  return slideList
}

export async function componentDidMount(slideshowId, numSlides) {
  if (isDefined(window)) {
    let screenWidth = window.innerWidth

    if (numSlides > 1)
      setTimeout(timerHandler(slideshowId, TIMER_FREQUENCY), TIMER_FREQUENCY)

    showSlide(slideshowId, 0)

    window.addEventListener("resize", () => {
      screenWidth = handleResize(slideshowId, screenWidth)
    })
  }
}

export default function Slideshow({ slideshow }) {
  const id = isDefined(slideshow.name) ? slideshow.name : "slideshow"
  const theme = getTheme(slideshow.theme)
  const timeoutDuration = isDefined(slideshow.timeoutDuration) ?
    atoi(slideshow.timeoutDuration) * 1000 : DEFAULT_TIMEOUT_DURATION
  const slideList = buildSlideList(slideshow.slideList)

  useEffect(() => {
    componentDidMount(id, slideList.length)
  }, [id, slideList.length])

  return (
    <div id={`${id}Slideshow`} className={`${theme} slideshow`} current-slide-index={0} timeout-duration={timeoutDuration} time-remaining={timeoutDuration}>
      <ol className="slideList">
        {
          slideList.map((slide, i) => {
            const key = `${id}Slide-${i}`
            const { className, image, titles, buttons } = slide
            const slideOpacity = i === 0 ? SLIDE_OPACITY_ACTIVE : SLIDE_OPACITY_INACTIVE
            const slideZIndex = i === 0 ? SLIDE_ZINDEX_ACTIVE : SLIDE_ZINDEX_INACTIVE

            return (
              <li key={key} id={key} value={i} className={`slide ${className}`} style={{ backgroundImage: `url(${image})`, opacity: slideOpacity, zIndex: slideZIndex }}>
                {
                  titles.map(title => {
                    const titleKey = `${id}SlideTitle-${i}`

                    return (
                      <div key={titleKey} className="slideHeader">
                        <h1 className="blurred">{title}</h1>
                        <h1 className="clear">{title}</h1>
                      </div>
                    )
                  })
                }
                <ol className="buttonList">
                  {
                    buttons.map(button => {
                      const buttonKey = `${id}SlideButton-${i}`
                      const { href, text } = button

                      return (
                        <li key={buttonKey} className="slideButton">
                          <a href={href} className="button">
                            <h3>{text}</h3>
                          </a>
                        </li>
                      )
                    })
                  }
                </ol>
              </li>
            )
          })
        }
      </ol>
      <ol className="badgeList" style={{ zIndex: SLIDE_ZINDEX_ACTIVE }}>
        {
          slideList.map((slide, i) => {
            const key = `${id}Badge-${i}`
            const { className } = slide
            const badgeOpacity = i === 0 ? BADGE_OPACITY_ACTIVE : BADGE_OPACITY_INACTIVE

            return (
              <li key={key} id={key} className={`badge ${className}`}>
                <button type="button" onClick={() => showSlide(id, i)} style={{ opacity: badgeOpacity }} />
              </li>
            )
          })
        }
      </ol>
      <style jsx>
        {`
          .white {
            background-color: #fff;
          }
          .blue {
            background-color: #24316F;
          }
          .slideshow {
            position: relative;
            height: 100%;
          }
          .slideList {
            position: relative;
            height: 100%;
            list-style-type: none;
          }
          .slide {
            position: absolute;
            height: 100%;
            width: 100%;
            display: block;
            padding: 15px 0;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            text-align: center;
            font-weight: bold;
            -webkit-transition: opacity 1.0s ease-in-out;
            -moz-transition: opacity 1.0s ease-in-out;
            -o-transition: opacity 1.0s ease-in-out;
            transition: opacity 1.0s ease-in-out;
            opacity: 0;
          }
          .slideHeader {
            position: absolute;
            top: 15px;
            left: 50%;
            width: 110%;
            margin-bottom: 10px;
            padding: 10px 0;
            -webkit-transform: translate(-50%, 0);
            -moz-transform: translate(-50%, 0);
            -ms-transform: translate(-50%, 0);
            -o-transform: translate(-50%, 0);
            transform: translate(-50%, 0);
          }
          .slideHeader>h1 {
            width: 100%;
            padding: 5px;
          }
          .slideHeader>.blurred {
            background-color: rgb(36, 49, 111, .8);
            color: rgb(36, 49, 111, .8);
            -webkit-filter: blur(8px);
            filter: blur(8px);
          }
          .slideHeader>.clear {
            position: absolute;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
            -moz-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            -o-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            color: #fff;
            text-shadow: 0 0 2px #000;
          }
          .buttonList {
            position: absolute;
            bottom: 50px;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
            -moz-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            -o-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
          }
          .slideButton {
            display: inline-block;
            margin: 4px 10px 0;
            background-color: #fff;
            cursor: pointer;
          }
          .button {
            display: block;
            padding: 10px;
            color: #000;
            text-transform: uppercase;
            text-decoration: none;
            letter-spacing: 0.3px;
          }
          .badgeList {
            position: absolute;
            left: 50%;
            bottom: 30px;
            -webkit-transform: translate(-50%, -50%);
            -moz-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            -o-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
          }
          .badge {
            display: inline-block;
            height: 20px;
            width: 20px;
            background-color: transparent;
            cursor: pointer;
          }
          .badge>button {
            display: inline-block;
            height: 50%;
            width: 50%;
            margin: 25%;
            background-color: #fff;
            box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
            border: none;
            border-radius: 50%;
            cursor: pointer;
            overflow: hidden;
            -webkit-transition: opacity 0.3s ease-in-out;
            -moz-transition: opacity 0.3s ease-in-out;
            -o-transition: opacity 0.3s ease-in-out;
            transition: opacity 0.3s ease-in-out;
            opacity: 0.3;
          }
          @media only screen and (min-height: 500px) {
            .button {
              padding: 10px;
            }
          }
          @media only screen and (max-width: 499px) {
            .showOnDesktopOnly {
              display: none;
            }
          }
          @media only screen and (min-width: 500px) {
            .showOnMobileOnly {
              display: none;
            }
            .button {
              padding: 20px;
            }
          }
          @media only screen and (min-width: 650px) {
            .slide {
              padding: 30px 0;
            }
            .slideHeader>h1 {
              padding: 20px;
            }
          }
        `}
      </style>
    </div>
  )
}
