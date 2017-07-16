'use strict';

const throtle = (func, delay = 0) => {
    let waiting = false;
    let lastArgs = null;

    const callBack = () => requestAnimationFrame(() => {
        waiting = false;
        func(...lastArgs);
        lastArgs = null;
    });

    const setTimer = delay > 0 ? () => setTimeout(callBack, delay) : callBack;


    return (...args) => {
        lastArgs = args;
        if (!waiting) {
            waiting = true;
            setTimer();
        }
    }
};

const subscribers = new Set();

/**
 * Here, dispatch is being called max 1 time per 100ms.
 * But this isn't really necessary, a delay of 0 should also be fine.
 * It will always be throtled with requestAnimationFrame.
 * The scroll event triggers very quickly when scrolling and we don't need to notify the listeners that many times.
 * If the delay is increased and the user scrolls quickly, we might even pass by some elements that don't get loaded,
 * which is maybe a performance gain.
 * On the other hand, a high delay may make the elements load a little too late.
 * 0 should be safe
 */
const dispatch = throtle(() => {
    for (const subscriber of [...subscribers]) {
        subscriber();
    }
}, 100);

export const subscribe = subscriber => {
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