import styles from './Slideshow.module.css'

function checkTimeout(id, timePassed) {
  const slideshow = document.getElementById(`${id}Slideshow`);
  let timeRem = parseInt(slideshow.getAttribute('time-rem'));
  timeRem -= timePassed;
  if (timeRem > 0) {
    slideshow.setAttribute('time-rem', timeRem);
  } else {
    const nextSlideI = parseInt(document.getElementById(`${id}Slideshow`).getAttribute('current-slide-i')) + 1;
    showSlide(id, nextSlideI);
  }
  setTimeout(() => { checkTimeout(id, timePassed) }, timePassed);
}

function showSlide(id, n) {
  const slideshow = document.getElementById(`${id}Slideshow`);
  const currentSlideI = parseInt(slideshow.getAttribute('current-slide-i'));
  const nextSlideI = getNextSlideIndex(id, n);
  document.getElementById(`${id}Slide-${currentSlideI}`).style.opacity = 0;
  document.getElementById(`${id}Slide-${nextSlideI}`).style.opacity = 1;
  document.getElementById(`${id}Badge-${currentSlideI}`).getElementsByTagName('span')[0].style.opacity = 0.3;
  document.getElementById(`${id}Badge-${nextSlideI}`).getElementsByTagName('span')[0].style.opacity = 0.9;
  slideshow.setAttribute('current-slide-i', nextSlideI);
  const slideshowTime = parseInt(slideshow.getAttribute('timeout'));
  slideshow.setAttribute('time-rem', slideshowTime);
};

function getNextSlideIndex(id, n) {
  const lastSlideI = document.getElementById(`${id}Slideshow`).getElementsByClassName(styles.slide).length - 1;
  let nextIdx;
  if (typeof n === 'undefined' || n > lastSlideI) {
    nextIdx = 0;
  } else if (n < 0) {
    nextIdx = lastSlideI;
  } else {
    nextIdx = n;
  }
  return nextIdx;
}

export async function componentDidMount(id) {
  if (typeof window === 'undefined') {
    return;
  }
  const timeoutTime = 1000;
  setTimeout(() => { checkTimeout(id, timeoutTime) }, timeoutTime);
  showSlide(id, 0);
}

export default function Slideshow(props) {
  const id = props.slideshow._id;
  const slides = props.slideshow.slides.sort((a, b) => { a._id - b._id });
  const slideshowTime = parseInt(props.slideshow.timeout) * 1000;
  componentDidMount(id);
  return (
    <div id={`${id}Slideshow`} className={styles.slideshow} current-slide-i={0} timeout={slideshowTime} time-rem={slideshowTime}>
      <ul className={styles.slideList}>
        {slides.map((slide, i) => {
          return (
            <li key={`${id}Slide-${i}`} id={`${id}Slide-${i}`} className={styles.slide} style={{ backgroundImage: `url(${slide.url})` }}>
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
          return (
            <li key={`${id}Badge-${i}`} id={`${id}Badge-${i}`} className={styles.badge} onClick={() => { showSlide(id, i); }}>
              <span></span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
