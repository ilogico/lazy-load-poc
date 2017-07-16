'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import Mounter from './Mounter.jsx';
import List from './List.jsx';

const host = document.querySelector('#application');

ReactDOM.render(<Mounter><List /></Mounter>, host);

