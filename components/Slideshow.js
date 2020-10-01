import { useEffect } from 'react';
import { isDefined, getTheme, sortListByReverseOrder } from './Layout';

const NO_SLIDES = -1;
const TIMER_FREQUENCY = 1000;
const DEFAULT_TIMEOUT_DURATION = 7000;
const SLIDE_OPACITY_ACTIVE = 1;
const SLIDE_OPACITY_INACTIVE = 0;
const BADGE_OPACITY_ACTIVE = 0.9;
const BADGE_OPACITY_INACTIVE = 0.3;
const SLIDE_ZINDEX_ACTIVE = 11;
const SLIDE_ZINDEX_INACTIVE = 10;

function getSlideshowElementById(slideshowId) {
  return document.getElementById(`${slideshowId}Slideshow`);
}

function getSlideshowTimeoutDuration(slideshowId) {
  const slideshow = getSlideshowElementById(slideshowId);
  return parseInt(slideshow.getAttribute('timeout-duration'));
}

function getSlideshowTimeoutTimeRemaining(slideshowId) {
  const slideshow = getSlideshowElementById(slideshowId);
  return parseInt(slideshow.getAttribute('time-remaining'));
}

function setSlideshowTimeoutTimeRemaining(slideshowId, timeRemaining) {
  const slideshow = getSlideshowElementById(slideshowId);
  slideshow.setAttribute('time-remaining', timeRemaining);
}

function resetSlideshowTimeoutTimeRemaining(slideshowId) {
  const timeoutDuration = getSlideshowTimeoutDuration(slideshowId);
  setSlideshowTimeoutTimeRemaining(slideshowId, timeoutDuration);
}

function getSlideElementsOnMobileScreenWidth(slideshowId) {
  const slideshow = getSlideshowElementById(slideshowId);
  return slideshow.querySelectorAll('.slide.showOnMobileOnly, .slide:not(.showOnDesktopOnly)');
}

function getSlideElementsOnDesktopScreenWidth(slideshowId) {
  const slideshow = getSlideshowElementById(slideshowId);
  return slideshow.querySelectorAll('.slide.showOnDesktopOnly, .slide:not(.showOnMobileOnly)');
}

function isMobileScreen() {
  if (!isDefined(window))
    return;

  if (window.innerWidth < 500)
    return true;

  return false;
}

function getCurrentlyVisibleSlideElements(slideshowId) {
  if (isMobileScreen())
    return getSlideElementsOnMobileScreenWidth(slideshowId);

  return getSlideElementsOnDesktopScreenWidth(slideshowId);
}

function getSlideIndex(slide) {
  return parseInt(slide.getAttribute('value'));
}

function getCurrentSlideIndex(slideshowId) {
  const slideshow = getSlideshowElementById(slideshowId);
  return parseInt(slideshow.getAttribute('current-slide-index'));
}

function setCurrentSlideIndex(slideshowId, currentSlideIndex) {
  const slideshow = getSlideshowElementById(slideshowId);
  slideshow.setAttribute('current-slide-index', currentSlideIndex);
}

function getNextSlideIndex(slideshowId) {
  let slides = getCurrentlyVisibleSlideElements(slideshowId);
  if (slides.length === 0)
    return NO_SLIDES;

  const currentSlideIndex = getCurrentSlideIndex(slideshowId);
  for (let i = 0; i < slides.length; i++) {

    const slideIndex = getSlideIndex(slides[i]);
    if (slideIndex > currentSlideIndex)
      return slideIndex;

  }

  return getSlideIndex(slides[0]);
}

function setSlideZIndex(slideshowId, currentSlideIndex, nextSlideIndex) {
  document.getElementById(`${slideshowId}Slide-${currentSlideIndex}`).style.zIndex = SLIDE_ZINDEX_INACTIVE;
  document.getElementById(`${slideshowId}Slide-${nextSlideIndex}`).style.zIndex = SLIDE_ZINDEX_ACTIVE;
}

function setSlideOpacity(slideshowId, currentSlideIndex, nextSlideIndex) {
  document.getElementById(`${slideshowId}Slide-${currentSlideIndex}`).style.opacity = SLIDE_OPACITY_INACTIVE;
  document.getElementById(`${slideshowId}Slide-${nextSlideIndex}`).style.opacity = SLIDE_OPACITY_ACTIVE;
}

function setBadgeOpacity(slideshowId, currentSlideIndex, nextSlideIndex) {
  document.getElementById(`${slideshowId}Badge-${currentSlideIndex}`).getElementsByTagName('span')[0].style.opacity = BADGE_OPACITY_INACTIVE;
  document.getElementById(`${slideshowId}Badge-${nextSlideIndex}`).getElementsByTagName('span')[0].style.opacity = BADGE_OPACITY_ACTIVE;
}

function showSlide(slideshowId, slideIndex) {
  const currentSlideIndex = getCurrentSlideIndex(slideshowId);
  const nextSlideIndex = isDefined(slideIndex) ? slideIndex
    : getNextSlideIndex(slideshowId);

  if (nextSlideIndex === NO_SLIDES)
    return;

  setSlideZIndex(slideshowId, currentSlideIndex, nextSlideIndex);
  setSlideOpacity(slideshowId, currentSlideIndex, nextSlideIndex);
  setBadgeOpacity(slideshowId, currentSlideIndex, nextSlideIndex);

  setCurrentSlideIndex(slideshowId, nextSlideIndex);
  resetSlideshowTimeoutTimeRemaining(slideshowId);
};

