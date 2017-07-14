'use strict';
import React from 'react';
import { subscribe } from './scrollService.js';

export default class Lazy extends React.Component {
    constructor(props) {
        super(props)
        this.state = { load: props.preload };

        this.cancelSubscription = null;

        this.subscribeScroll = element => {
            if (!this.state.load) {
                const { top, bottom } = element.getBoundingClientRect();
                if (top < window.innerHeight + 500 && bottom > -500) {
                    this.setState({ load: true });
                    return;
                }
                this.cancelSubscription = subscribe(() => {
                    const { top, bottom } = element.getBoundingClientRect();
                    if (top < window.innerHeight + 500 && bottom > -500) {
                        this.setState({ load: true });
                        this.cancelSubscription();
                        this.cancelSubscription = null;
                    }
                });
            }
        };

    }

    componentWillUnmount() {
        if (this.cancelSubscription) {
            this.cancelSubscription();
        }
    }

    render() {
        return (
            <li ref={this.subscribeScroll}>
                {this.state.load ? <div /> : null}
            </li>
        );
    }
}