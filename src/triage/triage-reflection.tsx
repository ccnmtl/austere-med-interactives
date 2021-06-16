/* eslint-disable max-len */
import React, {useState, useEffect} from 'react';
import { Nav } from '../nav';
import { Background } from '../background';
import BackgroundImage from '../images/iStock-1217878707.jpg';
import DATA from '../data/triage.json';
import {
    getTriageSelectionData, setTriageSelectionData, TriageSelectionData
} from './';

export const TriageReflection: React.FC = () => {
    const [selections, setSelections] = useState<TriageSelectionData[]>(null);

    useEffect(() => {
        const s = getTriageSelectionData();
        setSelections(s);
    }, []);

    const navItems = [
        {
            text: 'Step 1. Introduction',
            active: true,
            link: '/triage'
        },
        {
            text: 'Step 2. Engage',
            active: true,
            link: '/triage'
        },
        {
            text: 'Step 3. Reflect',
            active: true,
            link: '/triage/reflection'
        },
        {
            text: 'Step 4. Summary',
            active: false,
            link: '/triage/summary'
        }
    ];
    return (
        <>
            <Nav title={'Triage Simulation'} items={navItems}/>
            <div className={'container triage__content'} data-testid='triage-summary'>
                <div className="row mb-5">
                    <div className="col-12">
                        <h1>Patient Triage Simulation Reflection</h1>
                    </div>
                    <div className="col-6">
                        <p>
                            That experience was likely challenging and has you
                            a bit flustered - at least that was the goal!
                            Please take a moment to record any short reflections
                            you might have for each patient - these can be used
                            during your debrief session - before moving on to your
                            summary page.
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <form>
                            {DATA.map((patient, idx, lst) => {
                                const handleText = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
                                    evt.preventDefault();
                                    setTriageSelectionData(idx, 'reflection', evt.target.value);
                                };
                                return (
                                    <div key={idx} className="row">
                                        <div className="col-12">
                                            <label className={'h2'} htmlFor={`reflection-text-${idx}`}>
                                                Reflection for Patient {idx + 1}
                                            </label>
                                        </div>
                                        <div className="col-6">
                                            <div className={'form-group'}>
                                                <textarea
                                                    id={`reflection-text-${idx}`}
                                                    className={'form-control'}
                                                    rows={5}
                                                    onChange={handleText}/>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="row">
                                                <div className="col-6">
                                                    <div className={'fw-bold'}>Selections Made:</div>
                                                    <div>
                                                        ESI: {selections && selections[idx].esi ? selections[idx].esi : ('No selection made')}<br/>
                                                        Location: {selections && selections[idx].location ? selections[idx].location : ('No selection made')}<br/>
                                                        Airway: {selections && selections[idx].airway ? selections[idx].airway : ('No selection made')}<br/>
                                                        Optional Consult: {selections && selections[idx].consult ? selections[idx].consult : ('No selection made')}<br/>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className={'fw-bold'}>Chief Complaint:</div>
                                                    <p>{DATA[idx].promptAnswer}</p>
                                                </div>
                                            </div>
                                        </div>
                                        {(idx < lst.length - 1) && (
                                            <div className="col-12 pt-4 pb-3">
                                                <hr/>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 mt-4">
                        <a className={'btn btn-danger'} href={'/triage/summary'}>Summary</a>.
                    </div>
                </div>
            </div>
            <Background backgroundImageSrc={BackgroundImage}/>
        </>
    );
};