function timerHandler(slideshowId, timePassed) {
  let timeRemaining = getSlideshowTimeoutTimeRemaining(slideshowId);

  timeRemaining -= timePassed;
  if (timeRemaining >= 0)
    setSlideshowTimeoutTimeRemaining(slideshowId, timeRemaining);
  else
    showSlide(slideshowId);

  setTimeout(() => timerHandler(slideshowId, timePassed), timePassed);
}

function screenResizePassedMobileDesktopBarrier(screenWidth, newWidth) {
  if ((screenWidth >= 500 && newWidth < 500)
    || (screenWidth < 500 && newWidth >= 500))
    return true;

  return false;
}

function handleResize(slideshowId, screenWidth) {
  if (!isDefined(window))
    return;

  const newWidth = window.innerWidth;
  if (screenResizePassedMobileDesktopBarrier(screenWidth, newWidth))
    showSlide(slideshowId);

  return newWidth;
}

function slideIsActive(showOnMobile, showOnDesktop) {
  if (showOnMobile || showOnDesktop)
    return true;

  return false;
}

function getSlideClassName(showOnMobile, showOnDesktop) {
  if (!showOnMobile)
    return 'showOnDesktopOnly';
  else if (!showOnDesktop)
    return 'showOnMobileOnly';
  else
    return '';
}

function slideListReducerCallback(list, slide) {
  const { showOnMobile, showOnDesktop } = slide;
  if (slideIsActive(showOnMobile, showOnDesktop)) {

    const className = getSlideClassName(showOnMobile, showOnDesktop);
    const { reverseOrder, image, titles, buttons } = slide;
    list.push({
      reverseOrder: reverseOrder,
      className: className,
      image: image.replace(/\\/g, '/'),
      titles: titles,
      buttons: buttons
    });

  }

  return list;
}

function reduceSlideList(slideList) {
  return slideList.reduce((list, slide) => slideListReducerCallback(list, slide), []);
}

function buildSlideList(list) {
  if (!isDefined(list) || list.length === 0)
    return [];

  let slideList = reduceSlideList(list);
  slideList = sortListByReverseOrder(slideList);

  return slideList;
}

export async function componentDidMount(slideshowId, numSlides) {
  useEffect(() => {
    if (!isDefined(window))
      return;
  
    let screenWidth = window.innerWidth;
    
    if (numSlides > 1)
      setTimeout(timerHandler(slideshowId, TIMER_FREQUENCY), TIMER_FREQUENCY);
  
    showSlide(slideshowId, 0);
  
    window.addEventListener('resize', () => {
      screenWidth = handleResize(slideshowId, screenWidth);
    });
  }, []);
}

export default function Slideshow({ slideshow }) {
  if (!isDefined(slideshow))
    return;

  const id = isDefined(slideshow.name) ? slideshow.name : 'slideshow';
  const theme = getTheme(slideshow.theme);
  const timeoutDuration = isDefined(slideshow.timeoutDuration) ?
    parseInt(slideshow.timeoutDuration) * 1000 : DEFAULT_TIMEOUT_DURATION;
  const slideList = buildSlideList(slideshow.slideList);

  componentDidMount(id, slideList.length);

  return (
    <div id={`${id}Slideshow`} className={`${theme} slideshow`} current-slide-index={0} timeout-duration={timeoutDuration} time-remaining={timeoutDuration}>
      <ol className={'slideList'}>
        {
          slideList.map((slide, i) => {
            const key = `${id}Slide-${i}`;
            const { className, image, titles, buttons } = slide;
            const slideOpacity = i === 0 ? SLIDE_OPACITY_ACTIVE : SLIDE_OPACITY_INACTIVE;
            const slideZIndex = i === 0 ? SLIDE_ZINDEX_ACTIVE : SLIDE_ZINDEX_INACTIVE;

            return (
              <li key={key} id={key} value={i} className={`slide ${className}`} style={{ backgroundImage: `url(${image})`, opacity: slideOpacity, zIndex: slideZIndex }}>
                {
                  titles.map(title => {
                    const titleKey = `${id}SlideTitle-${i}`;

                    return (
                      <div key={titleKey} className={'slideHeader'}>
                        <h1 className={'blurred'}>{title}</h1>
                        <h1 className={'clear'}>{title}</h1>
                      </div>
                    );
                  })
                }
                <ol className={'buttonList'}>
                  {
                    buttons.map(button => {
                      const buttonKey = `${id}SlideButton-${i}`;
                      const { href, text } = button;

                      return (
                        <li key={buttonKey} className={'slideButton'}>
                          <a href={href} className={'button'}>
                            <h3>{text}</h3>
                          </a>
                        </li>
                      );
                    })
                  }
                </ol>
              </li>
            );
          })
        }
      </ol>
      <ol className={'badgeList'} style={{ zIndex: SLIDE_ZINDEX_ACTIVE }}>
        {
          slideList.map((slide, i) => {
            const key = `${id}Badge-${i}`;
            const { className } = slide;
            const badgeOpacity = i === 0 ? BADGE_OPACITY_ACTIVE : BADGE_OPACITY_INACTIVE;

            return (
              <li key={key} id={key} className={`badge ${className}`} onClick={() => showSlide(id, i)}>
                <span style={{ opacity: badgeOpacity }}></span>
              </li>
            );
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
          .badge>span {
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
  );
}
