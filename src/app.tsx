import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch  } from 'react-router-dom';
import { NotFound } from './not-found';
import { Home } from './home';
import { Triage } from './triage';
import { Medkit } from './medkit';

export const App: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/triage" component={Triage}/>
                <Route exact path="/medkit" component={Medkit}/>
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
};
