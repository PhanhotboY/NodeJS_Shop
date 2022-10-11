import interval from './interval.js';

const setSlider = function (element, slideCount, slideTime, stardusts) {
    let n = 1;

    const sliderHandler = {};

    sliderHandler.handleStardusts = () => {
        setTimeout(() => {
            stardusts.forEach((startdust, index) => {
                startdust.classList.remove('slider_stardust--active');

                if (index + 1 === n) {
                    startdust.classList.add('slider_stardust--active');
                }
            });
        }, 500);
    };

    sliderHandler.handleSlider = () => {
        element.style = `transform: translateX(
            -${n * (100 / slideCount)}%
        ) translateX(0px)`;

        if (n > slideCount - 2 || n < 1) {
            n = n > slideCount - 2 ? 1 : slideCount - 2;

            setTimeout(() => {
                new Promise((resolve, reject) => {
                    element.style = 'transition-duration: 0ms';

                    resolve();
                    reject(new Error());
                })
                    .then(
                        () =>
                            (element.style.transform = `translateX(
                                        -${n * (100 / slideCount)}%
                                    ) translateX(0px)`)
                    )
                    .catch((err) => console.debug(err));
            }, 500);
        }

        sliderHandler.handleStardusts();
    };

    const sliderInterval = interval(() => {
        n++;
        sliderHandler.handleSlider();
    }, slideTime);

    sliderHandler.next = () => {
        n++;
        sliderHandler.handleSlider();

        sliderInterval.restart();
    };

    sliderHandler.back = () => {
        n--;
        sliderHandler.handleSlider();

        sliderInterval.restart();
    };

    sliderHandler.moveto = (position) => {
        n = position;
        sliderHandler.handleSlider();

        sliderInterval.restart();
    };

    return sliderHandler;
};

export default setSlider;
