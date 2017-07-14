'use strict';

const throtle = (func, delay = 0) => {
    if (delay === 0) {
        return (...args) => requestAnimationFrame(() => func(...args));
    } else {
        let lastCall = 0;
        let waiting = false;
        let lastArgs = null;

        const callBack = () => {
            waiting = false;
            lastCall = Date.now();
            func(...lastArgs);
            lastArgs = null;
        };

        const timerCallback = () => requestAnimationFrame(callBack);

        return (...args) => {
            const now = Date.now();
            lastArgs = args;

            if (now - lastCall > delay) {
                timerCallback();
            } else if (!waiting) {
                waiting = true;
                setTimeout(timerCallback, lastCall + delay - now);
            }
        }
    }
};

const subscribers = new Set();

const dispatch = throtle(() => {
    for (const subscriber of [...subscribers]) {
        subscriber();
    }
});

export const subscribe =  subscriber => {
    if (subscribers.size === 0) {
        window.addEventListener('scroll', dispatch, false);
        window.addEventListener('resize', dispatch, false);
    }
    subscribers.add(subscriber);
    return () => {
        subscribers.delete(subscriber)
        if (subscribers.size === 0) {
            window.removeEventListener('scroll', dispatch, false);
            window.removeEventListener('resize', dispatch, false);
        }
    };
};