import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './StyleOverride.css';

import PageSelection from './components/PageSelection';


const App = () => (
    <Router>
        <Route path="/*" exact component={PageSelection} />
    </Router>
);

export default App;