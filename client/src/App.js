import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './StyleOverride.css';

import Join from './components/Join';


const App = () => (
    <Router>
        <Route path="/*" exact component={Join} />
    </Router>
);

export default App;