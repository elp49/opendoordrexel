import styles from './Slideshow.module.css'

const NO_SLIDES = -1;
const MILLISECONDS_BEFORE_NEXT_CHECK_TIMEOUT = 1000;

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
  return slideshow.querySelectorAll(`.${styles.slide} .${styles.showOnMobileOnly}`);
}

function getSlideElementsOnDesktopScreenWidth(slideshowId) {
  const slideshow = getSlideshowElementById(slideshowId);
  return slideshow.querySelectorAll(`.${styles.slide} .${styles.showOnDesktopOnly}`);
}

function isMobileScreen() {
  if (window.innerWidth < 500) return true;
  return false;
}

function getCurrentlyVisibleSlideElements(slideshowId) {
  if (isMobileScreen()) return getSlideElementsOnMobileScreenWidth(slideshowId);
  return getSlideElementsOnDesktopScreenWidth(slideshowId);
}

function getThisCurrentSlidesIndex(slide) {
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
  if (slides.length === 0) return NO_SLIDES;

  const currentSlideIndex = getCurrentSlideIndex(slideshowId);
  for (let i = 0; i < slides.length; i++) {

    const slideIndex = getThisCurrentSlidesIndex(slides[i]);
    if (slideIndex > currentSlideIndex) return slideIndex;

  }

  return parseInt(slides[0].getAttribute('value'));
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
  const nextSlideIndex = typeof slideIndex !== 'undefined' ? slideIndex : getNextSlideIndex(slideshowId);

  if (nextSlideIndex === NO_SLIDES) return;

  setSlideOpacity(slideshowId, currentSlideIndex, nextSlideIndex);
  setBadgeOpacity(slideshowId, currentSlideIndex, nextSlideIndex);

  setCurrentSlideIndex(slideshowId, nextSlideIndex);
  resetSlideshowTimeoutTimeRemaining(slideshowId);
};

function checkTimeout(slideshowId, timePassed) {
  let timeRemaining = getSlideshowTimeoutTimeRemaining(slideshowId);

  timeRemaining -= timePassed;
  if (timeRemaining > 0) setSlideshowTimeoutTimeRemaining(slideshowId, timeRemaining);
  else showSlide(slideshowId);
  
  setTimeout(() => checkTimeout(slideshowId, timePassed), timePassed);
}

function screenResizePassesMobileDesktopBarrier(screenWidth, newWidth) {
  if ((screenWidth >= 500 && newWidth < 500) || (screenWidth < 500 && newWidth >= 500)) return true;
  return false;
}

function handleResize(slideshowId, screenWidth) {
  const newWidth = window.innerWidth;
  if (screenResizePassesMobileDesktopBarrier(screenWidth, newWidth)) showSlide(slideshowId);

  return newWidth;
}

export async function componentDidMount(slideshowId, numSlides) {
  if (typeof window === 'undefined') return;
  let screenWidth = window.innerWidth;

  if (numSlides > 1) setTimeout(() => checkTimeout(slideshowId, MILLISECONDS_BEFORE_NEXT_CHECK_TIMEOUT), MILLISECONDS_BEFORE_NEXT_CHECK_TIMEOUT);

  showSlide(slideshowId, 0);

  window.addEventListener('resize', () => {
    screenWidth = handleResize(slideshowId, screenWidth);
  });
}

function slideIsActive(showOnMobile, showOnDesktop) {
  if (showOnMobile || showOnDesktop) return true;
  return false;
}

function getSlideClassName(showOnMobile, showOnDesktop) {
  if (!showOnDesktop) return styles.showOnMobileOnly;
  else if (!showOnMobile) return styles.showOnDesktopOnly;
  else return '';
}

function slideListReducerCallback(list, slide) {
  if (slideIsActive(slide.showOnMobile, slide.showOnDesktop)) {

    const className = getSlideClassName(slide.showOnMobile, slide.showOnDesktop);
    list.push({
      className: className,
      image: slide.image.replace(/\\/g, '/'),
      titles: slide.titles,
      buttons: slide.buttons
    });

  }

  return list;
}

function reduceSlideList(slideList) {
  return slideList.sort((a, b) => b.reverseOrder - a.reverseOrder)
    .reduce((list, slide) => slideListReducerCallback(list, slide), []);
}

export default function Slideshow({ slideshow }) {
  if (typeof slideshow === 'undefined' || slideshow.slideList.length === 0) return;

  const id = typeof slideshow.name !== 'undefined' ? slideshow.name : 'slideshow';
  const timeoutDuration = typeof slideshow.timeoutDuration === 'undefined' ? 7000 : parseInt(slideshow.timeoutDuration) * 1000;
  const slideList = reduceSlideList(slideshow.slideList);

  componentDidMount(id, slideList.length);

  return (
    <div id={`${id}Slideshow`} className={styles.slideshow} current-slide-index={0} timeout-duration={timeoutDuration} time-remaining={timeoutDuration}>
      <ul className={styles.slideList}>
        {
          slideList.map((slide, i) => {
            const key = `${id}Slide-${i}`;
            const { className, image, titles, buttons } = slide;

            return (
              // <li key={`${id}Slide-${i}`} id={`${id}Slide-${i}`} className={className} style={{ backgroundImage: `url(${process.env.OPEN_DOOR_API}${slide.image})` }}>
              <li key={key} id={key} className={`${styles.slide} ${className}`} style={{ backgroundImage: `url(${image})` }}>
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
                <ul className={styles.buttonList}>
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
                </ul>
              </li>
            )
          })
        }
      </ul>
      <ul className={styles.badgeList}>
        {
          slideList.map((slide, i) => {
            const key = `${id}Badge-${i}`;
            const { className } = slide;

            return (
              <li key={key} id={key} className={`${styles.badge} ${className}`} onClick={() => showSlide(id, i)}>
                <span></span>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
