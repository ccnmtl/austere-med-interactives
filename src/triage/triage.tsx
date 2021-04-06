// eslint-disable-next-line max-len
/* eslint-disable scanjs-rules/identifier_localStorage, scanjs-rules/property_localStorage */
import React, { useState } from 'react';
import { Nav } from '../nav';
import { Background } from '../background';
import BackgroundImage from '../images/iStock-1217878707.jpg';
import { PatientSet } from './index';
import DATA from '../data/triage.json';

interface TriageData {
    q1: boolean;
    q2: boolean;
    q3: boolean;
    q4: boolean;
    q5: boolean;
    q6: boolean;
    esi: string;
    location: string;
    airway: string;
    consult: string;
}

const resetTriageData = (): void => {
    const initialData: TriageData = {
        q1: false,
        q2: false,
        q3: false,
        q4: false,
        q5: false,
        q6: false,
        esi: '0',
        location: 'Waiting Room',
        airway: 'No Oxygen',
        consult: 'Anesthesia'
    };

    const initList = [...new Array<TriageData>(DATA.length)].map(() => initialData);
    window.localStorage.setItem('triage', JSON.stringify(initList));
};

export const initTriageData = (): void => {
    if (window.localStorage.getItem('triage')) {
        return;
    }
    resetTriageData();
};


export const getTriageData = (idx: number, key: string): string => {
    const data = JSON.parse(window.localStorage.getItem('triage')) as TriageData[];
    if (key in data[idx]) {
        return String(data[idx][key]);
    } else {
        throw Error(
            `getTriageData called with key: ${key}. This key is not present in Triage object`);
    }
};

export const setTriageData = (idx: number, key: string, value: string | boolean): void => {
    const data = JSON.parse(window.localStorage.getItem('triage')) as TriageData[];
    if (key in data[idx]) {
        data[idx][key] = value;
        window.localStorage.setItem('triage', JSON.stringify(data));
    } else {
        throw Error(
            `setTriageData called with key: ${key}. This key is not present in Triage object`);
    }
};

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

    initTriageData();

    return (
        <>
            <Nav />
            <div className={'container triage__content'} data-testid='triage'>
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
            <Background backgroundImageSrc={BackgroundImage as string}/>
        </>
    );
};

