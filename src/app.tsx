import React from 'react';
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import { NotFound } from './not-found';
import { Home } from './home';
import { Triage, TriageSummary, TriageReflection } from './triage';
import { Medkit, MedkitSummary } from './medkit';

export const App: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/triage" component={Triage}/>
                <Route exact path="/triage/reflection" component={TriageReflection}/>
                <Route exact path="/triage/summary" component={TriageSummary}/>
                <Route exact path="/medkit/1">
                    <Medkit
                        budget={300}
                        scenario={'Secenario One'}
                        medkitId={'1'}/>
                </Route>
                <Route exact path="/medkit/2">
                    <Medkit
                        budget={500}
                        scenario={'Secenario Two'}
                        medkitId={'2'}/>
                </Route>
                <Route exact path="/medkit/3">
                    <Medkit
                        budget={800}
                        scenario={'Secenario Three'}
                        medkitId={'3'}/>
                </Route>
                <Route exact path="/medkit/4">
                    <Medkit
                        budget={100}
                        scenario={'Secenario Four'}
                        medkitId={'4'}/>
                </Route>
                <Route exact path="/medkit/5">
                    <Medkit
                        budget={200}
                        scenario={'Secenario Five'}
                        medkitId={'5'}/>
                </Route>
                <Route exact path="/medkit/summary">
                    <MedkitSummary />
                </Route>
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
};
