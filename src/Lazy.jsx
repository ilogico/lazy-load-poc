'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import { subscribe } from './scrollService.js';
import styles from './Lazy.css';

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

        let observer;
        this.handleRef = element => {
            if (!element) {
                if (observer) {
                    observer.disconnect();
                }
            } else if (!this.state.load) {
                observer = new IntersectionObserver(intersections => {
                    if (intersections.some(i => i.isIntersecting)) {
                        this.setState({ load: true })
                        observer.disconnect();
                    }
                });
                observer.observe(element);
            }
        };
    }

    render() {
        return (
            <li ref={this.handleRef} className={styles.li}>
                {this.state.load ? <div className={this.props.preload ? '' : styles.lazyLoaded}/> : null}
            </li>
        );
    }

    static get propTypes() {
        return propTypes;
    }
}
