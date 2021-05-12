/* eslint-disable max-len */
import React from 'react';
import { Nav } from '../nav';
import { Background } from '../background';
import BackgroundImage from '../images/iStock-1217878707.jpg';
import DATA from '../data/triage.json';
import {setTriageSelectionData} from './';

export const TriageReflection: React.FC = () => {
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
                <div className="row">
                    <div className="col-12 mb-5">
                        <h1>Patient Triage Simulation Reflection</h1>
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
                                                <div className="col-7">
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
