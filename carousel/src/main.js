import "./style.css";

function createSlider({
  containerSelector,
  slideSelector,
  dotSelector,
  nextSelector,
  prevSelector,
  interval = 5000,
}) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const nextButton = container.querySelector(nextSelector);
  const prevButton = container.querySelector(prevSelector);
  const slides = container.querySelectorAll(slideSelector);
  const dots = document.querySelectorAll(dotSelector);
  
  let currentSlide = 0;
  const totalSlides = slides.length;
   
  console.log(dots)
  console.log(slides)

  function setSlides(index) {
    slides.forEach((slide) => slide.classList.remove("show"));
    slides[index].classList.add("show");

    dots.forEach((dot) => dot.classList.remove("active"));
    dots[index].classList.add("active");

    currentSlide = index;
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    setSlides(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    setSlides(currentSlide);
  }

  if (nextButton) nextButton.onclick = nextSlide;
  if (prevButton) prevButton.onclick = prevSlide;

  dots.forEach((dot, index) => {
    dot.onclick = () => setSlides(index);
    console.log(dot);
  });

  if (interval > 0) {
    setInterval(() => {
      nextSlide();
    }, interval);
  }

  // Initialize
  setSlides(currentSlide);
}

createSlider({
  containerSelector: ".container",
  slideSelector: ".mySlides",
  dotSelector: ".dot",
  nextSelector: ".next",
  prevSelector: ".prev",
  interval: 5000,
});
