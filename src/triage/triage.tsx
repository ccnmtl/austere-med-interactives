// eslint-disable-next-line max-len
/* eslint-disable scanjs-rules/identifier_localStorage, scanjs-rules/property_localStorage */
import React, { useState } from 'react';
import { Nav } from '../nav';
import { Background } from '../background';
import BackgroundImage from '../images/iStock-1217878707.jpg';
import { PatientSet } from './index';
import DATA from '../data/triage.json';

export interface TriageSelectionData {
    timeToAnswer: number;
    completedOnTime: boolean;
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
    reflection: string;
}

const resetTriageSelectionData = (): void => {
    const initialData: TriageSelectionData = {
        timeToAnswer: Infinity,
        completedOnTime: false,
        q1: false,
        q2: false,
        q3: false,
        q4: false,
        q5: false,
        q6: false,
        esi: '',
        location: '',
        airway: '',
        consult: '',
        reflection: ''
    };

    const initList = [...new Array<TriageSelectionData>(DATA.length)].fill(initialData);
    window.localStorage.setItem('triage', JSON.stringify(initList));
};

export const initTriageSelectionData = (): void => {
    if (window.localStorage.getItem('triage')) {
        return;
    }
    resetTriageSelectionData();
};


export const getTriageSelectionData = (): TriageSelectionData[] => {
    return JSON.parse(window.localStorage.getItem('triage')) as TriageSelectionData[];
};

export const setTriageSelectionData = (
    idx: number, key: string, value: string | boolean | number): void => {
    const data = JSON.parse(window.localStorage.getItem('triage')) as TriageSelectionData[];
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

    const handleReset = (evt: React.MouseEvent<HTMLButtonElement>): void => {
        evt.preventDefault();
        resetTriageSelectionData();
        setSimStarted(true);
    };

    initTriageSelectionData();

    return (
        <>
            <Nav />
            <div className={'container triage__content'} data-testid='triage'>
                {!simStarted && !simFinished && (<>
                    {window.localStorage.getItem('triage') ? (<>
                        <p>
                            You have already completed the triage sim. <a href={'/triage/reflection'}>Reflection</a> <a href={'/triage/summary'}>Summary</a>
                        </p>
                        <p>
                            Click <button className={'btn btn-primary btn-sm'} onClick={handleReset}>here</button> to reset your choices and retake the sim
                        </p>
                    </>) : (<>
                        <button onClick={handleStart} data-testid='triage-start'>Start Sim</button>
                    </>)}
                </>)}
                {simStarted && !simFinished && (
                    <PatientSet patients={DATA} setSimFinished={setSimFinished} />
                )}
                {simStarted && simFinished && (<>
                    <p>You have completed the sim. Please proceed to the
                        &nbsp;<a href={'/triage/reflection'}>reflection page</a>.
                    </p>
                </>)}
            </div>
            <Background backgroundImageSrc={BackgroundImage as string}/>
        </>
    );
};

