import "./reset.css";
import "./style.css";

const slider = function (): void {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotsContainer = document.querySelector(".dots");

  let currentSlide: number = 0;
  let maxSlide: number = slides.length;
  let intervalId: ReturnType<typeof setInterval> | null = null;
  const autoSlideInterval: number = 3000;

  const goToSlide = function (slide: number): void {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const startAutoSlide = function (): void {
    intervalId = setInterval(() => {
      if (currentSlide === maxSlide - 1) {
        currentSlide = 0;
      } else {
        currentSlide++;
      }
      goToSlide(currentSlide);
      activateDots(currentSlide);
    }, autoSlideInterval);
  };

  const stopAutoSlide = function (): void {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  btnRight?.addEventListener("click", () => {
    stopAutoSlide(); //Stop the slider when button is clicked
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    activateDots(currentSlide);
  });

  btnLeft?.addEventListener("click", () => {
    stopAutoSlide(); //Stop the slider when button is clicked
    if (currentSlide == 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
    activateDots(currentSlide);
  });

  const createDots = function (): void {
    slides.forEach((_, i) => {
      dotsContainer?.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDots = function (slide: number): void {
    const dots = document.querySelectorAll(".dots__dot");
    dots.forEach((dot) => dot.classList.remove("dots__dot--active"));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      ?.classList.add("dots__dot--active");
  };

  dotsContainer?.addEventListener("click", (e) => {
    if (e.target?.classList.contains("dots__dot")) {
      stopAutoSlide(); // Stop the auto-slide when a dot is clicked
      const slide = e.target.dataset.slide;
      goToSlide(slide);
      activateDots(slide);
    }
  });

  const initialize = function (): void {
    goToSlide(0);
    createDots();
    activateDots(0);
    startAutoSlide();
  };

  initialize();
};

slider();
