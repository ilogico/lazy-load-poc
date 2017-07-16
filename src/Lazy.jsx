'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import { subscribe } from './scrollService.js';

const propTypes = {
    load: PropTypes.bool
};

const shouldElementLoad = element => {
    const { top, bottom } = element.getBoundingClientRect();
    return top < window.innerHeight + 500 && bottom > -500;
}


export default class Lazy extends React.Component {
    constructor(props) {
        super(props)
        this.state = { load: props.preload };

        /**
         * This will save the function returned by scrollService.subscribe,
         * which allows us to cancel the subscription when we don't need it anymore.
         */
        this.cancelSubscription = null;

        /**
         * We will use this method as a callback to ref (see the render method).
         * React will call the ref callback when the given element is mounted or unmounted.
         * When it's mounted, element will be the element (the li element, in this case).
         * When it is unmounted, element will be null.
         */
        this.subscribeScroll = element => {
            if (!element) {
                /**
                 * The element is null, so it was just dismounted.
                 * We check if we have a subscription, and cancel it if we do.
                 */
                if (this.cancelSubscription) {
                    this.cancelSubscription();
                    this.cancelSubscription = null;
                }
                return;
            }
            if (this.state.load) {
                /**
                 * The element just mounted, but we already loaded it, possibly because preload was set.
                 * We don't need to do anything.
                 */
                return;
            }

            const { top, bottom } = element.getBoundingClientRect();
            if (shouldElementLoad(element)) {
                /**
                 * The element is being mounted in a visible location or close to it.
                 * No need to subscribe the scrollService, we will simply transition to the loaded state.
                 */
                this.setState({ load: true });
                return;
            }

            /**
             * At this point, we know the element is being mounted, but it's too far to the viewport's limits.
             * We will leave it with load to false and subscribe the scrollService.
             * We need to save the function returned by the subscription, so we can later cancel the subscription,
             * either when the element is unmounted or when the element becomes visible.
             */
            this.cancelSubscription = subscribe(() => {
                if (shouldElementLoad(element)) {
                    this.setState({ load: true });
                    this.cancelSubscription();
                    this.cancelSubscription = null;
                }
            });

        };
    }

    render() {
        return (
            <li ref={this.subscribeScroll}>
                {this.state.load ? <div /> : null}
            </li>
        );
    }

    static get propTypes() {
        return propTypes;
    }
}
