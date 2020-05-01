import styles from './Slideshow.module.css'

var carousel;
var currentSlide;
const showSlide = (n) => {
  if (typeof n === 'undefined') {
    return;
  }
  let nextSlide = n;
  if (nextSlide !== currentSlide) {
    let i;
    let slides = document.getElementsByClassName(styles.slide);
    let badges = document.getElementsByClassName(styles.badge);
    if (slides.length < 1 || badges.length < 1) {
      return;
    }
    for (i = 0; i < slides.length; i++) {
      if (slides[i].classList.contains(styles.slideActive)) {
        slides[i].classList.remove(styles.slideActive);
      }
    }
    for (i = 0; i < badges.length; i++) {
      if (badges[i].classList.contains(styles.badgeActive)) {
        badges[i].classList.remove(styles.badgeActive);
      }
    }
    if (nextSlide >= slides.length || nextSlide < 0) {
      nextSlide = 0;
    }
    slides[nextSlide].classList.add(styles.slideActive);
    badges[nextSlide].classList.add(styles.badgeActive);
    currentSlide = nextSlide;
  }
  clearTimeout(carousel);
  carousel = setTimeout(() => { showSlide(currentSlide + 1) }, 7000);
};

export async function componentDidMount() {
  if (typeof window !== 'undefined') {
    showSlide(0);
  }
}

export default function Slideshow({ slides }) {
  componentDidMount();

  return (
    <div id={'slideshow'} className={styles.slideshow}>
      {slides.map((slide, i) => {
        return (
          <div key={`slide-${i}`} className={styles.slide} style={{ backgroundImage: `url(${slide.imageUrl})` }}>
            <div className={styles.slideHeader}>
              <h1>{slide.title}</h1>
            </div>
            <a href={slide.linkTo} className={styles.slideButton}>
              <h3>{slide.buttonText}</h3>
            </a>
          </div>
        )
      })}
      <div className={styles.badgesContainer}>
        {slides.map((slide, i) => {
          return (
            <div key={`badge-${i}`} className={styles.badge} onClick={() => showSlide(i)}>
              <span></span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
