import styles from './Slideshow.module.css'

const NO_SLIDES = -1;
const MS_UNTIL_NEXT_CALL_TO_CHECKTIMEOUT = 1000;
const DEFAULT_TIMEOUT_DURATION = 7000;

function isDefined(a) {
  if (typeof a !== 'undefined')
    return true;

  return false;
}

function getSlideshowElementById(slideshowId) {
  return document.getElementById(`${slideshowId}Slideshow`);
}

function getSlideshowTimeoutDuration(slideshowId) {
  const slideshow = getSlideshowElementById(slideshowId)
  return parseInt(slideshow.getAttribute('timeout-duration'));
}

function getSlideshowTimeoutTimeRemaining(slideshowId) {
  const slideshow = getSlideshowElementById(slideshowId)
  return parseInt(slideshow.getAttribute('time-remaining'));
}

function setSlideshowTimeoutTimeRemaining(slideshowId, timeRemaining) {
  const slideshow = getSlideshowElementById(slideshowId)
  slideshow.setAttribute('time-remaining', timeRemaining);
}

function resetSlideshowTimeoutTimeRemaining(slideshowId) {
  const timeoutDuration = getSlideshowTimeoutDuration(slideshowId)
  setSlideshowTimeoutTimeRemaining(slideshowId, timeoutDuration);
}

function getSlideElementsOnMobileScreenWidth(slideshowId) {
  const slideshow = getSlideshowElementById(slideshowId);
  return slideshow.querySelectorAll(`.${styles.slide}.${styles.showOnMobileOnly}, .${styles.slide}:not(.${styles.showOnDesktopOnly})`);
}

function getSlideElementsOnDesktopScreenWidth(slideshowId) {
  const slideshow = getSlideshowElementById(slideshowId);
  return slideshow.querySelectorAll(`.${styles.slide}.${styles.showOnDesktopOnly}, .${styles.slide}:not(.${styles.showOnMobileOnly})`);
}

function isMobileScreen() {
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
  const slideshow = getSlideshowElementById(slideshowId)
  return parseInt(slideshow.getAttribute('current-slide-index'));
}

