function setSlides(currentSlide) {
  const slides = document.querySelectorAll(".mySlides");

  slides.forEach((slide) => slide.classList.remove("show"));
  slides[currentSlide].classList.toggle("show");
}

let currentSlide = 0;
let totalSlides = 3;
setSlides(currentSlide);

function nextSlide() {
  if (currentSlide === 2) currentSlide = -1;
  currentSlide++;
  setSlides(currentSlide);
}

function prevSlide() {
  if (currentSlide === 0) {
    currentSlide += totalSlides;
  }
  currentSlide--;
  //   console.log(currentSlide);
  setSlides(currentSlide);
}

const nextButton = document.querySelector(".next");
const prevButton = document.querySelector(".prev");

nextButton.onclick = nextSlide;
prevButton.onclick = prevSlide;

const dots = document.querySelectorAll(".dot");
dots[currentSlide].classList.add("active")
