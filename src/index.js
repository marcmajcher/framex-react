import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import RedClone from './components/RedClone';
import reducer from './reducers';
import posts from './data';

const store = createStore(reducer, {posts});

render(
    <Provider store={store}>
        <RedClone />
    </Provider>,
    document.getElementById('redclone')
);
