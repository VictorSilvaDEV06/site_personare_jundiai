document.addEventListener("DOMContentLoaded", () => {
    const slidesContainer = document.querySelector(".slides");
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.querySelector(".seta-esquerda");
    const nextBtn = document.querySelector(".seta-direita");

    const slideCount = slides.length;
    let index = 0;
    let interval = null;
    let isPaused = false;
    const pauseDuration = 6000;
    const autoSlideInterval = 8000;

    // Clonar primeiro e último slide
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slideCount - 1].cloneNode(true);
    slidesContainer.appendChild(firstClone);
    slidesContainer.insertBefore(lastClone, slidesContainer.firstChild);

    slidesContainer.style.transform = `translateX(-100%)`; // iniciar no primeiro verdadeiro

    const showSlide = (i) => {
        slidesContainer.style.transition = "transform 0.6s ease-in-out";
        slidesContainer.style.transform = `translateX(-${(i + 1) * 100}%)`;
        index = i;
    };

    const nextSlide = () => showSlide(index + 1);
    const prevSlide = () => showSlide(index - 1);

    const startAutoSlide = () => {
        if (interval) clearInterval(interval);
        interval = setInterval(() => {
            if (!isPaused) nextSlide();
        }, autoSlideInterval);
    };

    const pauseAutoSlide = () => {
        isPaused = true;
        setTimeout(() => {
            isPaused = false;
        }, pauseDuration);
    };

    slidesContainer.addEventListener("transitionend", () => {
        if (index >= slideCount) {
            slidesContainer.style.transition = "none";
            slidesContainer.style.transform = `translateX(-100%)`;
            index = 0;
        }
        if (index < 0) {
            slidesContainer.style.transition = "none";
            slidesContainer.style.transform = `translateX(-${slideCount * 100}%)`;
            index = slideCount - 1;
        }
    });

    nextBtn.addEventListener("click", () => {
        nextSlide();
        pauseAutoSlide();
    });

    prevBtn.addEventListener("click", () => {
        prevSlide();
        pauseAutoSlide();
    });

    showSlide(index);
    startAutoSlide();
});