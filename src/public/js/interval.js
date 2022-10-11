function interval(callback, time) {
    let timer = setInterval(callback, time);

    const intervalHandler = {};

    intervalHandler.stop = () => {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
        return intervalHandler;
    };

    intervalHandler.start = () => {
        if (!timer) {
            intervalHandler.stop();
            timer = setInterval(callback, time);
        }
        return intervalHandler;
    };

    intervalHandler.restart = (newTime = time) => {
        time = newTime;
        intervalHandler.stop().start();

        return intervalHandler;
    };

    return intervalHandler;
}

export default interval;
