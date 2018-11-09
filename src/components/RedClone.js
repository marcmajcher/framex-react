import React from 'react';
import RedNav from './RedNav';
import RedHeader from './RedHeader';
import RedPostList from '../containers/RedPostList';

const App = () => (
    <div>
        <RedNav />
        <div className="container">
            <RedHeader />
            <RedPostList />
        </div>
    </div>
);

export default App;
