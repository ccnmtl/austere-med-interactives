import React, { useState } from 'react';
import { Nav } from '../nav';
import { PatientSet } from './index';
import { DATA } from '../data/triage';

export const Triage: React.FC = () => {
    const [simStarted, setSimStarted] = useState<boolean>(false);
    const [simFinished, setSimFinished] = useState<boolean>(false);

    const handleStart = (evt: React.MouseEvent<HTMLButtonElement>): void => {
        evt.preventDefault();
        setSimStarted(true);
    };

    const handleRestart = (evt: React.MouseEvent<HTMLButtonElement>): void => {
        evt.preventDefault();
        setSimStarted(true);
        setSimFinished(false);
    };

    return (
        <>
            <Nav />
            <div className={'container'}>
                <h1>Triage sim</h1>
            </div>
            <div className={'container'} data-testid='triage'>
                {!simStarted && !simFinished && (
                    <button onClick={handleStart} data-testid='triage-start'>Start Sim</button>
                )}
                {simStarted && !simFinished && (
                    <PatientSet patients={DATA} setSimFinished={setSimFinished} />
                )}
                {simStarted && simFinished && (
                    <button onClick={handleRestart}>Restart Sim</button>
                )}
            </div>
        </>
    );
};

