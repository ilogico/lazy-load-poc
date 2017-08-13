'use strict';
import React from 'react';
import styles from './Mounter.css';

export default class Mounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selected: 0 };

    }

    render() {
        const children = [].concat(this.props.children);
        const { selected } = this.state;
        return (
            <div>
                <nav className={styles.nav}>
                    { children.map((c, i) => <button disabled={i === selected} key={i} onClick={() => this.setState({ selected: i })} >{c.props.name}</button>) }
                </nav>
                { children[selected] }
            </div>
        );
    }
}