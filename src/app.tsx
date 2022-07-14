import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import { NotFound } from './not-found';
import { Home } from './home';
import { About } from './about';
import { Triage, TriageSummary, TriageReflection } from './triage';
import {
    Medkit, MedkitSummary, MedkitLanding, Medkit1Scenario, Medkit2Scenario,
    Medkit3Scenario
} from './medkit';
import * as Sentry from '@sentry/browser';
import ReactGA from 'react-ga';

/* eslint-disable-next-line */
if (process.env.NODE_ENV === 'production') {
    Sentry.init({
        dsn: 'https://1ff8147c34ca4105bd6a71ac9489ba49@o46310.ingest.sentry.io/5743963',
    });
}

export const App: React.FC = () => {
    ReactGA.initialize('51144540');

    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/about" element={<About />}/>
                <Route path="/triage" element={<Triage />}/>
                <Route path="/triage/reflection" element={<TriageReflection />}/>
                <Route path="/triage/summary" element={<TriageSummary />}/>
                <Route path="/medkit" element={<MedkitLanding />}/>
                <Route path="/medkit/1"
                    element={<Medkit
                        title={'Case 1: Mountain Expedition'}
                        budget={80}
                        scenario={Medkit1Scenario}
                        medkitId={'1'}/>
                    } />
                <Route path="/medkit/2"
                    element={<Medkit
                        title={'Case 2: Desert Mountain Biking'}
                        budget={65}
                        scenario={Medkit2Scenario}
                        medkitId={'2'}/>
                    } />
                <Route path="/medkit/3"
                    element={<Medkit
                        title={'Case 3: Disaster Response'}
                        budget={90}
                        scenario={Medkit3Scenario}
                        medkitId={'3'}/>
                    } />
                <Route path="/medkit/summary"
                    element={
                        <MedkitSummary />
                    } />
                <Route element={<NotFound />} />
            </Routes>
        </Router>
    );
};
