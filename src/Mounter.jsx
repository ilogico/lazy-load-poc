'use strict';
import React from 'react';

export default class Mounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { mount: true };

        this.handleToggle = () => this.setState(s => ({ mount: !s.mount }));
    }

    render() {
        return (
            <div>
                <button onClick={this.handleToggle}>{this.state.mount ? 'Unmount' : 'Mount'}</button>
                { this.state.mount  ? <div>{this.props.children}</div> : null }
            </div>
        );
    }
}