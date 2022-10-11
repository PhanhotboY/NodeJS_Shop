const handleCarouselButtons = (
    carousel,
    nextBtn,
    backBtn,
    totalSlide,
    displayedSlide
) => {
    let slideFactor = 0;
    const slideBreakFactorEnd =
        totalSlide -
        displayedSlide -
        ((totalSlide - displayedSlide) % (displayedSlide - 1) ||
            displayedSlide - 1);
    const slideBreakFactorStart =
        totalSlide >= 2 * displayedSlide - 1
            ? displayedSlide - 1
            : totalSlide - displayedSlide;
    const slideWidth = 100 / displayedSlide;

    nextBtn.onclick = () => {
        slideFactor =
            Number(carousel.style.left.slice(5, -2)) +
                slideBreakFactorEnd * slideWidth >
            0.0009
                ? displayedSlide - 1
                : (totalSlide - displayedSlide) % (displayedSlide - 1) ||
                  displayedSlide - 1;

        nextBtn.disabled = true;
        carousel.style.left = `calc(-${slideFactor} * ${slideWidth}% + ${
            carousel.style.left || '0%'
        })`;
    };

    backBtn.onclick = () => {
        slideFactor =
            Number(carousel.style.left.slice(5, -2)) +
                slideBreakFactorStart * slideWidth <
            -0.0009
                ? 1 - displayedSlide
                : (
                      Number(carousel.style.left.slice(5, -2)) / slideWidth
                  ).toFixed(3);

        backBtn.disabled = true;
        carousel.style.left = `calc(${
            carousel.style.left || '100%'
        } - ${slideFactor} * ${slideWidth}%)`;
    };

    carousel.addEventListener('transitionend', () => {
        nextBtn.style.display = 'block';
        backBtn.style.display = 'block';
        nextBtn.disabled = false;
        backBtn.disabled = false;

        if (
            Number(carousel.style.left.slice(5, -2)) +
                slideBreakFactorEnd * slideWidth <
            -0.1
        ) {
            nextBtn.style.display = 'none';
        }

        if (Number(carousel.style.left.slice(5, -2)) > -0.1) {
            backBtn.style.display = 'none';
        }
    });
};

export default handleCarouselButtons;
