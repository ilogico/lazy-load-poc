import React from 'react';
import styles from './Collapser.css';

export default class Collapser extends React.Component {

    constructor(props) {
        super(props);
        this.state = { filler: [], content: null };


    }

    componentDidMount() {
        fetch(`https://baconipsum.com/api/?type=meat-and-filler&paras=${Math.random() * 4 | 0}rand=${Math.random()}`)
            .then(r => r.json())
            .then(r => this.setState({ filler: r }))
    }

    render() {
        const { content } = this.state;
        const { expanded, onClick } = this.props;
        return (
            <div className={styles.container} style={ { height: expanded && content ? `calc(2rem + ${content.clientHeight}px)` : '2rem'}}>
                <div className={styles.header} onClick={onClick}>Toggle me</div>
                <div ref={e => this.setState({ content: e })}>{ this.state.filler.map((f, i) => <p key={i}>{f}</p>) }</div>
            </div>
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.expanded !== nextProps.expanded || this.state.content !== nextState.content || this.state.filler !== nextState.filler;
    }
}