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
                    <div className="col-12">
                        <h1>Patient Triage Simulation Reflection</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <form>
                            {DATA.map((patient, idx) => {
                                const handleText = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
                                    evt.preventDefault();
                                    setTriageSelectionData(idx, 'reflection', evt.target.value);
                                };
                                return (
                                    <div key={idx} className="row mb-5">
                                        <div className="col">
                                            <div className={'form-group'}>
                                                <label className={'fw-bold'} htmlFor={`reflection-text-${idx}`}>
                                                    Reflection for Patient {idx + 1}
                                                </label>
                                                <textarea
                                                    id={`reflection-text-${idx}`}
                                                    className={'form-control'}
                                                    rows={5}
                                                    onChange={handleText}/>
                                            </div>
                                        </div>
                                        <div className="col pt-4">
                                            <div className="row">
                                                <div className="col-6">
                                                    <div className={'fw-bold'}>Chief Complaint</div>
                                                    <p>{DATA[idx].promptAnswer}</p>
                                                </div>
                                                <div className="col mx-5">
                                                    <img className={'img-fluid'} src={DATA[idx].iconImg}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <a className={'btn btn-primary'} href={'/triage/summary'}>Summary</a>.
                    </div>
                </div>
            </div>
            <Background backgroundImageSrc={BackgroundImage}/>
        </>
    );
};
