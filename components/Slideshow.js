import styles from './Slideshow.module.css'

var timeout;
var currentSlide;
function showSlide(id, n) {
  if (typeof n === 'undefined') {
    return;
  }
  let nextSlide = n;
  let i;
  let slides;
  let badges;
  if (nextSlide !== currentSlide) {
    slides = document.getElementById(`${id}Slideshow`).getElementsByClassName(styles.slide);
    badges = document.getElementById(`${id}BadgeContainer`).getElementsByClassName(styles.badge);
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
  clearTimeout(timeout);
  timeout = setTimeout(() => { showSlide(id, currentSlide + 1) }, 5000);
};

export async function componentDidMount(id) {
  if (typeof window === 'undefined') {
    return;
  }
  showSlide(id, 0);
}

export default function Slideshow(props) {
  const id = props.slideshow._id;
  const slides = props.slideshow.slides.sort((a, b) => { a._id - b._id });
  componentDidMount(id);
  return (
    <div className={props.slideshow.theme} style={{ height: 100 + '%', position: 'relative' }}>
      <ul id={`${id}Slideshow`} className={styles.slideshow}>
        {slides.map((slide, i) => {
          return (
            <li key={`${id}Slide-${i}`} className={styles.slide} style={{ backgroundImage: `url(${slide.url})` }}>
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
      <ul id={`${id}BadgeContainer`} className={styles.badgesContainer}>
        {slides.map((slide, i) => {
          return (
            <li key={`${id}Badge-${i}`} className={styles.badge} onClick={() => showSlide(id, i)}>
              <span></span>
            </li>
          )
        })}
      </ul>
      <style jsx>{`
      .white {
        background-color: #fff;
        color: #000;
      }
      .blue {
        background-color: #24316F;
        color: #fff;
      }
      `}</style>
    </div>
  )
}
