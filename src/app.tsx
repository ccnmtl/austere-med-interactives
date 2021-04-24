import React from 'react';
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import { NotFound } from './not-found';
import { Home } from './home';
import { Triage, TriageSummary, TriageReflection } from './triage';
import { Medkit, MedkitSummary, MedkitLanding } from './medkit';

const MEDKIT_1_SCENARIO = `Lorem ipsum dolor sit amet, consetetur sadipscing
elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
dolor sit amet.`;

const MEDKIT_2_SCENARIO = `Lorem ipsum dolor sit amet, consetetur sadipscing
elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
dolor sit amet.`;

const MEDKIT_3_SCENARIO = `Lorem ipsum dolor sit amet, consetetur sadipscing
elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
dolor sit amet.`;

export const App: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/triage" component={Triage}/>
                <Route exact path="/triage/reflection" component={TriageReflection}/>
                <Route exact path="/triage/summary" component={TriageSummary}/>
                <Route exact path="/medkit" component={MedkitLanding}/>
                <Route exact path="/medkit/1">
                    <Medkit
                        title={'Medkit: Placeholder Scenario'}
                        budget={5}
                        scenario={MEDKIT_1_SCENARIO}
                        medkitId={'1'}/>
                </Route>
                <Route exact path="/medkit/2">
                    <Medkit
                        title={'Medkit: Placeholder Scenario'}
                        budget={50}
                        scenario={MEDKIT_2_SCENARIO}
                        medkitId={'2'}/>
                </Route>
                <Route exact path="/medkit/3">
                    <Medkit
                        title={'Medkit: Placeholder Scenario'}
                        budget={30}
                        scenario={MEDKIT_3_SCENARIO}
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
