import React from 'react';
import Collapser from './Collapser.jsx';
import styles from './CollapserList.css';

export default class CollapserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selected: 3 }
    }
    render() {
        return (
            <div className={styles.container}>
                {[...range(0, 10)].map(i => <Collapser key={i} onClick={() => this.setState(state => ({ selected: state.selected === i ? NaN : i }))} expanded={i === this.state.selected} />)}
            </div>
        );
    }
}

function* range(start, endExclusive, increment = 1) {
    for (let i = start; i < endExclusive; i += 1) {
        yield i;
    }
}