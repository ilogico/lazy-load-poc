'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import Mounter from './Mounter.jsx';
import List from './List.jsx';
import CollapserList from './CollapserList.jsx';

const host = document.querySelector('#application');

ReactDOM.render((
    <Mounter>
        <List name="LazyLoad"/>
        <CollapserList name="Collapser" />
    </Mounter>
), host);

