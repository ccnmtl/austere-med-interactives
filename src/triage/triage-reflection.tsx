/* eslint-disable max-len */
import React from 'react';
import { Nav } from '../nav';
import { Background } from '../background';
import BackgroundImage from '../images/iStock-1217878707.jpg';
import DATA from '../data/triage.json';
import {setTriageSelectionData} from './';

export const TriageReflection: React.FC = () => {
    return (
        <>
            <Nav />
            <div className={'container triage__content'} data-testid='triage-summary'>
                <div className="row">
                    <div className="col-12">
                        <h1>Triage Reflection</h1>
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
                                    <div key={idx} className={'form-group'}>
                                        <label htmlFor={`reflection-text-${idx}`}>Reflection for Patient {idx + 1}</label>
                                        <textarea
                                            id={`reflection-text-${idx}`}
                                            className={'form-control'}
                                            rows={5}
                                            onChange={handleText}/>
                                    </div>
                                );
                            })}
                        </form>
                    </div>
                </div>
            </div>
            <Background backgroundImageSrc={BackgroundImage as string}/>
        </>
    );
};
