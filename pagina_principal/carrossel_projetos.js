document.addEventListener("DOMContentLoaded", () => {
    const slideContainer = document.querySelector(".carousel-slide");
    const slides = document.querySelectorAll(".carousel-slide img");
    const prevBtn = document.querySelector(".carousel-btn.prev");
    const nextBtn = document.querySelector(".carousel-btn.next");

    const slideCount = slides.length;
    let index = 0;
    let interval = null;
    let isPaused = false;
    const pauseDuration = 6000;
    const autoSlideInterval = 9000;

    // Clonar primeiro e último slide
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slideCount - 1].cloneNode(true);
    slideContainer.appendChild(firstClone);
    slideContainer.insertBefore(lastClone, slideContainer.firstChild);

    // Ajuste: considerar largura real do slide (50%)
    const slideWidthPercent = 50 + 50; // 50% da largura
    slideContainer.style.transform = `translateX(-${slideWidthPercent}%)`; // iniciar no primeiro verdadeiro

    const showSlide = (i) => {
        slideContainer.style.transition = "transform 0.6s ease-in-out";
        slideContainer.style.transform = `translateX(-${(i + 1) * slideWidthPercent}%)`;
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

    slideContainer.addEventListener("transitionend", () => {
        if (index >= slideCount) {
            slideContainer.style.transition = "none";
            slideContainer.style.transform = `translateX(-${slideWidthPercent}%)`;
            index = 0;
        }
        if (index < 0) {
            slideContainer.style.transition = "none";
            slideContainer.style.transform = `translateX(-${slideCount * slideWidthPercent}%)`;
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