import React from 'react';
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import { NotFound } from './not-found';
import { Home } from './home';
import { About } from './about';
import { Triage, TriageSummary, TriageReflection } from './triage';
import {
    Medkit, MedkitSummary, MedkitLanding, Medkit1Scenario, Medkit2Scenario,
    Medkit3Scenario
} from './medkit';
import { withTracker } from './withTracker';
import * as Sentry from '@sentry/browser';

/* eslint-disable-next-line */
if (process.env.NODE_ENV === 'production') {
    Sentry.init({
        dsn: 'https://1ff8147c34ca4105bd6a71ac9489ba49@o46310.ingest.sentry.io/5743963',
    });
}

const TrackedMedkit = withTracker(Medkit);

export const App: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={withTracker(Home)}/>
                <Route exact path="/about" component={withTracker(About)}/>
                <Route exact path="/triage" component={withTracker(Triage)}/>
                <Route exact path="/triage/reflection" component={withTracker(TriageReflection)}/>
                <Route exact path="/triage/summary" component={withTracker(TriageSummary)}/>
                <Route exact path="/medkit" component={withTracker(MedkitLanding)}/>
                <Route exact path="/medkit/1">
                    <TrackedMedkit
                        title={'Case 1: Mountain Expedition'}
                        budget={80}
                        scenario={Medkit1Scenario}
                        medkitId={'1'}/>
                </Route>
                <Route exact path="/medkit/2">
                    <TrackedMedkit
                        title={'Case 2: Desert Mountain Biking'}
                        budget={65}
                        scenario={Medkit2Scenario}
                        medkitId={'2'}/>
                </Route>
                <Route exact path="/medkit/3">
                    <TrackedMedkit
                        title={'Case 3: Disaster Response'}
                        budget={90}
                        scenario={Medkit3Scenario}
                        medkitId={'3'}/>
                </Route>
                <Route exact path="/medkit/summary">
                    <MedkitSummary />
                </Route>
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
};
