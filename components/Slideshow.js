import styles from './Slideshow.module.css'

function checkTimeout(id, timePassed) {
  const slideshow = document.getElementById(`${id}Slideshow`);
  let timeRem = parseInt(slideshow.getAttribute('time-rem'));
  timeRem -= timePassed;
  if (timeRem > 0) {
    slideshow.setAttribute('time-rem', timeRem);
  } else {
    showSlide(id);
  }
  setTimeout(() => checkTimeout(id, timePassed), timePassed);
}

function showSlide(id, i) {
  const slideshow = document.getElementById(`${id}Slideshow`);
  const currentSlideI = parseInt(slideshow.getAttribute('current-slide-i'));
  const nextSlideI = typeof i === 'undefined' ? getNextSlideIndex(id) : i;
  if (nextSlideI === null) {
    return;
  }
  document.getElementById(`${id}Slide-${currentSlideI}`).style.opacity = 0;
  document.getElementById(`${id}Slide-${nextSlideI}`).style.opacity = 1;
  document.getElementById(`${id}Badge-${currentSlideI}`).getElementsByTagName('span')[0].style.opacity = 0.3;
  document.getElementById(`${id}Badge-${nextSlideI}`).getElementsByTagName('span')[0].style.opacity = 0.9;
  slideshow.setAttribute('current-slide-i', nextSlideI);
  const slideshowTime = parseInt(slideshow.getAttribute('timeout'));
  slideshow.setAttribute('time-rem', slideshowTime);
};

function getNextSlideIndex(id) {
  const slideshow = document.getElementById(`${id}Slideshow`);
  const selector = window.innerWidth < 500 ? `.${styles.slideBoth}, .${styles.slideMobileOnly}` : `.${styles.slideBoth}, .${styles.slideDesktopOnly}`;
  const slides = slideshow.querySelectorAll(selector);
  if (slides.length === 0) {
    return null;
  }
  const currentSlideI = parseInt(slideshow.getAttribute('current-slide-i'));
  for (let i = 0; i < slides.length; i++) {
    const slideI = parseInt(slides[i].getAttribute('value'));
    if (slideI > currentSlideI) {
      return slideI;
    }
  }
  return parseInt(slides[0].getAttribute('value'));
}

function handleResize(id, screenWidth) {
  const newWidth = window.innerWidth;
  if ((screenWidth >= 500 && newWidth < 500) || (screenWidth < 500 && newWidth >= 500)) {
    showSlide(id);
  }
  return newWidth;
}

export async function componentDidMount(id) {
  if (typeof window === 'undefined') {
    return;
  }
  const timeoutTime = 1000;
  setTimeout(() => checkTimeout(id, timeoutTime), timeoutTime);
  showSlide(id, 0);
  let screenWidth = window.innerWidth;
  window.addEventListener('resize', () => screenWidth = handleResize(id, screenWidth));
}

export default function Slideshow(props) {
  if (typeof props.slideshow === 'undefined' || typeof props.slideshow.name === 'undefined') {
    return null;
  }
  const id = props.slideshow.name;
  var slides = props.slideshow.slides.sort((a, b) => a.order - b.order);
  slides.forEach(slide => {
    if (slide.showOnMobile || slide.showOnDesktop) {
      slides.image = slide.image.replace('\\', '/');
    }
  });
  const slideshowTime = parseInt(props.slideshow.timeout) * 1000;
  componentDidMount(id);
  return (
    <div id={`${id}Slideshow`} className={styles.slideshow} current-slide-i={0} timeout={slideshowTime} time-rem={slideshowTime}>
      <ul className={styles.slideList}>
        {slides.map((slide, i) => {
          let className;
          if (!slide.showOnDesktop) {
            className = styles.slideMobileOnly;
          } else if (!slide.showOnMobile) {
            className = styles.slideDesktopOnly;
          } else {
            className = styles.slideBoth;
          }
          return (
            <li key={`${id}Slide-${i}`} id={`${id}Slide-${i}`} value={i} className={className} style={{ backgroundImage: `url(${process.env.OPEN_DOOR_API}${slide.image})` }}>
              <div className={styles.slideHeader}>
                <h1>{slide.title}</h1>
              </div>
              <a href={slide.href} className={styles.slideButton}>
                <h3>{slide.buttonText}</h3>
              </a>
            </li>
          )
        })}
      </ul>
      <ul className={styles.badgeList}>
        {slides.map((slide, i) => {
          let className;
          if (!slide.showOnDesktop) {
            className = styles.badgeMobileOnly;
          } else if (!slide.showOnMobile) {
            className = styles.badgeDesktopOnly;
          } else {
            className = styles.badgeBoth;
          }
          return (
            <li key={`${id}Badge-${i}`} id={`${id}Badge-${i}`} className={className} onClick={() => showSlide(id, i)}>
              <span></span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
