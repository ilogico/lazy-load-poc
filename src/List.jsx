'use strict';
import React from 'react';
import Lazy from './Lazy.jsx';

export default () => <ul>{[...range(0, 100)].map(i => <Lazy key={i} preload={i < 10} />)}</ul>

function* range(start, end) {
    for (let i = start; i < end; i++) {
        yield i;
    }
}