function setCurrentSlideIndex(slideshowId, currentSlideIndex) {
  const slideshow = getSlideshowElementById(slideshowId)
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

function setSlideOpacity(slideshowId, currentSlideIndex, nextSlideIndex) {
  document.getElementById(`${slideshowId}Slide-${currentSlideIndex}`).style.opacity = 0;
  document.getElementById(`${slideshowId}Slide-${nextSlideIndex}`).style.opacity = 1;
}

function setBadgeOpacity(slideshowId, currentSlideIndex, nextSlideIndex) {
  document.getElementById(`${slideshowId}Badge-${currentSlideIndex}`).getElementsByTagName('span')[0].style.opacity = 0.3;
  document.getElementById(`${slideshowId}Badge-${nextSlideIndex}`).getElementsByTagName('span')[0].style.opacity = 0.9;
}

function showSlide(slideshowId, slideIndex) {
  const currentSlideIndex = getCurrentSlideIndex(slideshowId);
  const nextSlideIndex = isDefined(slideIndex) ? slideIndex
    : getNextSlideIndex(slideshowId);

  if (nextSlideIndex === NO_SLIDES)
    return;

  setSlideOpacity(slideshowId, currentSlideIndex, nextSlideIndex);
  setBadgeOpacity(slideshowId, currentSlideIndex, nextSlideIndex);

  setCurrentSlideIndex(slideshowId, nextSlideIndex);
  resetSlideshowTimeoutTimeRemaining(slideshowId);
};

function checkTimeout(slideshowId, timePassed) {
  let timeRemaining = getSlideshowTimeoutTimeRemaining(slideshowId);

  timeRemaining -= timePassed;
  if (timeRemaining >= 0)
    setSlideshowTimeoutTimeRemaining(slideshowId, timeRemaining);
  else
    showSlide(slideshowId);

  setTimeout(() => checkTimeout(slideshowId, timePassed), timePassed);
}

function screenResizePassedMobileDesktopBarrier(screenWidth, newWidth) {
  if ((screenWidth >= 500 && newWidth < 500)
    || (screenWidth < 500 && newWidth >= 500))
    return true;

  return false;
}

function handleResize(slideshowId, screenWidth) {
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
    return styles.showOnDesktopOnly;
  else if (!showOnDesktop)
    return styles.showOnMobileOnly;
  else
    return '';
}

function slideListReducerCallback(list, slide) {
  const { showOnMobile, showOnDesktop } = slide;
  if (slideIsActive(showOnMobile, showOnDesktop)) {

    const className = getSlideClassName(showOnMobile, showOnDesktop);
    const { image, titles, buttons } = slide;
    list.push({
      className: className,
      image: image.replace(/\\/g, '/'),
      titles: titles,
      buttons: buttons
    });

  }

  return list;
}

function reduceSlideList(slideList) {
  return slideList.sort((a, b) => b.reverseOrder - a.reverseOrder)
    .reduce((list, slide) => slideListReducerCallback(list, slide), []);
}

function sortListByReverseOrder(list) {
  return list.sort((a, b) => b.reverseOrder - a.reverseOrder);
}

function buildSlideList(list) {
  if (!isDefined(list) || list.length === 0)
    return [];

  let slideList = reduceSlideList(list);
  slideList = sortListByReverseOrder(slideList);

  return slideList;
}

export async function componentDidMount(slideshowId, numSlides) {
  if (!isDefined(window))
    return;

  let screenWidth = window.innerWidth;
  if (numSlides > 1)
    setTimeout(() => checkTimeout(slideshowId, MS_UNTIL_NEXT_CALL_TO_CHECKTIMEOUT), MS_UNTIL_NEXT_CALL_TO_CHECKTIMEOUT);

  showSlide(slideshowId, 0);

  window.addEventListener('resize', () => {
    screenWidth = handleResize(slideshowId, screenWidth);
  });
}

export default function Slideshow({ slideshow }) {
  if (!isDefined(slideshow))
    return;

  const id = isDefined(slideshow.name) ? slideshow.name : 'slideshow';
  const timeoutDuration = isDefined(slideshow.timeoutDuration) ?
    parseInt(slideshow.timeoutDuration) * 1000 : DEFAULT_TIMEOUT_DURATION;
  const slideList = buildSlideList(slideshow.slideList);

  componentDidMount(id, slideList.length);

  return (
    <div id={`${id}Slideshow`} className={styles.slideshow} current-slide-index={0} timeout-duration={timeoutDuration} time-remaining={timeoutDuration}>
      <ol className={styles.slideList}>
        {
          slideList.map((slide, i) => {
            const key = `${id}Slide-${i}`;
            const { className, image, titles, buttons } = slide;
            const slideOpacity = i === 0 ? 1 : 0;

            return (
              // <li key={key} id={key} value={i} className={`${styles.slide} ${className}`} style={{ backgroundImage: `url(${process.env.OPEN_DOOR_API}${slide.image})` }}>
              <li key={key} id={key} value={i} className={`${styles.slide} ${className}`} style={{ backgroundImage: `url(${image})`, opacity: slideOpacity }}>
                {
                  titles.map(title => {
                    const titleKey = `${id}SlideTitle-${i}`;

                    return (
                      <div key={titleKey} className={styles.slideHeader}>
                        <h1>{title}</h1>
                      </div>
                    );
                  })
                }
                <ol className={styles.buttonList}>
                  {
                    buttons.map(button => {
                      const buttonKey = `${id}SlideButton-${i}`;
                      const { href, text } = button;

                      return (
                        <li key={buttonKey} className={styles.slideButton}>
                          <a href={href} className={styles.button}>
                            <h3>{text}</h3>
                          </a>
                        </li>
                      );
                    })
                  }
                </ol>
              </li>
            )
          })
        }
      </ol>
      <ol className={styles.badgeList}>
        {
          slideList.map((slide, i) => {
            const key = `${id}Badge-${i}`;
            const { className } = slide;
            const badgeOpacity = i === 0 ? 0.9 : 0.3;

            return (
              <li key={key} id={key} className={`${styles.badge} ${className}`} onClick={() => showSlide(id, i)}>
                <span style={{ opacity: badgeOpacity }}></span>
              </li>
            )
          })
        }
      </ol>
    </div>
  );
}
